export interface IngredientRequestDTO {
    name: string;
    stock: number;
    purchasePrice: number;
    expirationDate: string; // Viaja en formato JSON como "YYYY-MM-DD"
}
