const express = require('express');
const autenticacion = require('./Intermediarios/autenticacion.js'); 
const autenticarDB = require('./Intermediarios/autenticacionDB.js'); 
const connectDB = require('./BaseDatos/conexionmongoDB');
const rutasMongoDB = require('./rutas/rutasMongoDB');
const Token = require('./Intermediarios/token.js');
const TokenDB=require('./Intermediarios/tokenDB.js'); 

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
app.post('/login',autenticarDB,TokenDB.envioTokenDB);


// Ruta protegida
app.get('/protected', TokenDB.verificacionTokenDB,async(req, res) => {
  //res.send('Esta ruta está protegida');
  console.log(req.user.rol);
  console.log(req.user.username);

  if(req.user.rol==="admin"){
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


//rutas para manejo de base de datos
app.post('/registro',Token.verificacionToken,rutasMongoDB)


app.get('/home',(req,res)=>{
    res.redirect(`http://localhost:3001/prueba`);
});

//conexión base de datos MongoDB
connectDB();

// Iniciar el servidor
app.listen(puerto, () => {
  console.log(`Servidor autorizacion iniciado en http://localhost:${puerto}`);
});

