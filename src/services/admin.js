import axios from "axios";

const API_BASE = "https://sno-relax-server.onrender.com/api/admin"; // Your backend server URL

// Fetch all groups
export const fetchGroups = async () => {
  try {
    const res = await axios.get(`${API_BASE}/groups`);
    return { ok: true, groups: res.data };
  } catch (err) {
    console.error("Error fetching groups:", err);
    return { ok: false, groups: [] };
  }
};

// Create new group
export const createGroup = async (groupData) => {
  try {
    const res = await axios.post(`${API_BASE}/create-group`, groupData);
    return { ok: true, group: res.data };
  } catch (err) {
    console.error("Error creating group:", err);
    return { ok: false };
  }
};

// Delete a group
export const deleteGroup = async (groupId) => {
  try {
    const res = await axios.delete(`${API_BASE}/delete-group/${groupId}`);
    return { ok: true };
  } catch (err) {
    console.error("Error deleting group:", err);
    return { ok: false };
  }
};
