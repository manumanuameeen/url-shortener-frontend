export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Url {
  id: string;
  originalUrl: string;
  shortCode: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
}
