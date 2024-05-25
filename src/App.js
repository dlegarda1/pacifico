import logo from './logo.svg';
import Home from './paginas/Home';
import FormLogin from './componentes/formLogin';
import FormProtegidoBD from './componentes/formManejoBaseDatos';
import './App.css';
import Nuevo from './componentes/nuevo';
import { Switch } from './componentes/switch';
import { Rutas } from './componentes/Rutas';
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <RouterProvider router={Rutas} />
  );
}

export default App;
