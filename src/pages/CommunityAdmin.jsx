import React, { useEffect, useState } from "react";
import { fetchGroups, createGroup, deleteGroup } from "../api/admin";

export default function AdminCommunity() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newGroup, setNewGroup] = useState({ name: "", description: "" });
  const [error, setError] = useState("");

  const adminId = "ADMIN123"; // Replace with actual admin ID from auth

  // Load groups
  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    setLoading(true);
    try {
      const res = await fetchGroups();
      if (res.ok) setGroups(res.groups);
    } catch (err) {
      console.error("Error loading groups:", err);
      setError("Failed to load groups");
    } finally {
      setLoading(false);
    }
  };

  // Create group
  const handleCreate = async () => {
    if (!newGroup.name.trim()) return setError("Group name required");
    try {
      const res = await createGroup({ ...newGroup, adminId });
      if (res.ok) {
        setGroups([...groups, res.group]);
        setNewGroup({ name: "", description: "" });
        setError("");
      }
    } catch (err) {
      console.error("Create group failed:", err);
      setError("Failed to create group");
    }
  };

  // Delete group
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;
    try {
      const res = await deleteGroup(id);
      if (res.ok) {
        setGroups(groups.filter((g) => g.id !== id));
      }
    } catch (err) {
      console.error("Delete group failed:", err);
      setError("Failed to delete group");
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Community Groups Management</h1>

      {/* Create new group */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Create New Group</h2>
        {error && <p className="text-red-400 mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Group Name"
          value={newGroup.name}
          onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
          className="p-2 mb-2 w-full rounded bg-gray-700 text-white"
        />
        <textarea
          placeholder="Description (optional)"
          value={newGroup.description}
          onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
          className="p-2 mb-2 w-full rounded bg-gray-700 text-white"
        />
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded font-bold"
        >
          Create Group
        </button>
      </div>

      {/* Group List */}
      <div className="p-4 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Existing Groups</h2>
        {loading ? (
          <p>Loading groups...</p>
        ) : groups.length === 0 ? (
          <p>No groups available.</p>
        ) : (
          <ul className="space-y-3">
            {groups.map((g) => (
              <li key={g.id} className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div>
                  <h3 className="font-bold text-blue-400">{g.name}</h3>
                  <p className="text-gray-300">{g.description}</p>
                </div>
                <button
                  onClick={() => handleDelete(g.id)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded font-bold"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
