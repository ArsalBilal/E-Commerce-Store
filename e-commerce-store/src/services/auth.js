import { axiosInstance } from './axiosInstance';

export async function authUser(username, password) {
  try {
    const response = await axiosInstance.post('/auth/login', {
      username,
      password,
      expiresInMins: 30,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function refreshToken(refreshToken) {
  try {
    const response = await axiosInstance.post(
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