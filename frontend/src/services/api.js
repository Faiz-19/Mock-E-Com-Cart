import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend API URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProducts = () => apiClient.get("/products");

export const getCart = () => apiClient.get("/cart");

export const addToCart = (productId, quantity) => {
  return apiClient.post("/cart", { productId, quantity });
};

export const removeFromCart = (itemId) => {
  return apiClient.delete(`/cart/${itemId}`);
};

export const updateCartQuantity = (itemId, action) => {
  return apiClient.put(`/cart/${itemId}`, { action });
};

export const checkout = (cartItems) => {
  return apiClient.post("/checkout", { cartItems });
};
