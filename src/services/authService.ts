import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import { config } from '../config/environment';
import { AppError } from '../middleware/errorHandler';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<IUser, 'password'>;
  token: string;
  expiresIn: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export const authService = {
  /**
   * Registra um novo usuário no sistema
   */
  async register(userData: {
    name: string;
    email: string;
    password: string;
    age?: number;
  }): Promise<AuthResponse> {
    try {
      // Verificar se o usuário já existe
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new AppError('Email já cadastrado no sistema');
      }

      // Criar novo usuário
      const user = new User(userData);
      await user.save();

      // Gerar token JWT
      const token = this.generateToken((user._id as any).toString(), user.email);
      const expiresIn = config.jwtExpiresIn;

      // Retornar dados do usuário (sem senha) e token
      const userResponse = user.toJSON();
      return {
        user: userResponse,
        token,
        expiresIn,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Erro ao registrar usuário');
    }
  },

  /**
   * Autentica um usuário existente
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const { email, password } = credentials;

      // Buscar usuário incluindo a senha
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        throw new AppError('Email ou senha incorretos');
      }

      // Verificar se o usuário está ativo
      if (!user.isActive) {
        throw new AppError('Usuário desativado');
      }

      // Verificar senha
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        throw new AppError('Email ou senha incorretos');
      }

      // Gerar token JWT
      const token = this.generateToken((user._id as any).toString(), user.email);
      const expiresIn = config.jwtExpiresIn;

      // Retornar dados do usuário (sem senha) e token
      const userResponse = user.toJSON();
      return {
        user: userResponse,
        token,
        expiresIn,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Erro ao fazer login');
    }
  },

  /**
   * Gera um token JWT
   */
  generateToken(userId: string, email: string): string {
    const payload: JwtPayload = {
      userId,
      email,
    };

    return jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    } as jwt.SignOptions);
  },

  /**
   * Verifica e decodifica um token JWT
   */
  verifyToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, config.jwtSecret) as JwtPayload;
    } catch (error) {
      throw new AppError('Token inválido ou expirado');
    }
  },

  /**
   * Busca usuário por ID (para middleware de autenticação)
   */
  async getUserById(userId: string): Promise<IUser | null> {
    try {
      return await User.findById(userId);
    } catch (error) {
      throw new AppError('Erro ao buscar usuário');
    }
  },
};
