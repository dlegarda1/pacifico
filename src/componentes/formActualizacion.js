import React, { useState } from 'react';

function FormActualizacion() {
  const [formData, setFormData] = useState({ id: '', newName: '' });
  const [formBase, setFormBase] = useState({ id: '', newName: '',age:''});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //vamos a requerir los datos al servidor para cargar en una lista
  React.useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((datos) => setFormBase(datos));
  }, []);

  console.log(formBase);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/user/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newName: formData.newName }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div>
      <h2>Formulario PUT</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID del usuario:</label>
        <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} required /><br /><br />
        <label htmlFor="newName">Nuevo nombre:</label>
        <input type="text" id="newName" name="newName" value={formData.newName} onChange={handleChange} required /><br /><br />
        <button type="submit" className="btn btn-primary">Actualizar</button>
      </form>
    </div>
  );
}

export default FormActualizacion;
