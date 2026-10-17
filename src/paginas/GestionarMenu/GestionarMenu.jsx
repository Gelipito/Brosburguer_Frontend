import React from 'react';
import './GestionarMenu.css';
import logoGrande from '../../recursos/logos/logo.png.jpeg';
import { FaChevronDown, FaEdit, FaTimesCircle, FaPlusCircle, FaCheckCircle, FaPrint } from 'react-icons/fa';

const GestionarMenu = () => {
  const hamburguesas = [
    { producto: "Sencilla", desc: "Con tocineta", precio: "Doble carne", accion: "Editar" },
    { producto: "Sencillo", desc: "Con tocineta", precio: "Americano", accion: "Editar" },
    { producto: "Mixta", desc: "Especial", precio: "Editar", accion: "Desactivar" }
  ];

  const perrosCalientes = [
    { producto: "Producto", detalle: "Detalle" },
    { producto: "Queso extra", detalle: "Gaseosa" },
    { producto: "Sencillo", detalle: "Gaseosa" },
    { producto: "Jugo natural", detalle: "Editar" }
  ];

  return (
    <div className="gestion-container">
      
      {/* COLUMNA IZQUIERDA */}
      <div className="gestion-col-izquierda">
        
        {/* Selección de Local */}
        <div className="bloque-seleccion-local">
          <p className="titulo-seccion-gestion">SELECCIÓN DE LOCAL</p>
          <div className="contenedor-radiales-locales">
            <label className="radio-local">
              <input type="radio" name="local-gestion" defaultChecked />
              <span className="radio-custom"></span> Ambos locales
            </label>
            <label className="radio-local">
              <input type="radio" name="local-gestion" />
              <span className="radio-custom"></span> Solo Frente a Bomberos
            </label>
            <label className="radio-local">
              <input type="radio" name="local-gestion" />
              <span className="radio-custom"></span> Solo Barrio La Pradera
            </label>
          </div>
        </div>

        {/* Sección 1: Hamburguesas */}
        <p className="titulo-seccion-gestion">SECCIÓN 1: HAMBURGUESAS</p>
        <div className="tarjeta-blanca-gestion-tabla">
          <div className="header-tabla-multicolor">
            <div className="tab-segmento rojo">SECCIÓN 1: HAMBURGUESAS</div>
            <div className="tab-segmento azul">SECCIÓN 2: PERROS CALIENTES</div>
            <div className="tab-segmento-drop verde"><FaChevronDown /></div>
          </div>

          <table className="tabla-gestion-productos">
            <thead>
              <tr>
                <th className="th-rojo">Producto</th>
                <th className="th-rojo">Descripción corta</th>
                <th className="th-amarillo">Precio</th>
                <th className="th-amarillo">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {hamburguesas.map((h, i) => (
                <tr key={i}>
                  <td className="txt-bold">{h.producto}</td>
                  <td>{h.desc}</td>
                  <td>{h.precio}</td>
                  <td className="celda-acciones-iconos">
                    {h.accion === "Editar" ? (
                      <span className="accion-link-txt"><FaEdit /> Editar</span>
                    ) : (
                      <>
                        <span className="accion-link-txt"><FaEdit /> Editar</span>
                        <span className="accion-link-txt desactivar"><FaTimesCircle /> Desactivar</span>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fila Inferior de Tablas */}
        <div className="fila-tablas-gestion-inferior">
          
          {/* Sección 3: Perros Calientes */}
          <div>
            <p className="titulo-seccion-gestion">SECCIÓN 3: PERROS CALIENTES</p>
            <div className="tarjeta-blanca-gestion-tabla compacta">
              <div className="header-tabla-multicolor-b">
                <div className="tab-segmento amarillo">SECCIÓN 3: PERROS Y BEBISTAS</div>
                <div className="tab-segmento azul-b">Precios</div>
              </div>
              <table className="tabla-gestion-productos">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {perrosCalientes.map((p, i) => (
                    <tr key={i}>
                      <td className={i === 0 ? "" : "txt-bold"}>{p.producto}</td>
                      <td>{p.detalle === "Editar" ? <span className="accion-link-txt"><FaEdit /> Editar</span> : p.detalle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Datos Generales del Servicio */}
          <div>
            <p className="titulo-seccion-gestion">DATOS GENERALES DEL SERVICIO</p>
            <div className="tarjeta-blanca-gestion-tabla compacta">
              <div className="header-tabla-multicolor-b">
                <div className="tab-segmento rojo">Producto</div>
                <div className="tab-segmento azul-b">Detalle</div>
                <div className="tab-segmento-drop rojo"><FaChevronDown /></div>
              </div>
              <table className="tabla-gestion-productos">
                <tbody>
                  <tr>
                    <td className="txt-bold">Valor domicilio</td>
                    <td><span className="accion-link-txt"><FaChevronDown /></span></td>
                  </tr>
                  <tr>
                    <td className="txt-bold">Tiempo estimado de entrega</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="txt-bold">Teléfono de pedidos</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td><span className="accion-link-txt"><FaCheckCircle /> Cambiar</span></td>
                    <td><span className="accion-link-txt"><FaCheckCircle /> Cambiar</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

      {/* COLUMNA DERECHA */}
      <div className="gestion-col-derecha">
        
        <div className="wrapper-logo-circular-gestion">
          <div className="circulo-negro-gestion">
            <img src={logoGrande} alt="Bros Burger Logo" />
          </div>
        </div>

        {/* Panel Botones Principales */}
        <div className="panel-botones-principales-gestion">
          <p className="titulo-botones-txt-side">BOTONES PRINCIPALES</p>
          
          <button className="btn-principal-g">
            <FaPlusCircle className="icon-btn-g" />
            <span>Agregar nuevo producto</span>
          </button>

          <button className="btn-principal-g">
            <FaCheckCircle className="icon-btn-g" />
            <span>Guardar cambios</span>
          </button>

          <button className="btn-principal-g">
            <FaPrint className="icon-btn-g" />
            <span>Ver menú impreso</span>
          </button>
        </div>

      </div>

    </div>
  );
};

export default GestionarMenu;