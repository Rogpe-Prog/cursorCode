import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';
import { AppError } from '../middleware/errorHandler';

export const userController = {
  async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      res.json({
        success: true,
        data: users,
        count: users.length,
      });
    } catch (error) {
      next(error);
    }
  },

  async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      
      if (!user) {
        throw new AppError('Usuário não encontrado');
      }

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData = req.body;
      const newUser = await userService.createUser(userData);
      
      res.status(201).json({
        success: true,
        data: newUser,
        message: 'Usuário criado com sucesso',
      });
    } catch (error) {
      next(error);
    }
  },

  async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const userData = req.body;
      const updatedUser = await userService.updateUser(id, userData);
      
      if (!updatedUser) {
        throw new AppError('Usuário não encontrado');
      }

      res.json({
        success: true,
        data: updatedUser,
        message: 'Usuário atualizado com sucesso',
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const deletedUser = await userService.deleteUser(id);
      
      if (!deletedUser) {
        throw new AppError('Usuário não encontrado');
      }

      res.json({
        success: true,
        message: 'Usuário deletado com sucesso',
      });
    } catch (error) {
      next(error);
    }
  },
};
