const { registerUser, loginUser } = require('./userController');
const { verifyToken } = require('./authMiddleware');

app.post('/register', registerUser);
app.post('/login', loginUser);
app.get('/cuentas', verifyToken, cuentasHandler);
app.get('/transacciones', verifyToken, transaccionesHandler);