// Tipos globais da aplicação frontend

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    message: string;
    stack?: string;
  };
  count?: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  age?: number;
  isActive: boolean;
  cel: string;
  userType: 'comprador' | 'recebedor' | 'ambos';
  address: string;
  availableStatus: boolean;
  credits: number;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  age?: number;
  cel: string;
  userType: 'comprador' | 'recebedor' | 'ambos';
  address: string;
  availableStatus?: boolean;
  credits?: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message?: string;
  validate?: (value: any) => boolean | string;
}
