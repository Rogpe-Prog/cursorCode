import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';
import { AppError } from './errorHandler';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      throw new AppError('Token de acesso necessário');
    }

    // Verificar e decodificar o token
    const decoded = authService.verifyToken(token);

    // Buscar usuário no banco
    const user = await authService.getUserById(decoded.userId);
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    if (!user.isActive) {
      throw new AppError('Usuário desativado');
    }

    // Adicionar usuário à requisição
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
