import { Router } from 'express';
import { receiverController } from '../controllers/receiverController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validation';
import Joi from 'joi';

const router = Router();

// Middleware de autenticação para todas as rotas
router.use(authenticate);

// Validação para busca de recebedores
const searchReceiversSchema = Joi.object({
  address: Joi.string().min(10).max(200).required().messages({
    'string.empty': 'Endereço é obrigatório',
    'string.min': 'Endereço deve ter pelo menos 10 caracteres',
    'string.max': 'Endereço deve ter no máximo 200 caracteres',
    'any.required': 'Endereço é obrigatório',
  }),
  radiusKm: Joi.number().min(0.1).max(10).optional().messages({
    'number.min': 'Raio deve ser pelo menos 0.1km',
    'number.max': 'Raio deve ser no máximo 10km',
  }),
});

// Validação para envio de mensagem
const sendMessageSchema = Joi.object({
  receiverId: Joi.string().required().messages({
    'string.empty': 'ID do recebedor é obrigatório',
    'any.required': 'ID do recebedor é obrigatório',
  }),
  message: Joi.string().min(10).max(500).required().messages({
    'string.empty': 'Mensagem é obrigatória',
    'string.min': 'Mensagem deve ter pelo menos 10 caracteres',
    'string.max': 'Mensagem deve ter no máximo 500 caracteres',
    'any.required': 'Mensagem é obrigatória',
  }),
});

// Rota para buscar recebedores próximos
router.post('/search', validate(searchReceiversSchema), receiverController.searchReceivers);

// Rota para enviar mensagem para um recebedor
router.post('/message', validate(sendMessageSchema), receiverController.sendMessage);

// Rota para buscar um recebedor específico por ID
router.get('/:receiverId', receiverController.getReceiverById);

export default router;
