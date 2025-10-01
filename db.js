// Importar el módulo mysql2
const mysql = require('mysql2');

// Crear el pool de conexiones
const pool = mysql.createPool({
  host: '18.191.159.179',           // Dirección del servidor MySQL
  user: 'practicas',            // Usuario de la base de datos
  password: 'Practicas#123',   // Contraseña del usuario
  database: 'Practicas',      // Nombre de la base de datos
  waitForConnections: true,  // Esperar conexiones si el pool está lleno
  connectionLimit: 10       // Número máximo de conexiones en el pool
  
});

// Exportar el pool para usarlo en otros módulos
module.exports = pool;
