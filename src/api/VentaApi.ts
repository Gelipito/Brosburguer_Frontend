import api from "./api"; // Tu instancia de Axios configurada con baseURL y Bearer Token Interceptor
import { Sale, ItemCarritoDTO } from "../Dto/SaleInterfaces";

export const ventaApi = {

    // 1. CREATE (POST) -> /api/sales/registrarVenta
    // Envía la lista de items del carrito como @RequestBody y el 'ccCliente' como @RequestParam (?ccCliente=valor)
    registrarVenta: async (productosCarrito: ItemCarritoDTO[], ccCliente: string): Promise<Sale> => {
        try {
            // En axios.post: 1er parámetro = URL, 2do = Body, 3er = Configuración (Params)
            const response = await api.post<Sale>("/sales/registrarVenta", productosCarrito, {
                params: { ccCliente: ccCliente }
            });
            return response.data; // Retorna la venta completa procesada por el servidor
        } catch (error) {
            console.error("Error al registrar la venta:", error);
            throw error;
        }
    },

    // 2. READ ALL (GET) -> /api/sales/obtenerTodaslasventas
    // Retorna el histórico completo de ventas de la hamburguesería
    todasLasVentas: async (): Promise<Sale[]> => {
        try {
            const response = await api.get<Sale[]>("/sales/obtenerTodaslasventas");
            return response.data;
        } catch (error) {
            console.error("Error al obtener el historial de ventas:", error);
            throw error;
        }
    }
};
