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
app.post('/', (req, res) => {
  res.cookie('nuevoCookie', 'token', { httpOnly: true, secure:false, sameSite:'lax',maxAge: 3600000 });
  //res.send('¡Hola, mundo!');
  res.redirect('/acceso/datos');
});

app.post('/login', autenticarDB,TokenDB.envioTokenCookieDB,async(req, res) => {
    res.cookie('seraCookie', 'token', { secure: true, sameSite: 'None', maxAge: 3600000 }); 
    res.status(200).send('¡Autenticación exitosa!');  
});



// Rutas
/*
app.post('/login',async(req,res)=>{
  /*const tokenenviar=req.token;
  console.log(tokenenviar);
  res.cookie('cookietoken',tokenenviar);
  res.send('cookie enviada');*/
 // res.redirect('/cookie');
  //res.cookie('nuevoCookie', 'token', { httpOnly: true, secure:true, sameSite:'lax',maxAge: 3600000 });
  //res.send('¡Hola, mundo!');
//});
/*
app.post('/login', (req, res) => {
  // Realizar alguna lógica o procesamiento aquí

  // Redirigir al cliente a una nueva ruta que responde a solicitudes GET
  res.redirect('/nueva-ruta');
});

app.get('/nueva-ruta', (req, res) => {
  res.cookie('nuevoCookie', 'token', { httpOnly: true, secure:true, sameSite:'lax',maxAge: 3600000 });
  res.send('Esta es la nueva ruta');
});

app.post('/cookie'),async(req,res)=>{
  res.cookie('nuevoCookie', 'token', { httpOnly: true, secure:true, sameSite:'lax',maxAge: 3600000 });
  res.send('¡Hola, mundo!');
}

// Ruta protegida
app.use('/basedatos',TokenDB.verificacionTokenCookieDB,rutasMongoDB);
  
*/
//ruta normal
app.use('/acceso',rutasMongoDB);
//conexión base de datos MongoDB
connectDB();

// Iniciar el servidor
app.listen(puerto, () => {
  console.log(`Servidor autorizacion iniciado en http://localhost:${puerto}`);
});

