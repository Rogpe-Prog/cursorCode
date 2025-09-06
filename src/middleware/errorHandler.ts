import { Request, Response, NextFunction } from 'express';
import { config } from '../config/environment';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let { statusCode = 500, message } = error;

  // Se for um erro de validação do Mongoose
  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Dados inválidos';
  }

  // Se for um erro de duplicação do Mongoose
  if (error.name === 'MongoError' && (error as any).code === 11000) {
    statusCode = 409;
    message = 'Recurso já existe';
  }

  // Se for um erro de cast do Mongoose
  if (error.name === 'CastError') {
    statusCode = 400;
    message = 'ID inválido';
  }

  // Log do erro
  console.error('❌ Erro:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });

  // Resposta do erro
  res.status(statusCode).json({
    success: false,
    error: {
      message: config.nodeEnv === 'production' 
        ? 'Erro interno do servidor' 
        : message,
      ...(config.nodeEnv !== 'production' && { stack: error.stack }),
    },
  });
};
