import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'; 
import Formulario from '../componentes/formulario';
import axios from 'axios';

jest.mock('axios');

describe('Formulario', () => {
  it('Prueba de renderizacion de formulario', () => {
    render(<Formulario />);
    expect(screen.getByText('Formulario POST')).toBeInTheDocument();
  });

  it('Prueba de actualización de datos cuando ingresados', () => {
    render(<Formulario />);

    const nameInput = screen.getByLabelText(/Nombre:/i);
    const ageInput = screen.getByLabelText(/Edad:/i);
    expect(nameInput).toBeInTheDocument();
    expect(ageInput).toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: 'Juan' } });
    fireEvent.change(ageInput, { target: { value: '30' } });

    expect(nameInput.value).toBe('Juan');
    expect(ageInput.value).toBe('30');
  });

  it('debe enviar el formulario correctamente', async () => {
    // Configura el mock para devolver una respuesta exitosa
    axios.post.mockResolvedValue({ data: { message: 'Formulario enviado con éxito' } });

    // Renderiza el formulario
    render(<Formulario />);

    // Simula el cambio y envío del formulario
    fireEvent.change(screen.getByLabelText(/Nombre:/i), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText(/Edad:/i), { target: { value: '30' } });
    fireEvent.submit(screen.getByRole('button', { name: /Enviar/i }));
    
    // Espera a que la petición se resuelva
    await waitFor(() => {
      expect(screen.getByText('Formulario enviado con éxito')).toBeInTheDocument();
    });
  });
});
