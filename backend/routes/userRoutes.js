import express from 'express';
import { getAllUsers, createUser, updateUser, deleteUser, getUserByEmail, getUserByUsername } from '../controllers/userController.js';
import { authenticateToken } from '../controllers/authController.js';

const router = express.Router();

router.get('/users', authenticateToken, getAllUsers);
router.get('/users/email/:email',authenticateToken, getUserByEmail);
router.get('/users/username/:username', authenticateToken, getUserByUsername); 
router.post('/users', authenticateToken, createUser);
router.put('/users/:id', authenticateToken, updateUser);
router.delete('/users/:id', authenticateToken, deleteUser);

export default router;
