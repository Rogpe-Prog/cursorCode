import { connectDatabase, disconnectDatabase } from '../config/database';

// Configuração global para os testes
beforeAll(async () => {
  await connectDatabase();
});

afterAll(async () => {
  await disconnectDatabase();
});

// Limpar dados entre testes
afterEach(async () => {
  // Aqui você pode adicionar lógica para limpar dados entre testes
  // Por exemplo, limpar coleções específicas do MongoDB
});
