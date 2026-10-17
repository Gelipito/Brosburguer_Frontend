import axios from "axios";

export const API_URL = "http://localhost:8080/api"; // Ruta base real del backend

const api = axios.create({
    baseURL: API_URL
});

// Este interceptor se ejecuta ANTES de enviar cualquier petición al servidor
api.interceptors.request.use(
    (config) => {
        // Recuperamos el token que guardaste al hacer Login
        const token = localStorage.getItem("token"); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
