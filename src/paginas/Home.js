import React, { useState } from 'react';
import CardCompra from '../Componentes/cardcompra';
import FormLogin from '../Componentes/formLogin';
import Formulario from '../Componentes/formulario';
import FormProtegido from '../Componentes/formProtegido';
import FormProtegidoBD from '../Componentes/formManejoBaseDatos';
import ContadorClicks from '../Componentes/contadorClicks';
import ImagenForm from '../Componentes/imagenForm'
import DocumentoForm from '../Componentes/documentoForm'
function Home() {
  const [autenticacion, setAutenticacion] = useState(false);

  const handleLogin = () => {
    setAutenticacion(true);
  };
  return(    
    <div className="container">
      <ImagenForm/>   
      <DocumentoForm/>      
    </div>
  )
  /*
  return (
    <div className="App">
      <header className="App-header" />
      <h1>Home</h1>
      {autenticacion ? (
        <FormProtegidoBD />
      ) : (
        <FormLogin onLogin={handleLogin} />
      )}    
    </div>
  );*/
}

export default Home;