import { Product } from "./ProductInterfaces";

// Interfaz que mapea el modelo Sale de Java
export interface Sale {
    id: number;
    date: string; // El LocalDate viaja en formato JSON como "YYYY-MM-DD"
    total: number;
    ccCliente: string;
    items: SaleItem[];
}

// Interfaz que mapea el modelo SaleItem de Java
export interface SaleItem {
    id: number;
    product: Product;
    quantity: number;
    priceAtSale: number; // El precio unitario histórico capturado al vender
}

// DTO para representar cada elemento del carrito de compras (Mapea ItemCarritoDTO)
export interface ItemCarritoDTO {
    productId: number;
    quantity: number;
}
