import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormLogin from './formLogin';

test('renders form with username and password fields and a submit button', () => {
  render(<FormLogin onSubmit={() => {}} />);

  // Verificar que los campos de entrada y el botón de envío estén en el documento
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

test('allows the user to submit the form with username and password', () => {
  const mockSubmit = jest.fn();
  render(<FormLogin onSubmit={mockSubmit} />);

  // Simular la entrada del usuario
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

  // Simular el envío del formulario
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  // Verificar que la función de envío fue llamada con los valores correctos
  expect(mockSubmit).toHaveBeenCalledWith({ username: 'testuser', password: 'password123' });
});

test('does not submit the form when username or password is empty', () => {
  const mockSubmit = jest.fn();
  render(<FormLogin onSubmit={mockSubmit} />);

  // Simular el envío del formulario con campos vacíos
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  // Verificar que la función de envío no fue llamada
  expect(mockSubmit).not.toHaveBeenCalled();
});