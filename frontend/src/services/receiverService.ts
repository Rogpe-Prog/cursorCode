import api from './api';

export interface Receiver {
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

export interface SearchReceiversRequest {
  address: string;
  radiusKm?: number;
}

export interface SearchReceiversResponse {
  success: boolean;
  message: string;
  data: {
    receivers: Receiver[];
    searchParams: {
      address: string;
      radiusKm: number;
    };
  };
}

export interface SendMessageRequest {
  receiverId: string;
  message: string;
}

export interface SendMessageResponse {
  success: boolean;
  message: string;
  data: {
    messageId: string;
    sentAt: string;
  };
}

export interface GetReceiverResponse {
  success: boolean;
  message: string;
  data: {
    receiver: Receiver;
  };
}

export class ReceiverService {
  async searchReceivers(params: SearchReceiversRequest): Promise<SearchReceiversResponse> {
    try {
      const response = await api.post<SearchReceiversResponse>('/receivers/search', params);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error?.message || 
        'Erro ao buscar recebedores'
      );
    }
  }

  async sendMessage(params: SendMessageRequest): Promise<SendMessageResponse> {
    try {
      const response = await api.post<SendMessageResponse>('/receivers/message', params);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error?.message || 
        'Erro ao enviar mensagem'
      );
    }
  }

  async getReceiverById(receiverId: string): Promise<GetReceiverResponse> {
    try {
      const response = await api.get<GetReceiverResponse>(`/receivers/${receiverId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error?.message || 
        'Erro ao buscar recebedor'
      );
    }
  }
}

export const receiverService = new ReceiverService();
