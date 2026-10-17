import React from 'react';
import './BarraSuperior.css';
import logoMario from '../../recursos/logos/logo.png.jpeg'; 
import { FaHeart, FaBell, FaCalendarAlt, FaChevronRight } from 'react-icons/fa';

const BarraSuperior = () => {
  const obtenerFechaActual = () => {
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  return (
    <header className="barra-superior">
      <div className="barra-izquierda">
        <img src={logoMario} alt="Bros Burger Logo" className="logo-mario" />
        <div className="marca-texto">
          <span className="marca-top">Bros</span>
          <span className="marca-bottom">Burger</span>
        </div>
      </div>

      <div className="barra-centro">
        <h2>PANEL DE CONTROL - BROS BURGER</h2>
      </div>

      <div className="barra-derecha">
        <button className="btn-icono">
          <FaHeart />
        </button>
        <button className="btn-icono">
          <FaBell />
        </button>
        
        <div className="contenedor-fecha">
          <FaCalendarAlt style={{ marginRight: '6px' }} />
          <span>{obtenerFechaActual()}</span>
        </div>

        <div className="flecha-final">
          <FaChevronRight />
        </div>
      </div>
    </header>
  );
};

export default BarraSuperior;