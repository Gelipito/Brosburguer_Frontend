import React, { useState,useEffect,useMemo } from 'react';
import './Inventario.css';
import logoGrande from '../../recursos/logos/logo.png.jpeg';
import { Ingredient } from '../../Dto/Ingredient';
import { IngredientRequestDTO } from '../../Dto/IngredientRequestDTO';

// Importamos tus 6 fotos desde la carpeta de usuarios
import foto1 from '../../recursos/usuarios/1.jpeg';
import foto2 from '../../recursos/usuarios/2.jpeg';
import foto3 from '../../recursos/usuarios/3.jpeg';
import foto4 from '../../recursos/usuarios/4.jpeg';
import foto5 from '../../recursos/usuarios/5.jpeg';
import foto6 from '../../recursos/usuarios/6.jpeg';

import { 
  FaPlus, FaSearch, FaEdit, FaTrashAlt, FaCalendarAlt, 
  FaUserFriends, FaMapMarkerAlt, FaBoxOpen, FaChevronRight,
  FaSave, FaTimes
} from 'react-icons/fa';

// Importación de la API (Ajusta la ruta según tu estructura)
import { ingredients as IngredientApi } from '../../api/IngredientApi';

// Interfaces


const Inventario = () => {
    // --- ESTADOS ---
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);
    
    // Formulario
    const [formData, setFormData] = useState<IngredientRequestDTO>({
        name: '',
        stock: 0,
        purchasePrice: 0,
        expirationDate: ''
    });

    // --- CARGA DE DATOS ---
    const fetchIngredients = async () => {
        setLoading(true);
        try {
            const data = await IngredientApi.allIngredients();
            if (data) setIngredients(data);
        } catch (error) {
            console.error("Error al cargar ingredientes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIngredients();
    }, []);

    // --- FUNCIONES CRUD ---
    const handleOpenModal = (ingredient?: Ingredient) => {
        if (ingredient) {
            setEditingIngredient(ingredient);
            setFormData({
                name: ingredient.name,
                stock: ingredient.stock,
                purchasePrice: ingredient.purchasePrice,
                expirationDate: ingredient.expirationDate
            });
        } else {
            setEditingIngredient(null);
            setFormData({
                name: '',
                stock: 0,
                purchasePrice: 0,
                expirationDate: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingIngredient(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'stock' || name === 'purchasePrice' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingIngredient) {
                // El API usa el 'name' original como identificador para actualizar
                await IngredientApi.updateIngredient(editingIngredient.name, formData);
            } else {
                await IngredientApi.registerIngredient(formData);
            }
            fetchIngredients();
            handleCloseModal();
        } catch (error) {
            alert("Error al procesar la solicitud");
        }
    };

      const handleDelete = async (name: string) => {
        if (window.confirm(`¿Estás seguro de eliminar "${name}"?`)) {
            try {
                const response = await IngredientApi.deleteIngredient(name);
                alert(response); // Mensaje de éxito del backend
                fetchIngredients();
            } catch (error: any) {
                // Capturamos el error detallado del backend
                const errorMessage = error.response?.data?.message || error.response?.data || "No se puede eliminar el ingrediente porque está siendo utilizado por uno o más productos.";
                
                if (error.response?.status === 409) {
                    alert(`Conflicto: ${errorMessage}`);
                } else if (error.response?.status === 403) {
                    alert("No se puede eliminar el ingrediente porque está siendo utilizado por uno o más productos.");
                } else {
                    alert(`Error: ${errorMessage}`);
                }
                console.error("Detalle del error:", error);
            }
        }
    };

    // --- BÚSQUEDA ---
    const filteredIngredients = useMemo(() => {
        return ingredients.filter(ing => 
            ing.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [ingredients, searchTerm]);

    // --- DATOS ESTÁTICOS (CONSERVADOS) ---
    const personal = [
        { id: 1, nombre: "Carlos Ruiz", puesto: "Chef Ejecutivo", foto: foto1 },
        { id: 2, nombre: "Ana López", puesto: "Sous Chef", foto: foto2 },
        { id: 3, nombre: "Marcos Díaz", puesto: "Parrillero", foto: foto3 },
        { id: 4, nombre: "Sofía Pérez", puesto: "Caja", foto: foto4 },
        { id: 5, nombre: "Juan Castro", puesto: "Mesero", foto: foto5 },
        { id: 6, nombre: "Elena Sanz", puesto: "Administración", foto: foto6 },
    ];

    const locales = [
        { id: 1, nombre: "Local 1: Frente a Bomberos", status: "Operativo", desc: "Personal completo asignado hoy." },
        { id: 2, nombre: "Local 2: Barrio La Pradera", status: "Turno Noche", desc: "Monitoreo de asistencia activo." }
    ];

    return (
        <div className="admin-dashboard">
            {/* Header Principal */}
            <header className="dashboard-header">
                <div className="header-left">
                    <div className="logo-container">
                        <img src={logoGrande} alt="Bros Burger" className="header-logo" />
                    </div>
                    <div className="header-titles">
                        <h1>Panel de Gestión Empresarial</h1>
                        <p>Control Centralizado de Inventario y Operaciones</p>
                    </div>
                </div>
                <div className="header-actions">
                    <div className="search-bar">
                        <FaSearch className="search-icon" />
                        <input 
                            type="text" 
                            placeholder="Buscar ingrediente..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn-primary" onClick={() => handleOpenModal()}>
                        <FaPlus /> Nuevo Ingrediente
                    </button>
                </div>
            </header>

            <main className="dashboard-content">
                {/* Sección de Inventario */}
                <section className="inventory-section">
                    <div className="section-header">
                        <div className="title-with-icon">
                            <FaBoxOpen className="section-icon" />
                            <h2>Inventario de Materia Prima</h2>
                        </div>
                        <span className="badge">{filteredIngredients.length} Items</span>
                    </div>

                    <div className="table-container card">
                        {loading ? (
                            <div className="loading-state">Cargando inventario...</div>
                        ) : (
                            <table className="enterprise-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Ingrediente</th>
                                        <th>Stock Actual</th>
                                        <th>Costo de Compra</th>
                                        <th>Vencimiento</th>
                                        <th className="text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredIngredients.map((ing) => (
                                        <tr key={ing.id} className="table-row">
                                            <td className="txt-muted">#{ing.id}</td>
                                            <td className="txt-bold">{ing.name}</td>
                                            <td>
                                                <div className={`stock-indicator ${ing.stock < 15 ? 'low' : 'normal'}`}>
                                                    <span className="dot"></span>
                                                    {ing.stock} unidades
                                                </div>
                                            </td>
                                            <td className="txt-price">${ing.purchasePrice.toLocaleString()}</td>
                                            <td className="txt-date">
                                                <FaCalendarAlt className="icon-inline" /> {ing.expirationDate}
                                            </td>
                                            <td className="actions-cell">
                                                <button className="btn-icon edit" title="Editar" onClick={() => handleOpenModal(ing)}>
                                                    <FaEdit />
                                                </button>
                                                <button className="btn-icon delete" title="Eliminar" onClick={() => handleDelete(ing.name)}>
                                                    <FaTrashAlt />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredIngredients.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="empty-state">No se encontraron ingredientes</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </section>

                {/* Fila Inferior: Personal y Locales */}
                <div className="dashboard-footer-grid">
                    {/* Sección Personal */}
                    <section className="staff-section card">
                        <div className="section-header-mini">
                            <FaUserFriends />
                            <h3>Personal del Local</h3>
                        </div>
                        <div className="staff-grid">
                            {personal.map(p => (
                                <div key={p.id} className="staff-card">
                                    <img src={p.foto} alt={p.nombre} className="staff-avatar" />
                                    <div className="staff-info">
                                        <span className="staff-name">{p.nombre}</span>
                                        <span className="staff-role">{p.puesto}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Sección Locales */}
                    <section className="locations-section card">
                        <div className="section-header-mini">
                            <FaMapMarkerAlt />
                            <h3>Ubicaciones y Estado</h3>
                        </div>
                        <div className="locations-list">
                            {locales.map(l => (
                                <div key={l.id} className="location-item">
                                    <div className="location-header">
                                        <span className="location-name">{l.nombre}</span>
                                        <span className={`status-pill ${l.status.toLowerCase().includes('operativo') ? 'active' : 'warning'}`}>
                                            {l.status}
                                        </span>
                                    </div>
                                    <p className="location-desc">{l.desc}</p>
                                    <div className="location-footer">
                                        <button className="btn-text">Ver detalles <FaChevronRight /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            {/* Modal de Registro/Edición */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content card">
                        <div className="modal-header">
                            <h2>{editingIngredient ? 'Actualizar Ingrediente' : 'Registrar Nuevo Ingrediente'}</h2>
                            <button className="btn-close" onClick={handleCloseModal}><FaTimes /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="enterprise-form">
                            <div className="form-group">
                                <label>Nombre del Ingrediente</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Ej. Carne de Res"
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Stock Inicial</label>
                                    <input 
                                        type="number" 
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Precio de Compra ($)</label>
                                    <input 
                                        type="number" 
                                        name="purchasePrice"
                                        value={formData.purchasePrice}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Fecha de Vencimiento</label>
                                <input 
                                    type="date" 
                                    name="expirationDate"
                                    value={formData.expirationDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={handleCloseModal}>Cancelar</button>
                                <button type="submit" className="btn-primary">
                                    <FaSave /> {editingIngredient ? 'Guardar Cambios' : 'Registrar Ingrediente'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventario;
