import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { AppError } from './errorHandler';

const userSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.min': 'Nome deve ter pelo menos 2 caracteres',
      'string.max': 'Nome deve ter no máximo 50 caracteres',
      'any.required': 'Nome é obrigatório',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Email deve ter um formato válido',
      'any.required': 'Email é obrigatório',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Senha deve ter pelo menos 6 caracteres',
      'any.required': 'Senha é obrigatória',
    }),
  age: Joi.number()
    .integer()
    .min(0)
    .max(120)
    .optional()
    .messages({
      'number.min': 'Idade deve ser positiva',
      'number.max': 'Idade deve ser menor que 120',
    }),
  isActive: Joi.boolean().optional(),
});

export const validateUser = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(', ');
    
    throw new AppError(errorMessage);
  }

  next();
};
