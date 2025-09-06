import mongoose from 'mongoose';
import { config } from './environment';

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = config.nodeEnv === 'test' 
      ? config.mongodbTestUri 
      : config.mongodbUri;

    await mongoose.connect(mongoUri);
    
    console.log('✅ Conectado ao MongoDB com sucesso');
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('✅ Desconectado do MongoDB');
  } catch (error) {
    console.error('❌ Erro ao desconectar do MongoDB:', error);
  }
};
