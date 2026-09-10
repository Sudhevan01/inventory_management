import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_URL}/products`,
});

export const getProducts = () => api.get("/");

export const getLowStockProducts = () => api.get("/low-stock");

export const createProduct = (product) => api.post("/", product);

export const updateProduct = (id, product) => api.put(`/${id}`, product);

export const deleteProduct = (id) => api.delete(`/${id}`);
