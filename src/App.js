import logo from './logo.svg';
import Home from './paginas/Home';
import FormLogin from './Componentes/formLogin';
import FormProtegidoBD from './Componentes/formManejoBaseDatos';
import './App.css';
import Nuevo from './Componentes/nuevo';
import { Switch } from './Componentes/switch';
import { Rutas } from './Componentes/Rutas';
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <RouterProvider router={Rutas} />
  );
}

export default App;
