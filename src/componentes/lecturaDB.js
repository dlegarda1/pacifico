import React, { useState, useEffect } from 'react';

function Recibir() { 
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    fetch("/api/mongoDB/datos") // Ruta en tu servidor Express para obtener los datos
      .then((res) => res.json())
      .then((datos) => setDatos(datos));
  }, []);

  return (
    <div className="App">
      <header className="App-header">        
        {datos ? (
          <ul>
            {datos.map((dato) => (
              <li key={dato._id}>
                {dato.id} - {dato.name} - {dato.age} años
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
}