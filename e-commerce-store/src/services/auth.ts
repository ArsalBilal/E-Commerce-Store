import { axiosInstance } from './axiosInstance';
// import { User } from '../types';

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export async function authUser(username: string, password: string): Promise<AuthResponse> {
  try {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', {
      username,
      password,
      expiresInMins: 30,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
  try {
    const response = await axiosInstance.post<RefreshTokenResponse>(
      '/auth/refresh',
      {
        refreshToken,
        expiresInMins: 30,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}
