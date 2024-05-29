import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Formulario from '../componentes/formulario';

describe('Formulario', () => {
it('Prueba de renderizacion de formulario', () => {
    render(<Formulario />);    
    expect(screen.getByText('Formulario POST')).toBeInTheDocument();
});

it('Prueba de actualización de datos cuendo ingresados', () => {
    const nameInput = screen.getByLabelText(/Nombre:/i);
    const ageInput = screen.getByLabelText(/Edad:/i);
    expect(nameInput).toBeInTheDocument();
    expect(ageInput ).toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: 'Juan' } });
    fireEvent.change(ageInput, { target: { value: '30' } });

    expect(nameInput.value).toBe('Juan');
    expect(ageInput.value).toBe('30');
});

  it('Prueba para envio de formulario', async () => {
    
    const submitButton = screen.getByText(/Enviar/i);
    expect(submitButton).toBeInTheDocument(); 

    fireEvent.click(submitButton);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'Juan', age: '30' }),
    });
  });
});