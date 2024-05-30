import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Cookies from 'js-cookie';
import FormLogin from '../componentes/formLogin';


jest.mock('axios');
jest.mock('js-cookie');

describe('FormLogin', () => {
  it('renderizar correctamente el formulario', () => {
    render(<FormLogin />);
    expect(screen.getByPlaceholderText('Nombre de usuario')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar sesión/i })).toBeInTheDocument();
  });

  it('permitir la actualización de los campos del formulario', () => {
    render(<FormLogin />);

    const usernameInput = screen.getByPlaceholderText('Nombre de usuario');
    const passwordInput = screen.getByPlaceholderText('Contraseña');

    fireEvent.change(usernameInput, { target: { value: 'miUsuario' } });
    fireEvent.change(passwordInput, { target: { value: 'miContraseña' } });

    expect(usernameInput.value).toBe('miUsuario');
    expect(passwordInput.value).toBe('miContraseña');
  });

  it('enviar el formulario correctamente', async () => {
    axios.post.mockResolvedValue({ data: { success: true, token: 'este-token', rol: 'admin' } });

    render(<FormLogin onLogin={jest.fn()} />);

    const usernameInput = screen.getByPlaceholderText('Nombre de usuario');
    const passwordInput = screen.getByPlaceholderText('Contraseña');
    const submitButton = screen.getByRole('button', { name: /Iniciar sesión/i });

    fireEvent.change(usernameInput, { target: { value: 'miUsuario' } });
    fireEvent.change(passwordInput, { target: { value: 'miContraseña' } });

    await userEvent.click(submitButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(Cookies.set).toHaveBeenCalledWith('cookieInfo', expect.any(String), { secure: true, sameSite: 'None' });
  });
});
