import { Router } from 'express';
import { authController } from '../controllers/authController';
import { validateLogin, validateRegister } from '../middleware/authValidation';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// POST /api/auth/register - Registrar novo usuário
router.post('/register', validateRegister, authController.register);

// POST /api/auth/login - Fazer login
router.post('/login', validateLogin, authController.login);

// GET /api/auth/profile - Obter perfil do usuário autenticado
router.get('/profile', authenticateToken, authController.getProfile);

export { router as authRoutes };
