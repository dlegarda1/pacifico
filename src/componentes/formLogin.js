import React, { useState } from 'react';
import axios from 'axios';

function FormLogin() {
  const [username, setUsername] = useState ('');
  const [password, setPassword] = useState ('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:3001/api/login', { username, password });
      console.log('Respuesta del servidor:', response.data);      
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}

export default FormLogin;