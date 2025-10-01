const pool = require('./db');

const datos = {
  dpi: '1234567890101',
  nombre: 'Elizabeth',
  fechaNacimiento: '1995-06-15',
  direccion: 'Zona 10, Guatemala',
  tipoCuenta: 'ahorros'
};

const query = 'INSERT INTO cuentas (dpi, nombre, fechaNacimiento, direccion, tipoCuenta) VALUES (?, ?, ?, ?, ?)';

pool.query(query, [datos.dpi, datos.nombre, datos.fechaNacimiento, datos.direccion, datos.tipoCuenta], (err, results) => {
  if (err) {
    console.error('Error al insertar:', err);
  } else {
    console.log('Insertado con ID:', results.insertId);
  }
});
