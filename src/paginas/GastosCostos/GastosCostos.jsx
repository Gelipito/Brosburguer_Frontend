import React from 'react';
import './GastosCostos.css';
import logoGrande from '../../recursos/logos/logo.png.jpeg';
import { FaChevronDown, FaReceipt, FaTrashAlt } from 'react-icons/fa';

const GastosCostos = () => {
  // Datos simulados de gastos recientes
  const ultimosGastos = [
    { id: 1, descripcion: "Compra de Carne de Res (Proveedor Central)", categoria: "Materia Prima", monto: "450.000", fecha: "Hoy" },
    { id: 2, descripcion: "Suministro de Verduras y Panes", categoria: "Insumos", monto: "120.000", fecha: "Hoy" },
    { id: 3, descripcion: "Pago de servicios públicos (Luz - Local 1)", categoria: "Servicios", monto: "315.000", fecha: "Ayer" },
    { id: 4, descripcion: "Empaques biodegradables y servilletas", categoria: "Logística", monto: "85.000", fecha: "10/07/2026" },
  ];

  return (
    <div className="gastos-container">
      
      {/* SECCIÓN IZQUIERDA: Tabla de registros y Formulario simulado */}
      <div className="gastos-col-izquierda">
        
        {/* Tarjeta Blanca Grande: Registro y Control de Salidas */}
        <div className="tarjeta-blanca-gastos">
          <div className="encabezados-gastos-flex">
            <div className="selector-gastos">
              <h3>CONTROL DE GASTOS</h3>
              <FaChevronDown className="icono-drop" />
            </div>
            <div className="selector-gastos">
              <h3>Historial del Mes</h3>
              <FaChevronDown className="icono-drop" />
            </div>
          </div>

          <div className="resumen-rapido-gastos">
            <div>
              <p className="txt-gris">Último egreso registrado</p>
              <p className="txt-negro-bold">Compra de Insumos</p>
            </div>
            <div>
              <p className="txt-gris">Método de pago frecuente</p>
              <p className="txt-negro-bold">Transferencia Bancaria</p>
            </div>
          </div>

          <p className="tabla-seccion-titulo">Egresos Recientes</p>

          <table className="tabla-gastos-operacionales">
            <thead>
              <tr>
                <th>Descripción del Gasto</th>
                <th>Categoría</th>
                <th>Fecha</th>
                <th>Monto Total</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {ultimosGastos.map((gasto) => (
                <tr key={gasto.id}>
                  <td className="txt-bold">{gasto.descripcion}</td>
                  <td><span className={`badge-categoria ${gasto.categoria.toLowerCase().replace(" ", "-")}`}>{gasto.categoria}</span></td>
                  <td>{gasto.fecha}</td>
                  <td className="txt-monto-rojo">${gasto.monto}</td>
                  <td><FaTrashAlt className="icono-eliminar-gasto" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bloques de Totales Inferiores */}
        <div className="fila-tarjetas-gastos-totales">
          
          <div className="tarjeta-gasto-roja-total">
            <div className="header-gasto-color">
              <span>EGRESOS TOTALES DEL MES</span>
              <FaChevronDown />
            </div>
            <h2>$970.000</h2>
          </div>

          <div className="tarjeta-gasto-negra-proveedores">
            <div className="header-gasto-color">
              <span>CUENTAS POR PAGAR (PROVEEDORES)</span>
              <FaChevronDown />
            </div>
            <h2>$210.000</h2>
          </div>

        </div>

      </div>

      {/* SECCIÓN DERECHA: Logo redondo y resumen de metas de costos */}
      <div className="gastos-col-derecha">
        
        <div className="wrapper-logo-circular-gastos">
          <div className="circulo-negro-gastos">
            <img src={logoGrande} alt="Bros Burger Logo" />
          </div>
        </div>

        {/* Tarjeta Amarilla de Alertas o Límites de Costos */}
        <div className="tarjeta-amarilla-gastos">
          <div className="header-tarjeta-amarilla-g">
            <h3>ANÁLISIS DE COSTOS</h3>
            <FaChevronDown />
          </div>

          <div className="lista-gastos-analisis">
            <div className="item-analisis-linea">
              <div className="avatar-gasto-mini">
                <FaReceipt />
              </div>
              <div className="info-gasto-txt">
                <h4>Límite de Presupuesto Operativo</h4>
                <p>Has consumido el 64% del margen estimado para esta semana.</p>
              </div>
            </div>

            <div className="item-analisis-linea">
              <div className="avatar-gasto-mini">
                <FaReceipt />
              </div>
              <div className="info-gasto-txt">
                <h4>Alerta de Costo Fijo</h4>
                <p>Próximo vencimiento de arriendo de locales comerciales en 5 días.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default GastosCostos;