const express = require('express');
const router = express.Router();
const usuario = require('../controladores/controladorUser');

// Rutas
router.get('/', usuario.enviarMensaje);
router.post('/', usuario.ingresoUsuario);
router.get('/', usuario.enviarUsuarios);
router.get('/:id', usuario.enviarUsuario);
router.put('/:id', usuario.actualizacionNombre);
router.delete('/:id', usuario.eliminarUsuario);

module.exports = router;