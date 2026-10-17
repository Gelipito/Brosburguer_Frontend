import api from "./api"; // Importamos la instancia configurada con el token y la URL base
import { Ingredient } from "../Dto/Ingredient";
import { IngredientRequestDTO } from "../Dto/IngredientRequestDTO";

export const ingredients = {
    
    // 1. CREATE (POST) -> /api/ingredients/registrar
    registerIngredient: async (dto: IngredientRequestDTO): Promise<Ingredient> => {
        try {
            const response = await api.post<Ingredient>("/ingredients/registrar", dto);
            return response.data;
        } catch (error) {
            console.error("Error registering ingredient:", error);
            throw error;
        }
    },

    // 2. READ ALL (GET) -> /api/ingredients/todoslosIngredientes (CORREGIDO)
    allIngredients: async (): Promise<Ingredient[] | undefined> => {
        try {
            const response = await api.get<Ingredient[]>("/ingredients/todoslosIngredientes");
            return response.data;
        } catch (error) {
            console.error("Error fetching ingredients data:", error);
            throw error; 
        }
    },

    // 3. READ ONE (GET) -> /api/ingredients/buscar
    searchIngredient: async (name: string): Promise<Ingredient> => {
        try {
            const response = await api.get<Ingredient>("/ingredients/buscar", {
                params: { name: name }
            });
            return response.data;
        } catch (error) {
            console.error("Error searching ingredient:", error);
            throw error;
        }
    },

    // 4. UPDATE (PUT) -> /api/ingredients/actualizar
    updateIngredient: async (name: string, dto: IngredientRequestDTO): Promise<Ingredient> => {
        try {
            const response = await api.put<Ingredient>("/ingredients/actualizar", dto, {
                params: { name: name }
            });
            return response.data;
        } catch (error) {
            console.error("Error updating ingredient:", error);
            throw error;
        }
    },

    // 5. DELETE (DELETE) -> /api/ingredients/eliminar
// ...

deleteIngredient: async (name: string): Promise<string> => {
    try {
        const response = await api.delete<string>("/ingredients/eliminar", {
            params: { name: name }
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            // Manejo específico si Spring Security te bloquea (el error de tu consola)
            if (error.response.status === 403) {
                throw new Error("No tienes permisos para eliminar. Verifica que tu usuario tenga rol ADMIN y el token se esté enviando.");
            }

            // Aquí atrapamos el 409 de Spring Boot y extraemos el mensaje
            // Spring Boot por defecto manda { status: 409, message: "No se puede eliminar..." }
            const mensajeError = error.response.data?.message || error.response.data;
            
            // Lanzamos solo el texto limpio
            throw new Error(typeof mensajeError === 'string' ? mensajeError : "Error del servidor");
        }
        
        console.error("Error genérico al eliminar el ingrediente:", error);
        throw new Error("Ocurrió un error inesperado al intentar eliminar el ingrediente.");
    }
}
}
