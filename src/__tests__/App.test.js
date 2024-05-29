import { render, screen } from '@testing-library/react';
import App from '../App';
import FormLogin from '../componentes/formLogin';
import React from 'react';

//este es una prueba de rendirazacion para APP
test('Parrafo con contenido de texto', () => {
  render(<App />);
  const linkElement = screen.getByText(/este es un texto/i);
  expect(linkElement).toBeInTheDocument();
});

//vamos a hacer una prueba para un formulario login
test('Formulario de login', () => {
  render(<FormLogin />); 
  const usuario = screen.getByPlaceholderText(/Nombre de usuario/i);
  expect(usuario).toBeInTheDocument();
});
