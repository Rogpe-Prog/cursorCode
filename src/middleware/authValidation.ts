import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { AppError } from './errorHandler';

const loginSchema = Joi.object({
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
});

const registerSchema = Joi.object({
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
  cel: Joi.string()
    .pattern(/^[0-9]{10,11}$/)
    .required()
    .messages({
      'string.pattern.base': 'Celular deve conter apenas números e ter 10 ou 11 dígitos',
      'any.required': 'Celular é obrigatório',
    }),
  userType: Joi.string()
    .valid('comprador', 'recebedor', 'ambos')
    .required()
    .messages({
      'any.only': 'Tipo de usuário deve ser: comprador, recebedor ou ambos',
      'any.required': 'Tipo de usuário é obrigatório',
    }),
  address: Joi.string()
    .min(10)
    .max(200)
    .required()
    .messages({
      'string.min': 'Endereço deve ter pelo menos 10 caracteres',
      'string.max': 'Endereço deve ter no máximo 200 caracteres',
      'any.required': 'Endereço é obrigatório',
    }),
  availableStatus: Joi.boolean()
    .optional()
    .default(true),
  credits: Joi.number()
    .min(0)
    .optional()
    .default(0)
    .messages({
      'number.min': 'Créditos não podem ser negativos',
    }),
});

export const validateLogin = (req: Request, _res: Response, next: NextFunction): void => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(', ');
    
    throw new AppError(errorMessage);
  }

  next();
};

export const validateRegister = (req: Request, _res: Response, next: NextFunction): void => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(', ');
    
    throw new AppError(errorMessage);
  }

  next();
};
