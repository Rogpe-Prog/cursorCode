import { Router } from 'express';
import { userController } from '../controllers/userController';
import { validateUser } from '../middleware/validation';

const router = Router();

// GET /api/users - Listar todos os usuários
router.get('/', userController.getAllUsers);

// GET /api/users/:id - Buscar usuário por ID
router.get('/:id', userController.getUserById);

// POST /api/users - Criar novo usuário
router.post('/', validateUser, userController.createUser);

// PUT /api/users/:id - Atualizar usuário
router.put('/:id', validateUser, userController.updateUser);

// DELETE /api/users/:id - Deletar usuário
router.delete('/:id', userController.deleteUser);

export { router as userRoutes };
