import React, { useState } from 'react';
import CardCompra from '../Componentes/cardcompra';
import FormLogin from '../Componentes/formLogin';
import Formulario from '../Componentes/formulario';
import FormProtegido from '../Componentes/formProtegido';

function Home() {
  const [autenticacion, setAutenticacion] = useState(false);

  const handleLogin = () => {
    setAutenticacion(true);
  };
  return (
    <div className="App">
      <header className="App-header" />
      <h1>Home</h1>
      {autenticacion ? (
        <FormProtegido />
      ) : (
        <FormLogin onLogin={handleLogin} />
      )}    
    </div>
  );
}

export default Home;