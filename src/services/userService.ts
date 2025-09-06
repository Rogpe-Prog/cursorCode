import { User, IUser } from '../models/User';
import { AppError } from '../middleware/errorHandler';

export const userService = {
  async getAllUsers(): Promise<IUser[]> {
    try {
      const users = await User.find().select('-password');
      return users;
    } catch (error) {
      throw new AppError('Erro ao buscar usuários');
    }
  },

  async getUserById(id: string): Promise<IUser | null> {
    try {
      const user = await User.findById(id).select('-password');
      return user;
    } catch (error) {
      throw new AppError('Erro ao buscar usuário');
    }
  },

  async createUser(userData: Partial<IUser>): Promise<IUser> {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      if (error instanceof Error && error.message.includes('duplicate key')) {
        throw new AppError('Email já cadastrado');
      }
      throw new AppError('Erro ao criar usuário');
    }
  },

  async updateUser(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { ...userData, updatedAt: new Date() },
        { new: true, runValidators: true }
      ).select('-password');
      
      return user;
    } catch (error) {
      throw new AppError('Erro ao atualizar usuário');
    }
  },

  async deleteUser(id: string): Promise<IUser | null> {
    try {
      const user = await User.findByIdAndDelete(id);
      return user;
    } catch (error) {
      throw new AppError('Erro ao deletar usuário');
    }
  },
};
