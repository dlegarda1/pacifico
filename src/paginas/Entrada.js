import React from 'react';
import { useContext } from 'react';
import { temaContexto } from '../Componentes/Tema';



function Entrada(){
    const tema = useContext(temaContexto);
    return (
        <div>
          <h1>entrada</h1>
        </div>
                
            
        
        
    );
}

export default Entrada;