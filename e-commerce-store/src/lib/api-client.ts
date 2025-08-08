import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getConfig } from "../config";

export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
  retryAttempts?: number;
}

export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  meta?: {
    timestamp: string;
    version: string;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

export class ApiClient {
  public instance: AxiosInstance;
  private config: ApiClientConfig;

  constructor(config: ApiClientConfig) {
    this.config = config;
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newToken = await this.refreshAuthToken();
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.instance(originalRequest);
            }
          } catch (refreshError) {
            this.handleAuthError();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(this.formatError(error));
      }
    );
  }

  private getAuthToken(): string | null {
    return localStorage.getItem("authToken");
  }

  private async refreshAuthToken(): Promise<string | null> {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return null;

      const response = await this.instance.post("/auth/refresh", {
        refreshToken,
      });

      const { accessToken } = response.data;
      localStorage.setItem("authToken", accessToken);
      return accessToken;
    } catch {
      return null;
    }
  }

  private handleAuthError() {
    localStorage.clear();
    window.location.href = "/login";
  }

  private formatError(error: any): ApiError {
    return {
      message: error.response?.data?.message || error.message || "An error occurred",
      code: error.response?.data?.code,
      status: error.response?.status,
      details: error.response?.data,
    };
  }

  // Generic HTTP methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.get<T>(url, config);
    return this.formatResponse(response);
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.post<T>(url, data, config);
    return this.formatResponse(response);
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.put<T>(url, data, config);
    return this.formatResponse(response);
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.patch<T>(url, data, config);
    return this.formatResponse(response);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.delete<T>(url, config);
    return this.formatResponse(response);
  }

  private formatResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
    return {
      data: response.data,
      success: true,
      meta: {
        timestamp: new Date().toISOString(),
        version: "1.0.0",
      },
    };
  }

  // Utility methods
  setHeader(key: string, value: string): void {
    this.instance.defaults.headers.common[key] = value;
  }

  removeHeader(key: string): void {
    delete this.instance.defaults.headers.common[key];
  }

  setBaseURL(baseURL: string): void {
    this.instance.defaults.baseURL = baseURL;
  }
}

  // Create default API client instance
const config = getConfig();
export const apiClient = new ApiClient({
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
});

  // Export the instance directly
export const axiosInstance = apiClient.instance;

// Export createApiClient function
export const createApiClient = (customConfig: Partial<ApiClientConfig>) => {
  return new ApiClient({
    baseURL: customConfig.baseURL || config.api.baseURL,
    timeout: customConfig.timeout || config.api.timeout,
    headers: customConfig.headers,
  });
};
