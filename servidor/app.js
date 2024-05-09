const express = require('express');
const rutasUsuario = require('./rutas/rutasUser');
const connectDB = require('./BaseDatos/conexionmongoDB');
const rutasMongoDB = require('./rutas/rutasMongoDB');

const app = express();
const puerto = 3001;

// Middleware para parsear el body de la solicitud
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rutas
app.use('/api/user', rutasUsuario);
app.use('/api/mongoDB', rutasUsuario);


// Conectar a la base de datos
connectDB();

// Iniciar el servidor
app.listen(puerto, () => {
  console.log(`Servidor iniciado en http://localhost:${puerto}`);
});

