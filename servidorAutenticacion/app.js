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
app.get('/login',autenticacion,Token.envioTokenCookie,async(req,res)=>{
  res.json({ mensaje: "acceso concedido" });
});

// Ruta protegida
app.get('/protected', Token.verificacionTokenCookie,async(req, res) => {
  //res.send('Esta ruta está protegida');
  console.log(req.user.username);
  user=req.user.username;
  if(user==="Carlos"){
    res.redirect(`http://localhost:3001/admin`);
  }  
else{
  res.redirect(`http://localhost:3001/usuario`);
}
});
/*
app.get('/login',autenticacion,Token.envioTokenCookie,async(req,res)=>{
  res.json({ mensaje: "acceso concedido" });
});*/

app.get('/home',(req,res)=>{
    res.redirect(`http://localhost:3001/prueba`);
});

// Iniciar el servidor
app.listen(puerto, () => {
  console.log(`Servidor autorizacion iniciado en http://localhost:${puerto}`);
});

