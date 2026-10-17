import React, { useState } from 'react';
import Layout from './componentes/Layout/Layout';
import Inicio from './paginas/Inicio/Inicio';
import ResumenGeneral from './paginas/ResumenGeneral/ResumenGeneral';
import Contabilidad from './paginas/Contabilidad/Contabilidad';
import Inventario from './paginas/Inventario/Inventario.tsx';
import GastosCostos from './paginas/GastosCostos/GastosCostos';
import Metas from './paginas/Metas/Metas';
import Pedidos from './paginas/Pedidos/Pedidos.tsx';
import GestionarMenu from './paginas/GestionarMenu/GestionarMenu';
import Login from './paginas/Login/Login'; // Importamos la nueva pantalla de Login
import './App.css';

function App() {
  const [paginaActual, setPaginaActual] = useState('Inicio');
  // Nuevo estado para controlar si la sesión está iniciada
  const [sesionIniciada, setSesionIniciada] = useState(false);

  const renderizarPagina = () => {
    switch (paginaActual) {
      case 'Inicio':
        return <Inicio />;
      case 'ResumenGeneral':
        return <ResumenGeneral />;
      case 'Ventas':
        return <Contabilidad />;
      case 'Inventario':
        return <Inventario />;
      case 'GastosCostos':
        return <GastosCostos />;
      case 'Metas':
        return <Metas />;
      case 'Pedidos':
        return <Pedidos />;
      case 'GestionarMenu':
        return <GestionarMenu />;
      default:
        return <Inicio />;
    }
  };

  // 1. Si NO ha iniciado sesión, renderizamos únicamente el Login
  if (!sesionIniciada) {
    return <Login onLoginSuccess={() => setSesionIniciada(true)} />;
  }

  // 2. Si SÍ inició sesión, renderizamos la aplicación completa con su Layout
  return (
    <Layout paginaActual={paginaActual} setPaginaActual={setPaginaActual}>
      {renderizarPagina()}
    </Layout>
  );
}

export default App;