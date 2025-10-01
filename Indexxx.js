const express = require('express');
const cors = require('cors');
const pool = require ('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./authMiddleware');


const app = express();
const PORT = 3000;
const secretKey = 'tu-clave-secreta'; 

// Middleware
app.use(cors());
app.use(express.json()); 


// Ruta para recibir datos del formulario
app.post('/cuenta',  (req, res) => {
  console.log ('Datos recibidos:', req.body); 
  
  const { dpi, nombre, fechaNacimiento, direccion, tipoCuenta } = req.body;
  const query = 'INSERT INTO ecp_cliente (dpi, nombre, fechaNacimiento, direccion, tipoCuenta) VALUES (?, ?, ?, ?, ?)';
  pool.query(query, [dpi, nombre, fechaNacimiento, direccion, tipoCuenta], (err, results) => {
    if (err) {
      console.error('Error al insertar en MySQL:', err); 
      return res.status(500).json({ error: err.message });
    }
    console.log('Insertado con ID:', results.insertId);
    res.status(201).json({ mensaje: 'Cuenta registrada', id: results.insertId });
  });
});

app.post('/transacciones',(req, res) => {
  console.log('Datos recibidos en transacción:', req.body); 

  const { idCliente, cuenta, tipoOperacion, monto } = req.body;
  const query = 'INSERT INTO ecprf_transaccion (idCliente, cuenta, tipoOperacion, monto) VALUES (?, ?, ?, ?)';
  pool.query(query, [idCliente, cuenta, tipoOperacion, monto], (err, results) => {
    if (err) {
      console.error('Error al insertar transacción:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('Transacción insertada con ID:', results.insertId);
    res.status(201).json({ mensaje: 'Transacción realizada', id: results.insertId });
  });
});
// Registro de usuario
app.post('/usuario', async (req, res) => {
  const { usuario, clave } = req.body;
  if (!usuario || !clave) {
    return res.status(400).json({ mensaje: 'Faltan datos' });
  }

  try {
    const hashedPassword = await bcrypt.hash(clave, 10);
    const query = 'INSERT INTO ecp_usuarios (usuario, clave) VALUES (?, ?)';
    pool.query(query, [usuario, hashedPassword], (err, results) => {
      if (err) {
        console.error('Error al registrar usuario:', err);
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ mensaje: 'Usuario registrado', id: results.insertId });
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
  }
});


app.post('/login', (req, res) => {
  const { usuario, clave } = req.body;
  const query = 'SELECT * FROM ecp_usuarios WHERE usuario = ?';

  pool.query(query, [usuario], async (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error interno' });
    if (results.length === 0) return res.status(401).json({ mensaje: 'Usuario no encontrado' });

    const user = results[0];
    try {
      const isPasswordValid = await bcrypt.compare(clave, user.clave);
      if (!isPasswordValid) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

      const token = jwt.sign({ id: user.id, usuario: user.usuario }, secretKey, { expiresIn: '2h' });
      res.status(200).json({ mensaje: 'Login exitoso', token });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al validar la contraseña' });
    }
  });
});
app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});
