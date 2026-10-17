import React from 'react';
import './Metas.css';
import logoGrande from '../../recursos/logos/logo.png.jpeg';
import { 
  FaChevronDown, FaCheckCircle, FaBullseye, 
  FaPaperPlane, FaHistory, FaCheck 
} from 'react-icons/fa';

const Metas = () => {
  return (
    <div className="metas-container">
      
      {/* COLUMNA IZQUIERDA: Tablas y Objetivos */}
      <div className="metas-col-izquierda">
        
        {/* Tarjeta Principal Blanca: Metas del Administrador */}
        <div className="tarjeta-blanca-metas">
          <h3 className="titulo-bloque-blanco">METAS FIJADAS POR EL ADMINISTRADOR</h3>
          
          <div className="header-subseccion-metas">
            <span>METAS POR DÍA</span>
            <FaChevronDown />
          </div>

          <table className="tabla-cumplimiento-metas">
            <thead>
              <tr>
                <th>Periodo</th>
                <th>Meta establecida</th>
                <th>Lo que se vendió</th>
                <th>Cumplimiento</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="txt-bold">Sábado hoy (11/07)</td>
                <td>$500.000</td>
                <td>$580.000</td>
                <td>116%</td>
                <td>
                  <div className="status-badge-meta-ok">
                    <span className="mini-circulo-progreso"></span>
                    <FaCheck className="icono-check-v" />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="txt-bold">Total recaudado hoy</td>
                <td>$500.000</td>
                <td>$580.000</td>
                <td>116%</td>
                <td><FaCheckCircle className="icono-check-circulo" /></td>
              </tr>
            </tbody>
          </table>

          {/* Fila con las dos tarjetas medianas */}
          <div className="fila-submetas-progreso">
            
            {/* Tarjeta de Metas Semanales */}
            <div className="tarjeta-mini-progreso-meta">
              <div className="header-mini-meta">
                <span>METAS POR SEMANA</span>
                <FaChevronDown />
              </div>
              <div className="contenido-mini-meta">
                <FaCheckCircle className="icon-red-check" />
                <div>
                  <h4>Meta semanal</h4>
                  <p>Cumplimiento</p>
                </div>
                <div className="badge-porcentaje-verde">3/4%</div>
              </div>
            </div>

            {/* Tarjeta de Metas Por Local */}
            <div className="tarjeta-mini-progreso-meta">
              <div className="header-mini-meta">
                <span>METAS POR LOCAL</span>
                <FaChevronDown />
              </div>
              <div className="contenido-mini-meta">
                <FaCheckCircle className="icon-red-check" />
                <div>
                  <h4>Total recaudado hoy</h4>
                  <p>Total recaudado próximo sábado</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Sección de Metas para el Equipo */}
        <div className="bloque-metas-equipo">
          <h3>METAS PARA EL EQUIPO DE TRABAJO</h3>
          
          <div className="grid-equipo-acciones">
            
            <ul className="lista-puntos-equipo">
              <li>Garantizar el tiempo de entrega de pedidos menor a 15 minutos.</li>
              <li>Mantener excelente orden e higiene en estaciones de cocina y caja.</li>
              <li>Cumplir con el protocolo de atención amable a cada cliente.</li>
              <li>Reportar novedades o alertas de insumos de manera inmediata.</li>
            </ul>

            <div className="columnas-botones-desplegables">
              <div className="btn-desplegable-color naranja">
                <span>Meta semanal</span>
                <FaChevronDown />
              </div>
              <div className="btn-desplegable-color verde">
                <span>Progreso</span>
                <FaChevronDown />
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* COLUMNA DERECHA: Logo y Acciones */}
      <div className="metas-col-derecha">
        
        <div className="wrapper-logo-circular-metas">
          <div className="circulo-negro-metas">
            <img src={logoGrande} alt="Bros Burger Logo" />
          </div>
        </div>

        {/* Panel de Botones de Acciones */}
        <div className="panel-acciones-metas">
          <p className="titulo-acciones-txt">ACCIONES</p>
          
          <button className="btn-accion-meta amarillo">
            <FaBullseye className="icon-btn-meta" />
            <span>Poner o cambiar nuevas metas</span>
          </button>

          <button className="btn-accion-meta verde">
            <FaPaperPlane className="icon-btn-meta" />
            <span>Enviar aviso a todos los trabajadores</span>
          </button>

          <button className="btn-accion-meta azul">
            <FaHistory className="icon-btn-meta" />
            <span>Ver historial de metas cumplidas</span>
          </button>
        </div>

      </div>

    </div>
  );
};

export default Metas;