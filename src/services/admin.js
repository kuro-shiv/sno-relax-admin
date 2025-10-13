import axios from "axios";

const API_URL = "https://sno-relax-server.onrender.com/api/admin"; // your server URL

export const getGroups = async () => {
  return axios.get(`${API_URL}/groups`);
};

export const createGroup = async (data) => {
  return axios.post(`${API_URL}/create-group`, data);
};

export const deleteGroup = async (groupId) => {
  return axios.delete(`${API_URL}/delete-group/${groupId}`);
};

export const getUsers = async () => {
  return axios.get(`${API_URL}/users`);
};
