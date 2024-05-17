const express = require('express');
const autenticacion = require('./Intermediarios/autenticacion.js'); 
const Token = require('./Intermediarios/token.js');

const router = express.Router();

const app = express();
const puerto = 3002;

// Middleware para parsear el body de la solicitud
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//escribir un metodo get
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Rutas
app.get('/api/login',autenticacion,Token.envioToken,async(req,res)=>{
  res.json({ mensaje: "acceso concedido" });
});

/*
app.get('/api/login',autenticacion,Token.envioTokenCookie,async(req,res)=>{
  res.json({ mensaje: "acceso concedido" });
});*/

app.get('/home',(req,res)=>{
    res.redirect(`http://localhost:3001/prueba`);
});

// Iniciar el servidor
app.listen(puerto, () => {
  console.log(`Servidor autorizacion iniciado en http://localhost:${puerto}`);
});

