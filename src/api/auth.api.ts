import api from './axios';
import { type AuthResponse } from '../types';
import { API_ROUTES } from '../constants/routes';

export const authApi = {
  login: async (credentials: Record<string, string>): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(API_ROUTES.AUTH.LOGIN, credentials);
    return response.data;
  },

  register: async (userData: Record<string, string>): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(API_ROUTES.AUTH.REGISTER, userData);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post(API_ROUTES.AUTH.LOGOUT);
  }
};
