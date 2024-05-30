import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Saludo from '../componentes/saludoBoton';


test('renderiza el saludo e incrementa el contador', () => {
  React.act(() => {
    render(<Saludo />);
  });

  // Verifica que el texto "Hello, World!" está en el documento
  const saludoHola = screen.getByText(/hello, world!/i);
  expect(saludoHola).toBeInTheDocument();

  // Verifica que el contador inicial es 0
  const counterText = screen.getByText(/you clicked 0 times/i);
  expect(counterText).toBeInTheDocument();

  // Simula un clic en el botón
  const button = screen.getByText(/click me/i);
  fireEvent.click(button);

  // Verifica que el contador se incrementa
  const updatedCounterText = screen.getByText(/you clicked 1 time/i);
  expect(updatedCounterText).toBeInTheDocument();
});