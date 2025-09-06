import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';

export const authController = {
  /**
   * Registra um novo usuário
   */
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password, age, cel, userType, address, availableStatus, credits } = req.body;

      const result = await authService.register({
        name,
        email,
        password,
        age,
        cel,
        userType,
        address,
        availableStatus,
        credits,
      });

      res.status(201).json({
        success: true,
        message: 'Usuário registrado com sucesso',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Faz login do usuário
   */
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const result = await authService.login({ email, password });

      res.json({
        success: true,
        message: 'Login realizado com sucesso',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Retorna dados do usuário autenticado
   */
  async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = (req as any).user;

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
};
