import axios from "axios";

// ✅ Always point to your backend server
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/admin";
const BASE = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}/community`
  : "http://localhost:5000/api/community";

// ------------------ USERS ------------------

// Get all users
export const getUsers = () => axios.get(`${API_URL}/users`);

// Get a single user by ID
export const getUser = (id) => axios.get(`${API_URL}/users/${id}`);

// Create a new user
export const createUser = (userData) => axios.post(`${API_URL}/users`, userData);

// Update user (e.g., edit or block)
export const updateUser = (id, updatedData) =>
  axios.put(`${API_URL}/users/${id}`, updatedData);

// Delete a user
export const deleteUser = (id) => axios.delete(`${API_URL}/users/${id}`);

// Admin login
export const loginAdmin = (credentials) =>
  axios.post(`${API_URL}/login`, credentials);

// Get chat stats for last 7 days
export const getChatStats = () => axios.get(`${API_URL}/stats/chats`);

// ------------------ COMMUNITY ------------------

// Fetch all groups
export async function fetchGroups() {
  const res = await axios.get(`${BASE}/groups`);
  return res.data;
}

// Create a new group
export async function createGroup(data) {
  const res = await axios.post(`${BASE}/create`, data);
  return res.data;
}

// Delete a group
export async function deleteGroup(groupId) {
  const res = await axios.delete(`${BASE}/${groupId}`);
  return res.data;
}

// ------------------ CONTENT ------------------

// Get all content
export const getContent = () => axios.get(`${API_URL}/content`);

// Get content by ID
export const getContentById = (id) => axios.get(`${API_URL}/content/${id}`);

// Create new content
export const createContent = (data) => axios.post(`${API_URL}/content`, data);

// Update content
export const updateContent = (id, data) => axios.put(`${API_URL}/content/${id}`, data);

// Delete content
export const deleteContent = (id) => axios.delete(`${API_URL}/content/${id}`);

// ------------------ ANALYTICS / STATS ------------------

export const getStats = () => axios.get(`${API_URL}/stats`);
