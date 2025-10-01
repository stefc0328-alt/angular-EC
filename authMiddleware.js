// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const secretKey = 'tu-clave-secreta'; // usa la misma clave que en tu server.js

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // formato: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ mensaje: 'Token inválido o expirado' });
    }
    req.user = user; // guardamos los datos del token en la request
    next();
  });
}

module.exports = verificarToken;

