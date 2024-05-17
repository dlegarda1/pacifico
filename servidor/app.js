const express = require('express');
const rutasUsuario = require('./rutas/rutasUser');
const connectDB = require('./BaseDatos/conexionmongoDB');
const cors = require('cors');
const rutasMongoDB = require('./rutas/rutasMongoDB');
const autenticacion = require('./Intermediarios/autenticacion.js');
const Token = require('./Intermediarios/token.js');

const router = express.Router();

const app = express();
const puerto = 3001;

const corsOptions = {
  origin: '*', // Permitir acceso desde cualquier origen
  credentials: true, // Permitir credenciales (cookies, autenticación, etc.)
  optionSuccessStatus: 200, // Establecer el código de estado de éxito
};

// Middleware para parsear el body de la solicitud
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

//escribir un metodo get
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Rutas
app.use('/api/user', Token.verificacionTokenCookie, rutasUsuario);
app.use('/api/mongoDB', rutasMongoDB);
app.get('/prueba', Token.verificacionToken, (req, res) => {
  res.send('Esto es una prueba de acceso exitoso');
});

app.get('/admin', (req, res) => {
  res.send('usuario con privilegios');
});
app.get('/usuario', (req, res) => {
  res.send('usuario sin privilegios');
});

app.post('/api/login', autenticacion, Token.envioToken, async (req, res) => {
  res.json({ mensaje: "acceso concedido" });
});

/*
app.post('/api/login',autenticacion,Token.envioTokenCookie,async(req,res)=>{
  res.json({ mensaje: "acceso concedido" });
});*/
// Conectar a la base de datos
connectDB();

// Iniciar el servidor
app.listen(puerto, () => {
  console.log(`Servidor iniciado en http://localhost:${puerto}`);
});

