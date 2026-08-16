import api from './axios';
import { type Url } from '../types';
import { API_ROUTES } from '../constants/routes';

export const urlsApi = {
  getAll: async (): Promise<Url[]> => {
    const response = await api.get<Url[]>(API_ROUTES.URLS.BASE);
    return response.data;
  },

  create: async (originalUrl: string): Promise<Url> => {
    const response = await api.post<Url>(API_ROUTES.URLS.BASE, { originalUrl });
    return response.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`${API_ROUTES.URLS.BASE}/${id}`);
  }
};
