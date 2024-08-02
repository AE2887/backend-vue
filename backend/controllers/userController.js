import bcrypt from 'bcryptjs';
import User from '../models/user.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error: error.message });
  }
};
export const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  console.log('Requested Email:', email); // Verifica el correo solicitado
  try {
    const user = await User.findByEmail(email);
    console.log('User Found:', user); // Verifica el usuario encontrado
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ message: 'Error retrieving user', error: error.message });
  }
};

export const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findByUsername(username);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error: error.message });
  }
};

export const createUser = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await User.create(username, hashedPassword, email);
    res.status(201).json({ id: userId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  try {
    const updated = await User.update(id, username, email);
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await User.delete(id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};
