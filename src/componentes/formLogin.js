import React, { useState } from 'react';
import axios from 'axios';

function FormLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        'http://localhost:3002/login',
        { username, password },
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Error de autenticación: Credenciales inválidas o no autorizadas.');
      } else {
        console.error('Error al enviar la solicitud:', error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="username"
        name="username"
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        id="password"
        name="password"
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