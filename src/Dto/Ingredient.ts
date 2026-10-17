export interface Ingredient {
    id: number;
    name: string;
    stock: number;          // En TypeScript, 'number' cubre enteros y flotantes
    purchasePrice: number;  // Mapea el Float de Java
    expirationDate: string; // Mapea el LocalDate de Java (viaja como String en el JSON)
}
