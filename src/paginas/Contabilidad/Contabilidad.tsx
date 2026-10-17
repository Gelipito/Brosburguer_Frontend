import React, { useState, useEffect } from "react";
import { Sale, ItemCarritoDTO } from "../../Dto/SaleInterfaces";
import { ventaApi } from "../../api/VentaApi";
import { toast } from "sonner";
import { Plus, RefreshCw, Trash2, X } from "lucide-react";
import "./Contabilidad.css";

const Contabilidad = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ccCliente, setCcCliente] = useState("");
  const [items, setItems] = useState<ItemCarritoDTO[]>([
    { productId: 0, quantity: 0 },
  ]);

  // Cargar todas las ventas al montar el componente
  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    try {
      setIsLoading(true);
      const data = await ventaApi.todasLasVentas();
      setSales(data);
    } catch (error) {
      console.error("Error cargando ventas:", error);
      toast.error("Error al cargar las ventas");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = () => {
    setItems([...items, { productId: 0, quantity: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleItemChange = (
    index: number,
    field: "productId" | "quantity",
    value: number
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!ccCliente.trim()) {
      toast.error("Por favor ingresa el CC del cliente");
      return;
    }

    if (items.some((item) => item.productId <= 0 || item.quantity <= 0)) {
      toast.error("Por favor completa todos los productos con cantidades válidas");
      return;
    }

    setIsSubmitting(true);
    try {
      // Se envía el arreglo completo de ItemCarritoDTO
      const newSale = await ventaApi.registrarVenta(items, ccCliente);
      setSales([newSale, ...sales]);
      toast.success("¡Venta registrada exitosamente!");
      
      // Reset form
      handleCloseModal();
    } catch (error) {
      console.error("Error registrando venta:", error);
      toast.error("Error al registrar la venta. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCcCliente("");
    setItems([{ productId: 0, quantity: 0 }]);
  };

  const totalVentas = sales.length;
  const totalRecaudado = sales.reduce((sum, sale) => sum + sale.total, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Fecha inválida";
    // Dividir la cadena "YYYY-MM-DD" para evitar desplazamientos por zona horaria
    const [year, month, day] = dateString.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    
    return date.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="contabilidad-container">
      {/* Header */}
      <header className="contabilidad-header">
        <div className="header-content">
          <div>
            <h1>Registro de Ventas</h1>
            <p>Bros Burger - Sistema de Contabilidad</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-registrar"
          >
            <Plus size={20} />
            Registrar Venta
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="contabilidad-main">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">Total de Ventas</p>
            <p className="stat-value">{totalVentas}</p>
            <p className="stat-description">Transacciones registradas</p>
          </div>

          <div className="stat-card">
            <p className="stat-label">Total Recaudado</p>
            <p className="stat-value stat-positive">
              {formatCurrency(totalRecaudado)}
            </p>
            <p className="stat-description">Ingresos totales</p>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="refresh-container">
          <button
            onClick={loadSales}
            disabled={isLoading}
            className="btn-refresh"
          >
            <RefreshCw size={16} className={isLoading ? "spinning" : ""} />
            Actualizar
          </button>
        </div>

        {/* Sales Table */}
        <div className="table-wrapper">
          {isLoading ? (
            <div className="loading-skeleton">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="skeleton-row">
                  <div className="skeleton-cell"></div>
                  <div className="skeleton-cell"></div>
                  <div className="skeleton-cell"></div>
                  <div className="skeleton-cell"></div>
                </div>
              ))}
            </div>
          ) : sales.length === 0 ? (
            <div className="empty-state">
              <p>No hay ventas registradas aún. Registra tu primera venta para comenzar.</p>
            </div>
          ) : (
            <table className="sales-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>CC Cliente</th>
                  <th>Productos</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale, index) => (
                  <tr key={sale.id} className={index % 2 === 0 ? "even" : "odd"}>
                    <td className="date-cell">{formatDate(sale.date)}</td>
                    <td className="cc-cell">{sale.ccCliente}</td>
                    <td className="products-cell">
                      <div className="products-list">
                        {sale.items.map((item) => (
                          <div key={item.id} className="product-item">
                            {item.product.name} x{item.quantity}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="total-cell">{formatCurrency(sale.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Register Sale Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Registrar Nueva Venta</h2>
              <button
                onClick={handleCloseModal}
                className="btn-close"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              {/* CC Cliente */}
              <div className="form-group">
                <label htmlFor="ccCliente">Cédula del Cliente</label>
                <input
                  id="ccCliente"
                  type="text"
                  placeholder="Ej: 1234567890"
                  value={ccCliente}
                  onChange={(e) => setCcCliente(e.target.value)}
                  disabled={isSubmitting}
                  className="form-input"
                />
              </div>

              {/* Items */}
              <div className="form-group">
                <div className="items-header">
                  <label>Productos</label>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    disabled={isSubmitting}
                    className="btn-add-item"
                  >
                    <Plus size={16} />
                    Agregar Producto
                  </button>
                </div>

                <div className="items-list">
                  {items.map((item, index) => (
                    <div key={index} className="item-row">
                      <div className="item-field">
                        <label className="item-label">ID Producto</label>
                        <input
                          type="number"
                          placeholder="ID"
                          value={item.productId || ""}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "productId",
                              parseInt(e.target.value) || 0
                            )
                          }
                          disabled={isSubmitting}
                          className="form-input"
                          min="1"
                        />
                      </div>
                      <div className="item-field">
                        <label className="item-label">Cantidad</label>
                        <input
                          type="number"
                          placeholder="Cant."
                          value={item.quantity || ""}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "quantity",
                              parseInt(e.target.value) || 0
                            )
                          }
                          disabled={isSubmitting}
                          className="form-input"
                          min="1"
                        />
                      </div>
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          disabled={isSubmitting}
                          className="btn-remove-item"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Botones */}
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                  className="btn-cancel"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-submit"
                >
                  {isSubmitting ? "Registrando..." : "Registrar Venta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contabilidad;