import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import FormLogin from '../componentes/formLogin';
import { waitFor } from '@testing-library/react';

// Mock de Axios
jest.mock('axios');

describe('FormLogin Component', () => {
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Prueba de errores de aytenticación', async () => {
    // Simula la respuesta de error de Axios
    axios.post.mockRejectedValueOnce({
      response: { status: 401 }
    });

    // Espía en console.error
    const consoleErrorSpy = jest.spyOn(console, 'error');

    render(<FormLogin onLogin={mockOnLogin} />);

    const usernameInput = screen.getByPlaceholderText(/Nombre de usuario/i);
    const passwordInput = screen.getByPlaceholderText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Iniciar sesión/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error de autenticación: Credenciales inválidas o no autorizadas.');
    });

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:3002/login',
      { username: 'testuser', password: 'wrongpassword' },
      { withCredentials: true }
    );
    expect(mockOnLogin).not.toHaveBeenCalled();

    // Restablecer el espía en console.error
    consoleErrorSpy.mockRestore();
  });
});
