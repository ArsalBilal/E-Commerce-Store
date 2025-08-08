import { apiClient, createApiClient } from '../lib/api-client';

// Re-export the main API client for backward compatibility
export const axiosInstance = apiClient.instance;

// Create specialized clients
export const stripeClient = createApiClient({
  baseURL: "http://localhost:5000/api",
});
