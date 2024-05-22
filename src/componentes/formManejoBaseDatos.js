import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FormProtegidoBD() {
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({ id: '', newName: '' });
  const [actualizando, setActualizando] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = document.cookie;
      const axiosInstance = axios.create({
        withCredentials: true
    });
      //const token = localStorage.getItem('token');
      console.log(token);
      try {
        /*const response = await axios.get('http://localhost:3002/basedatos/datos', {
          headers: { Authorization: `Bearer ${token}` }
        });*/
        const cookietoken=getCookieValue('nuevoCookie');
        console.log(cookietoken);
        const response = await axiosInstance.post('http://localhost:3002/',{withCredentials: true});
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error al obtener los datos protegidos:', error.message);
      }
    };
    fetchData();
  }, []);

  function getCookieValue(nombre) {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(nombre + "=")) {
            return cookie.substring(nombre.length + 1);
        }
    }
    return null; // Si la cookie no se encuentra
}
  const handleFormActualizar=()=>{
    setActualizando(true);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    // Lógica para actualizar el elemento con el ID proporcionado
    console.log('Actualizando el elemento con ID:');
  };

  const handleDelete = async () => {
    // Lógica para eliminar el elemento con el ID proporcionado
    console.log('Eliminando el elemento con ID:');
  };
  console.log("actualizando: "+actualizando);
  return (
    <div>
      {data ? (
        <div>
          <h1>Datos Protegidos</h1>
          <select name="id" value={formData.id} onChange={handleChange}>
            {data.map(opcion => (
              <option key={opcion.username} value={opcion.name}>
                {opcion.name} - {opcion.username} - {opcion.rol}
              </option>
            ))}
          </select><br /><br />
          <button onClick={() => handleFormActualizar()}>Actualizar</button>
          <button onClick={() => handleDelete()}>Eliminar</button>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
      <>
        {actualizando?(
          <>
        <h2>Actualizar</h2>
        <form>
        <input
          name='newName'
          type="text"
          placeholder="Nuevo nombre"
          value={formData.newName}
          onChange={handleChange}/>        
        <button type="submit" onClick={handleUpdate}>Actualizar</button>
        </form>
        </>
        ) : (<h2>formulario Actualizacion</h2>)}
      </>

    </div>
  );
}

export default FormProtegidoBD;