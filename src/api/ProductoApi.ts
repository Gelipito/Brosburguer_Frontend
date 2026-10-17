import api from "./api"; // Tu instancia de Axios configurada con baseURL y Bearer Token Interceptor
import { Product, ProductRequestDTO, ProductCreateDTO } from "../Dto/ProductInterfaces";

export const productoApi = {

    // 1. CREATE (POST) -> /api/productos/registrarproducto
    // Recibe un @RequestBody estructurado como productRequestDTO y devuelve el objeto creado con código 201
    saveProduct: async (dto: ProductRequestDTO): Promise<Product> => {
        try {
            const response = await api.post<Product>("/productos/registrarproducto", dto);
            return response.data;
        } catch (error) {
            console.error("Error al registrar el producto:", error);
            throw error;
        }
    },

    // 2. READ ALL (GET) -> /api/productos/TodoslosProductos
    // Retorna la lista completa de productos junto con sus ingredientes asociados
    allProducts: async (): Promise<Product[]> => {
        try {
            const response = await api.get<Product[]>("/productos/TodoslosProductos");
            return response.data;
        } catch (error) {
            console.error("Error al cargar la lista de productos:", error);
            throw error;
        }
    },

    // 3. READ ONE (GET) -> /api/productos/buscarProducto
    // Busca un producto usando un @RequestParam (?name=valor)
    searchProduct: async (name: string): Promise<Product> => {
        try {
            const response = await api.get<Product>("/productos/buscarProducto", {
                params: { name: name }
            });
            return response.data;
        } catch (error) {
            console.error(`Error al buscar el producto ${name}:`, error);
            throw error;
        }
    },

    // 4. UPDATE (PUT) -> /api/productos/actualizar/{name}
    // Modifica usando un @PathVariable en la ruta y un @RequestBody con el DTO simplificado
    updateProduct: async (name: string, dto: ProductCreateDTO): Promise<Product> => {
        try {
            const response = await api.put<Product>(`/productos/actualizar/${name}`, dto);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar el producto ${name}:`, error);
            throw error;
        }
    },

    // 5. DELETE (DELETE) -> /api/productos/eliminarProduct
    // Elimina usando un @RequestParam (?nombre=valor) y responde con un código No Content (204)
    deleteProduct: async (nombre: string): Promise<void> => {
        try {
            await api.delete("/productos/eliminarProduct", {
                params: { nombre: nombre }
            });
        } catch (error) {
            console.error(`Error al intentar eliminar el producto ${nombre}:`, error);
            throw error;
        }
    }
};
