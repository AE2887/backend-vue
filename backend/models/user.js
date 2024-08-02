import pool from '../config/db.js';

const User = {
  // Buscar por nombre de usuario
  findByUsername: async (username) => {
    username = username.toLowerCase(); // Convertir a minúsculas
    const [rows] = await pool.query('SELECT * FROM users WHERE LOWER(username) = ?', [username]);
    return rows[0];
  },

  // Buscar por correo electrónico
  findByEmail: async (email) => {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0];
    } catch (error) {
      console.error('Error in User.findByEmail:', error);
      throw error;
    }
  },

  // Crear un nuevo usuario
  create: async (username, hashedPassword, email) => {
    username = username.toLowerCase(); // Convertir a minúsculas
    email = email.toLowerCase(); // Convertir a minúsculas
    try {
      const [result] = await pool.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email]);
      console.log('Insert Result:', result);
      return result.insertId;
    } catch (error) {
      console.error('Error in User.create:', error);
      throw error;
    }
  },

  // Obtener todos los usuarios
  findAll: async () => {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  },

  // Actualizar un usuario existente
  update: async (id, username, email) => {
    username = username.toLowerCase(); // Convertir a minúsculas
    email = email.toLowerCase(); // Convertir a minúsculas
    const [result] = await pool.query('UPDATE users SET username = ?, email = ? WHERE id = ?', [username, email, id]);
    return result.affectedRows > 0;
  },

  // Eliminar un usuario
  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

export default User;
