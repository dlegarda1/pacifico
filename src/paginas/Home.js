//crear un componente con react
import React from 'react';
/*import Recibir from '../componentes/Recibir';
import Card from '../componentes/card';*/
import Formulario from '../componentes/formulario';
import FormActualizacion from '../componentes/formActualizacion';
import FormEliminar from '../componentes/formEliminar';

function Home() {   
  return (
    <div className="App">
      <Formulario/>   
    </div>
  );
}

export default Home;