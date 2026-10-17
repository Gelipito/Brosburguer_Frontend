// src/paginas/Inicio/Inicio.jsx
import React from 'react';
import './Inicio.css';

// Importación de tus imágenes desde la carpeta de recursos
// OJO: Verifica si usas extensión doble (.png.jpeg) o simple (.png) según tu sistema
import logoGrande from '../../recursos/logos/logo.png.jpeg';
import imgHamburguesa from '../../recursos/productos/hamburguesa.jpeg';
import imgPerro from '../../recursos/productos/perro.jpeg';
import imgGaseosa from '../../recursos/productos/gaseosas.jpeg';

const Inicio = () => {
  return (
    <div className="inicio-container">
      
      {/* Sección Superior: Mensaje de Bienvenida con Logo Circular */}
      <section className="bienvenida-seccion">
        <div className="bienvenida-texto">
          {/* Usamos <strong> para la palabra "Administrador!" */}
          <h1>¡Bienvenido de nuevo, <br /><strong>Administrador!</strong></h1>
        </div>
        <div className="bienvenida-avatar-contenedor">
          <img src={logoGrande} alt="Bros Burger Logo Grande" className="bienvenida-avatar" />
        </div>
      </section>

      {/* Sección Inferior: El contenedor gris con las 3 tarjetas de dashboard */}
      <section className="dashboard-contenedor-gris">
        {/* Subtítulo gris de referencia */}
        <p className="dashboard-subtitulo">Qux Summary susmerlest / 022</p>
        
        {/* Grid para las 3 tarjetas en horizontal */}
        <div className="dashboard-grid-tarjetas">
          
          {/* Tarjeta 1: Hamburguesa (Fondo Rojo) */}
          <div className="tarjeta-producto fondo-rojo">
            <img src={imgHamburguesa} alt="Hamburguesa Bros" />
          </div>

          {/* Tarjeta 2: Perro Caliente (Fondo Amarillo/Naranja) */}
          <div className="tarjeta-producto fondo-amarillo">
            <img src={imgPerro} alt="Perro Caliente Bros" />
          </div>

          {/* Tarjeta 3: Gaseosas (Fondo Azul - Corregida para ocupar el 100% como las otras) */}
          <div className="tarjeta-producto fondo-azul">
            <img src={imgGaseosa} alt="Gaseosas" />
          </div>

        </div>
      </section>

    </div>
  );
};

export default Inicio;