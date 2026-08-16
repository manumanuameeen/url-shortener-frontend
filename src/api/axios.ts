import axios from 'axios';
import { API_ROUTES } from '../constants/routes';

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== API_ROUTES.AUTH.REFRESH &&
      originalRequest.url !== API_ROUTES.AUTH.LOGIN
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}${API_ROUTES.AUTH.REFRESH}`,
          {},
          { withCredentials: true }
        );
        const { access_token } = res.data;
        setAccessToken(access_token);
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (err) {
        setAccessToken(null);
        window.dispatchEvent(new Event('auth:logout'));
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
