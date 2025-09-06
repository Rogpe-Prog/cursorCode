import { Router } from 'express';
import { userRoutes } from './userRoutes';

const router = Router();

// Rotas de usuários
router.use('/users', userRoutes);

// Rota de exemplo
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API Node.js funcionando!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

export { router as apiRoutes };
