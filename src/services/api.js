import axios from "axios";

// Replace this with your actual backend URL
const API_URL = "https://sno-relax-server.onrender.com/api/admin";

// ------------------ USERS ------------------

// Get all users
export const getUsers = () => axios.get(`${API_URL}/users`);

// Get a single user by ID
export const getUser = (id) => axios.get(`${API_URL}/users/${id}`);

// ------------------ CHATS ------------------

// Get all chats (optional: filter by userId)
export const getChats = (userId) =>
  axios.get(`${API_URL}/chats${userId ? `?userId=${userId}` : ""}`);

// ------------------ ANALYTICS / STATS ------------------

// Get dashboard statistics
export const getStats = () => axios.get(`${API_URL}/stats`);
