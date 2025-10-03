import { User } from '../models/User';
import { config } from '../config/environment';

export interface ReceiverSearchParams {
  address: string;
  radiusKm?: number;
}

export interface ReceiverWithDistance {
  _id: string;
  name: string;
  email: string;
  address: string;
  cel: string;
  userType: 'recebedor' | 'ambos';
  availableStatus: boolean;
  credits: number;
  distance: number;
}

export interface MessageRequest {
  receiverId: string;
  message: string;
  senderId: string;
}

export class ReceiverService {
  // Função simplificada para calcular distância
  // Em produção, você usaria uma API de geocoding como Google Maps
  private calculateDistance(address1: string, address2: string): number {
    // Implementação simplificada baseada em coordenadas aproximadas
    // Em produção, você converteria endereços para coordenadas usando geocoding
    
    // Simula cálculo de distância baseado em similaridade de endereços
    const similarity = this.calculateStringSimilarity(
      address1.toLowerCase(), 
      address2.toLowerCase()
    );
    
    // Converte similaridade em distância aproximada (0-2km)
    return Math.round((1 - similarity) * 2 * 100) / 100;
  }

  private calculateStringSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const distance = this.levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  }

  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => 
      Array(str1.length + 1).fill(null)
    );

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }

    return matrix[str2.length][str1.length];
  }

  async searchReceivers(params: ReceiverSearchParams): Promise<ReceiverWithDistance[]> {
    try {
      const { address, radiusKm = 1 } = params;

      // Busca usuários que podem receber encomendas
      const receivers = await User.find({
        userType: { $in: ['recebedor', 'ambos'] },
        availableStatus: true,
        isActive: true,
      }).select('name email address cel userType availableStatus credits');

      // Calcula distâncias e filtra por raio
      const receiversWithDistance: ReceiverWithDistance[] = receivers
        .map(receiver => ({
          _id: receiver._id.toString(),
          name: receiver.name,
          email: receiver.email,
          address: receiver.address,
          cel: receiver.cel,
          userType: receiver.userType as 'recebedor' | 'ambos',
          availableStatus: receiver.availableStatus,
          credits: receiver.credits,
          distance: this.calculateDistance(address, receiver.address),
        }))
        .filter(receiver => receiver.distance <= radiusKm)
        .sort((a, b) => a.distance - b.distance);

      return receiversWithDistance;
    } catch (error) {
      console.error('Erro ao buscar recebedores:', error);
      throw new Error('Erro interno do servidor');
    }
  }

  async sendMessage(messageData: MessageRequest): Promise<{ success: boolean; messageId: string }> {
    try {
      const { receiverId, message, senderId } = messageData;

      // Verifica se o recebedor existe e está ativo
      const receiver = await User.findById(receiverId);
      if (!receiver || !receiver.isActive) {
        throw new Error('Recebedor não encontrado ou inativo');
      }

      // Verifica se o sender existe
      const sender = await User.findById(senderId);
      if (!sender || !sender.isActive) {
        throw new Error('Remetente não encontrado ou inativo');
      }

      // Aqui você implementaria a lógica para salvar a mensagem
      // Por exemplo, criar um modelo Message e salvar no banco
      const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Simula o envio da mensagem
      console.log(`Mensagem enviada de ${sender.name} para ${receiver.name}: ${message}`);

      return {
        success: true,
        messageId,
      };
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      throw error;
    }
  }

  async getReceiverById(receiverId: string): Promise<ReceiverWithDistance | null> {
    try {
      const receiver = await User.findById(receiverId)
        .select('name email address cel userType availableStatus credits');

      if (!receiver || !receiver.isActive) {
        return null;
      }

      return {
        _id: receiver._id.toString(),
        name: receiver.name,
        email: receiver.email,
        address: receiver.address,
        cel: receiver.cel,
        userType: receiver.userType as 'recebedor' | 'ambos',
        availableStatus: receiver.availableStatus,
        credits: receiver.credits,
        distance: 0, // Não calculamos distância para busca individual
      };
    } catch (error) {
      console.error('Erro ao buscar recebedor:', error);
      throw new Error('Erro interno do servidor');
    }
  }
}

export const receiverService = new ReceiverService();
