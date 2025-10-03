import { Router } from 'express';
import { userRoutes } from './userRoutes';
import { authRoutes } from './authRoutes';
import receiverRoutes from './receiverRoutes';

const router = Router();

// Rotas de autenticação
router.use('/auth', authRoutes);

// Rotas de usuários
router.use('/users', userRoutes);

// Rotas de recebedores
router.use('/receivers', receiverRoutes);

// Rota de exemplo
router.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'API Node.js funcionando!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

export { router as apiRoutes };
