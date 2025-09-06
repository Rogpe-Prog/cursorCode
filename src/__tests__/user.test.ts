import request from 'supertest';
import app from '../index';
import { User } from '../models/User';

describe('User API', () => {
  beforeEach(async () => {
    // Limpar dados antes de cada teste
    await User.deleteMany({});
  });

  describe('POST /api/users', () => {
    it('deve criar um novo usuário com dados válidos', async () => {
      const userData = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: '123456',
        age: 30,
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(userData.name);
      expect(response.body.data.email).toBe(userData.email);
      expect(response.body.data.password).toBeUndefined();
    });

    it('deve retornar erro com dados inválidos', async () => {
      const invalidData = {
        name: 'J', // Muito curto
        email: 'email-invalido',
        password: '123', // Muito curto
      };

      const response = await request(app)
        .post('/api/users')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain('Nome deve ter pelo menos 2 caracteres');
    });
  });

  describe('GET /api/users', () => {
    it('deve retornar lista vazia quando não há usuários', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
      expect(response.body.count).toBe(0);
    });

    it('deve retornar lista de usuários', async () => {
      // Criar usuários de teste
      await User.create([
        { name: 'João', email: 'joao@test.com', password: '123456' },
        { name: 'Maria', email: 'maria@test.com', password: '123456' },
      ]);

      const response = await request(app)
        .get('/api/users')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.count).toBe(2);
    });
  });

  describe('GET /api/users/:id', () => {
    it('deve retornar usuário por ID', async () => {
      const user = await User.create({
        name: 'João Silva',
        email: 'joao@test.com',
        password: '123456',
      });

      const response = await request(app)
        .get(`/api/users/${user._id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('João Silva');
    });

    it('deve retornar erro para ID inválido', async () => {
      const response = await request(app)
        .get('/api/users/invalid-id')
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });
});
