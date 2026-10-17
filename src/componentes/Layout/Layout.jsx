import React from 'react';
import BarraLateral from '../BarraLateral/BarraLateral';
import BarraSuperior from '../BarraSuperior/BarraSuperior';
import './Layout.css';

const Layout = ({ children, paginaActual, setPaginaActual }) => {
  return (
    <div className="layout-container">
      {/* Lado izquierdo: Fijo en la pantalla - Ahora recibe el estado */}
      <BarraLateral paginaActual={paginaActual} setPaginaActual={setPaginaActual} />
      
      {/* Lado derecho: Agrupa la barra de arriba y las páginas */}
      <div className="layout-main">
        <BarraSuperior />
        <main className="layout-content">
          {children} {/* Aquí es donde se pintará la página activa (Inicio o Resumen General) */}
        </main>
      </div>
    </div>
  );
};

export default Layout;