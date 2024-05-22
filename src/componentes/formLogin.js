import React, { useState } from 'react';
import axios from 'axios';

function FormLogin({ onLogin }) {
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
      const rol = response.data.rol;
      console.log(response);
      console.log(rol);
      console.log(response.data.message);
      console.log(response.data.username);
      //localStorage.setItem('token', token); 
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
      
      <label className="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
        <input 
          id="username"
          name="username"
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      </label>
      <button className="btn btn-primary" type="submit">Iniciar sesión</button>
    </form>
  );
}

export default FormLogin;