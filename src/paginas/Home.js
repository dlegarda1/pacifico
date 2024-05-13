//crear un componente con react
import React from 'react';
/*import Recibir from '../componentes/Recibir';
import Card from '../componentes/card';*/
/*import Formulario from '../componentes/formulario';
import FormActualizacion from '../componentes/formActualizacion';
import FormEliminar from '../componentes/formEliminar';*/
import LecturaDB from '../componentes/lecturaDB';
import FormularioDB from '../componentes/formularioDB';
import FormActualizacionDB from '../componentes/actualizacionDB';
import EliminacionDB from '../componentes/eliminarUsuarioDB';

function Home() {   
  return (
    <div className="App">
      <header className="App-header"/>
        <h1>Home</h1>      
      <EliminacionDB/>       
    </div>
  );
}

export default Home;