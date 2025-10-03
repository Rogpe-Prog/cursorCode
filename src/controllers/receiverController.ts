import { Request, Response } from 'express';
import { receiverService, ReceiverSearchParams, MessageRequest } from '../services/receiverService';
import { AuthenticatedRequest } from '../types';

export class ReceiverController {
  async searchReceivers(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { address, radiusKm } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({
          success: false,
          error: { message: 'Usuário não autenticado' },
        });
        return;
      }

      if (!address || typeof address !== 'string' || address.trim().length === 0) {
        res.status(400).json({
          success: false,
          error: { message: 'Endereço é obrigatório' },
        });
        return;
      }

      const searchParams: ReceiverSearchParams = {
        address: address.trim(),
        radiusKm: radiusKm || 1,
      };

      const receivers = await receiverService.searchReceivers(searchParams);

      res.status(200).json({
        success: true,
        message: `${receivers.length} recebedor(es) encontrado(s)`,
        data: {
          receivers,
          searchParams: {
            address: searchParams.address,
            radiusKm: searchParams.radiusKm,
          },
        },
      });
    } catch (error: any) {
      console.error('Erro no controlador de busca de recebedores:', error);
      res.status(500).json({
        success: false,
        error: { message: error.message || 'Erro interno do servidor' },
      });
    }
  }

  async sendMessage(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { receiverId, message } = req.body;
      const senderId = req.user?.id;

      if (!senderId) {
        res.status(401).json({
          success: false,
          error: { message: 'Usuário não autenticado' },
        });
        return;
      }

      if (!receiverId || typeof receiverId !== 'string') {
        res.status(400).json({
          success: false,
          error: { message: 'ID do recebedor é obrigatório' },
        });
        return;
      }

      if (!message || typeof message !== 'string' || message.trim().length === 0) {
        res.status(400).json({
          success: false,
          error: { message: 'Mensagem é obrigatória' },
        });
        return;
      }

      if (message.trim().length < 10) {
        res.status(400).json({
          success: false,
          error: { message: 'Mensagem deve ter pelo menos 10 caracteres' },
        });
        return;
      }

      const messageData: MessageRequest = {
        receiverId,
        message: message.trim(),
        senderId,
      };

      const result = await receiverService.sendMessage(messageData);

      res.status(200).json({
        success: true,
        message: 'Mensagem enviada com sucesso',
        data: {
          messageId: result.messageId,
          sentAt: new Date().toISOString(),
        },
      });
    } catch (error: any) {
      console.error('Erro no controlador de envio de mensagem:', error);
      res.status(500).json({
        success: false,
        error: { message: error.message || 'Erro interno do servidor' },
      });
    }
  }

  async getReceiverById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { receiverId } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({
          success: false,
          error: { message: 'Usuário não autenticado' },
        });
        return;
      }

      if (!receiverId) {
        res.status(400).json({
          success: false,
          error: { message: 'ID do recebedor é obrigatório' },
        });
        return;
      }

      const receiver = await receiverService.getReceiverById(receiverId);

      if (!receiver) {
        res.status(404).json({
          success: false,
          error: { message: 'Recebedor não encontrado' },
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Recebedor encontrado',
        data: { receiver },
      });
    } catch (error: any) {
      console.error('Erro no controlador de busca de recebedor:', error);
      res.status(500).json({
        success: false,
        error: { message: error.message || 'Erro interno do servidor' },
      });
    }
  }
}

export const receiverController = new ReceiverController();
