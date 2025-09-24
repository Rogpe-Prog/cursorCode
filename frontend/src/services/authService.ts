import api from './api';
import { ApiResponse, AuthResponse, LoginRequest, RegisterRequest, User } from '@/types';

export class AuthService {
  /**
   * Realiza login do usuário
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
      
      if (response.data.success && response.data.data) {
        // Salva token e dados do usuário no localStorage
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Erro ao fazer login');
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Erro de conexão. Tente novamente.');
    }
  }

  /**
   * Registra um novo usuário
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', userData);
      
      if (response.data.success && response.data.data) {
        // Salva token e dados do usuário no localStorage
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Erro ao registrar usuário');
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Erro de conexão. Tente novamente.');
    }
  }

  /**
   * Obtém perfil do usuário autenticado
   */
  async getProfile(): Promise<User> {
    try {
      const response = await api.get<ApiResponse<User>>('/auth/profile');
      
      if (response.data.success && response.data.data) {
        // Atualiza dados do usuário no localStorage
        localStorage.setItem('user', JSON.stringify(response.data.data));
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Erro ao obter perfil');
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Erro de conexão. Tente novamente.');
    }
  }

  /**
   * Faz logout do usuário
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  /**
   * Obtém dados do usuário do localStorage
   */
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  /**
   * Obtém token do localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}

// Instância singleton do serviço
export const authService = new AuthService();
