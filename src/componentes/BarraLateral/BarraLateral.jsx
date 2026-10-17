import React from 'react';
import './BarraLateral.css';
import { 
  FaBars, FaHome, FaChartPie, FaFileInvoiceDollar, 
  FaBoxes, FaMoneyBillWave, FaBullseye, 
  FaReceipt, FaUtensils 
} from 'react-icons/fa';

const BarraLateral = ({ paginaActual, setPaginaActual }) => {

  const opcionesMenu = [
    { id: 'Inicio', texto: 'Inicio', icono: <FaHome /> },
    { id: 'ResumenGeneral', texto: 'Resumen General', icono: <FaChartPie /> },
    /* UNIFICADO: Un solo ID 'Ventas' con el texto real del diseño */
    { id: 'Ventas', texto: 'Ventas y Contabilidad', icono: <FaFileInvoiceDollar /> },
    { id: 'Inventario', texto: 'Inventario', icono: <FaBoxes /> },
    { id: 'Metas', texto: 'Metas', icono: <FaBullseye /> },
    { id: 'Pedidos', texto: 'Productos', icono: <FaReceipt /> }
  
  ];

  return (
    <aside className="barra-lateral">
      <div className="menu-toggle">
        <button className="btn-toggle">
          <FaBars />
        </button>
      </div>

      <nav className="menu-navegacion">
        <ul>
          {opcionesMenu.map((opcion) => (
            <li key={opcion.id}>
              <button
                className={`item-menu ${paginaActual === opcion.id ? 'activo' : ''}`}
                onClick={() => setPaginaActual(opcion.id)}
              >
                <span className="icono-menu">{opcion.icono}</span>
                <span className="texto-menu">{opcion.texto}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default BarraLateral;