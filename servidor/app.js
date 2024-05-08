const express = require('express');
const rutasUsuario=require('./rutas/rutasUser');

const app = express();
const puerto = 3001;

// Middleware para parsear el body de la solicitud
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/user', rutasUsuario);

// Iniciar el servidor
app.listen(puerto, () => {
  console.log(`Servidor iniciado en http://localhost:${puerto}`);
});

