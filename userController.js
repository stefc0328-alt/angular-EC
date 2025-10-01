// userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = 'tu-clave-secreta'; // Usa variables de entorno en producción

let users = []; // Temporal, idealmente usarías MySQL

exports.registerUser = async (req, res) => {
  const { usuario, clave } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ usuario, clave: hashedPassword });
  res.status(201).json({ message: 'Usuario registrado' });
};

exports.loginUser = async (req, res) => {
  const { usuario, clave } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Credenciales inválidas' });
  }
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  res.json({ token });
};
