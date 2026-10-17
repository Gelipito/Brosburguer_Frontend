import { Ingredient } from "../Dto/Ingredient";

// Modelo Product
export interface Product {
    id: number;
    name: string;
    sellingPrice: number;
    ingredients: ProductIngredient[];
}

// Modelo ProductIngredient
export interface ProductIngredient {
    id: number;
    ingredient: Ingredient;
    requiredQuantity: number;
}

// DTO que representa ProductCreateDTO.java
export interface ProductCreateDTO {
    name: string;
    sellingPrice: number;
}

// DTO que representa productIngredientRequestDTO.java
export interface ProductIngredientRequestDTO {
    name: string;
    requiredQuantity: number;
}

// DTO que representa productRequestDTO.java
export interface ProductRequestDTO {
    product: ProductCreateDTO;
    ingredients: ProductIngredientRequestDTO[];
}