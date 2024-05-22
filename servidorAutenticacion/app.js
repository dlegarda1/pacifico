const express = require('express');
//const autenticacion = require('./Intermediarios/autenticacion.js'); 
const autenticarDB = require('./Intermediarios/autenticacionDB.js'); 
const connectDB = require('./BaseDatos/conexionmongoDB');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rutasMongoDB = require('./rutas/rutasMongoDB');
//const Token = require('./Intermediarios/token.js');
const TokenDB=require('./Intermediarios/tokenDB.js'); 
const { redirect } = require('react-router-dom');

const router = express.Router();

const app = express();
const puerto = 3002;

// Middleware para parsear el body de la solicitud
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:3002'] 
}))
app.use(cookieParser());


//escribir un metodo get
app.get('/', (req, res) => {
  res.cookie('nuevoCookie', 'token', { httpOnly: true, secure:true, sameSite:'lax',maxAge: 3600000 });
  res.send('¡Hola, mundo!');
});

// Rutas
app.post('/login',async(req,res)=>{
  /*const tokenenviar=req.token;
  console.log(tokenenviar);
  res.cookie('cookietoken',tokenenviar);
  res.send('cookie enviada');*/
  redirect('/cookie');
  //res.cookie('nuevoCookie', 'token', { httpOnly: true, secure:true, sameSite:'lax',maxAge: 3600000 });
  //res.send('¡Hola, mundo!');
});

app.get('/cookie'),async(req,res)=>{
  res.cookie('nuevoCookie', 'token', { httpOnly: true, secure:true, sameSite:'lax',maxAge: 3600000 });
  res.send('¡Hola, mundo!');
}

// Ruta protegida
app.use('/basedatos',TokenDB.verificacionTokenCookieDB,rutasMongoDB);
  

//ruta normal
app.use('/acceso',rutasMongoDB);
//conexión base de datos MongoDB
connectDB();

// Iniciar el servidor
app.listen(puerto, () => {
  console.log(`Servidor autorizacion iniciado en http://localhost:${puerto}`);
});

