const bodyParser = require('body-parser');

//arreglos con datos predefinidos
let users = [
    { id: 1, name: 'Carlos', age: 20 },
    { id: 2, name: 'Maria', age: 50 },
  ];



const enviarMensaje=(req, res) => {
  res.json({ mensaje: "Hola desde el servidor!" });
}


const enviarUsuarios=(req, res) => {
  res.json(users);
};


const ingresoUsuario= (req, res) => {
  const { name, age } = req.body;
  const edad = parseInt(age);
  console.log(req.body);
  console.log('Nombre:', name);
  console.log('Edad:', age);
  res.json({ message: 'Datos recibidos correctamente' });
  users.push({ id: users.length + 1, name, age:edad });
  console.log(users);
}


const actualizacionNombre=(req, res) => {
  const { id } = req.params;
  const { newName } = req.body;
  const userId = parseInt(id);
  const user = users.find(user => user.id === userId);
  if (user) {
    user.name = newName;
    res.json({ message: `Usuario ${id} actualizado` });
  } else {
    res.status(404).json({ message: `Usuario ${id} no encontrado` });
  }
}


const eliminarUsuario= (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.json({ message: `Usuario ${id} eliminado` });
  } else {
    res.status(404).json({ message: `Usuario ${id} no encontrado` });
  }
}


const enviarUsuario=(req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);
  const user = users.find(user => user.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: `Usuario ${id} no encontrado` });
  }
}

//exportamos las funciones
module.exports = {
  enviarMensaje,
  enviarUsuarios,
  ingresoUsuario,
  actualizacionNombre,
  eliminarUsuario,
  enviarUsuario
};
