import React, { useState, useEffect, useMemo } from 'react';
import './Productos.css';
import logoGrande from '../../recursos/logos/logo.png.jpeg';

import { 
  FaPlus, FaSearch, FaEdit, FaTrashAlt, FaSave, FaTimes, 
  FaHamburger, FaListUl, FaMinusCircle
} from 'react-icons/fa';

// Importación de APIs
import { productoApi } from '../../api/ProductoApi';
import { ingredients as ingredientApi } from '../../api/IngredientApi';

// Importación de tus Interfaces EXACTAS
import { Product, ProductRequestDTO, ProductCreateDTO } from "../../Dto/ProductInterfaces";
import { IngredientRequestDTO } from '../../Dto/IngredientRequestDTO';

// Interfaz auxiliar para el estado del formulario de ingredientes
interface IngredientSelection {
    name: string;
    requiredQuantity: number;
}

const Productos = () => {
    // --- ESTADOS ---
    const [products, setProducts] = useState<Product[]>([]);
    const [availableIngredients, setAvailableIngredients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Estado del Formulario
    const [productName, setProductName] = useState('');
    const [sellingPrice, setSellingPrice] = useState<number>(0);
    // Usamos IngredientSelection para manejar el formulario localmente
    const [selectedIngredients, setSelectedIngredients] = useState<IngredientSelection[]>([]);

    // Carga inicial
    const fetchData = async () => {
        setLoading(true);
        try {
            const [prodData, ingData] = await Promise.all([
                productoApi.allProducts(),
                ingredientApi.allIngredients()
            ]);
            if (prodData) setProducts(prodData);
            if (ingData) setAvailableIngredients(ingData);
        } catch (error) {
            console.error("Error cargando datos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // --- MANEJO DE INGREDIENTES EN EL FORMULARIO ---
    const addIngredientRow = () => {
        setSelectedIngredients([...selectedIngredients, { name: '', requiredQuantity: 0 }]);
    };

    const removeIngredientRow = (index: number) => {
        const newList = [...selectedIngredients];
        newList.splice(index, 1);
        setSelectedIngredients(newList);
    };

    const updateIngredientRow = (index: number, field: keyof IngredientSelection, value: any) => {
        const newList = [...selectedIngredients];
        newList[index] = { 
            ...newList[index], 
            [field]: field === 'requiredQuantity' ? Number(value) : value 
        };
        setSelectedIngredients(newList);
    };

    // --- FUNCIONES CRUD ---
    const handleOpenModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setProductName(product.name);
            setSellingPrice(product.sellingPrice);
            setSelectedIngredients([]); 
        } else {
            setEditingProduct(null);
            setProductName('');
            setSellingPrice(0);
            setSelectedIngredients([{ name: '', requiredQuantity: 0 }]);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                // UPDATE: Usando ProductCreateDTO simplificado
                const updateDto: ProductCreateDTO = {
                    name: productName,
                    sellingPrice: sellingPrice
                };
                await productoApi.updateProduct(editingProduct.name, updateDto);
                alert("Producto actualizado correctamente");
            } else {
                // SAVE: Usando la estructura exacta de tu ProductRequestDTO
                const saveDto: ProductRequestDTO = {
                    product: {
                        name: productName,
                        sellingPrice: sellingPrice
                    },
                    ingredients: selectedIngredients
                        .filter(ing => ing.name !== '')
                        .map(ing => ({
                            name: ing.name,
                            requiredQuantity: ing.requiredQuantity
                        }))
                };
                
                await productoApi.saveProduct(saveDto);
                alert("Producto registrado correctamente");
            }
            fetchData();
            handleCloseModal();
        } catch (error: any) {
            const msg = error.response?.data?.message || "Error al procesar la solicitud";
            alert(`Error: ${msg}`);
        }
    };

    const handleDelete = async (name: string) => {
        if (window.confirm(`¿Estás seguro de eliminar el producto "${name}"?`)) {
            try {
                await productoApi.deleteProduct(name);
                alert("Producto eliminado");
                fetchData();
            } catch (error: any) {
                alert("Error al eliminar el producto");
            }
        }
    };

    // --- BÚSQUEDA ---
    const filteredProducts = useMemo(() => {
        return products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [products, searchTerm]);

    return (
        <div className="admin-dashboard">
            <header className="dashboard-header">
                <div className="header-left">
                    <div className="logo-container">
                        <img src={logoGrande} alt="Bros Burger" className="header-logo" />
                    </div>
                    <div className="header-titles">
                        <h1>Gestión de Productos</h1>
                        <p>Catálogo de Ventas y Recetas</p>
                    </div>
                </div>
                <div className="header-actions">
                    <div className="search-bar">
                        <FaSearch className="search-icon" />
                        <input 
                            type="text" 
                            placeholder="Buscar producto..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn-primary" onClick={() => handleOpenModal()}>
                        <FaPlus /> Nuevo Producto
                    </button>
                </div>
            </header>

            <main className="dashboard-content">
                <section className="inventory-section">
                    <div className="section-header">
                        <div className="title-with-icon">
                            <FaHamburger className="section-icon" />
                            <h2>Menú de Productos</h2>
                        </div>
                        <span className="badge">{filteredProducts.length} Productos</span>
                    </div>

                    <div className="table-container card">
                        {loading ? (
                            <div className="loading-state">Cargando catálogo...</div>
                        ) : (
                            <table className="enterprise-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre del Producto</th>
                                        <th>Precio de Venta</th>
                                        <th className="text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map((p) => (
                                        <tr key={p.id} className="table-row">
                                            <td className="txt-muted">#{p.id}</td>
                                            <td className="txt-bold">{p.name}</td>
                                            <td className="txt-price">${p.sellingPrice.toLocaleString()}</td>
                                            <td className="actions-cell">
                                                <button className="btn-icon edit" title="Editar" onClick={() => handleOpenModal(p)}>
                                                    <FaEdit />
                                                </button>
                                                <button className="btn-icon delete" title="Eliminar" onClick={() => handleDelete(p.name)}>
                                                    <FaTrashAlt />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </section>
            </main>

            {/* Modal de Registro/Edición */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content card wide-modal">
                        <div className="modal-header">
                            <h2>{editingProduct ? 'Actualizar Producto' : 'Registrar Nuevo Producto'}</h2>
                            <button className="btn-close" onClick={handleCloseModal}><FaTimes /></button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="enterprise-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Nombre del Producto</label>
                                    <input 
                                        type="text" 
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                        placeholder="Ej. Bros Burger Especial"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Precio de Venta ($)</label>
                                    <input 
                                        type="number" 
                                        step="0.01"
                                        value={sellingPrice}
                                        onChange={(e) => setSellingPrice(Number(e.target.value))}
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                            </div>

                            {!editingProduct && (
                                <div className="ingredients-selector-section">
                                    <div className="section-header-mini">
                                        <FaListUl />
                                        <h3>Receta (Ingredientes Requeridos)</h3>
                                        <button type="button" className="btn-add-mini" onClick={addIngredientRow}>
                                            <FaPlus /> Añadir
                                        </button>
                                    </div>

                                    <div className="ingredients-list-form">
                                        {selectedIngredients.map((item, index) => (
                                            <div key={index} className="ingredient-row-form">
                                                <select 
                                                    value={item.name}
                                                    onChange={(e) => updateIngredientRow(index, 'name', e.target.value)}
                                                    required
                                                >
                                                    <option value="">Seleccionar Ingrediente...</option>
                                                    {availableIngredients.map(ing => (
                                                        <option key={ing.id} value={ing.name}>
                                                            {ing.name} (Stock: {ing.stock})
                                                        </option>
                                                    ))}
                                                </select>
                                                <input 
                                                    type="number" 
                                                    placeholder="Cant."
                                                    value={item.requiredQuantity}
                                                    onChange={(e) => updateIngredientRow(index, 'requiredQuantity', e.target.value)}
                                                    required
                                                />
                                                <button type="button" className="btn-remove" onClick={() => removeIngredientRow(index)}>
                                                    <FaMinusCircle />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={handleCloseModal}>Cancelar</button>
                                <button type="submit" className="btn-primary">
                                    <FaSave /> {editingProduct ? 'Guardar Cambios' : 'Registrar Producto'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Productos;
