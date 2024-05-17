import React, { useState } from 'react';
import axios from 'axios';

function FormLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = `${username}:${password}`;
    const base64Credentials = btoa(credentials);

    try {
      const response = await axios.post('http://localhost:3001/api/login', {}, {
        headers: { Authorization: `Basic ${base64Credentials}` }
      });
      const token = response.data.token;
      localStorage.setItem('token', token); 
      onLogin(); 
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