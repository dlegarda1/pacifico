import React, { useState } from 'react';

function FormEliminar() {
  const [userId, setUserId] = useState('');

  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  return (
    <div>
      <h2>Eliminar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userId">ID del usuario:</label>
        <input type="text" id="userId" value={userId} onChange={handleChange} required /><br /><br />
        <button type="submit" className="btn btn-primary">Eliminar</button>
      </form>
    </div>
  );
}

export default FormEliminar;