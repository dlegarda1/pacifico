import React, { useState } from 'react';

function FormActualizacion() {
  const [formData, setFormData] = useState({ id: '', newName: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
