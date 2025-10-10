import React, { useEffect, useState } from "react";
import { fetchGroups, createGroup, deleteGroup } from "../api/community"; // admin API functions

export default function AdminCommunity() {
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDesc, setNewGroupDesc] = useState("");
  const adminId = localStorage.getItem("adminId") || "ADMIN";

  useEffect(() => {
    loadGroups();
  }, []);

  async function loadGroups() {
    const res = await fetchGroups();
    if (res.ok) setGroups(res.groups);
  }

  async function handleCreate() {
    if (!newGroupName.trim()) return;
    await createGroup({ name: newGroupName, description: newGroupDesc, adminId });
    setNewGroupName("");
    setNewGroupDesc("");
    loadGroups();
  }

  async function handleDelete(groupId) {
    if (!window.confirm("Are you sure to delete this group?")) return;
    await deleteGroup(groupId);
    loadGroups();
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Community Control</h1>

      {/* Create Group */}
      <div style={{ marginTop: "20px", marginBottom: "30px" }}>
        <h3>Create New Group</h3>
        <input
          placeholder="Group Name"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
        />
        <input
          placeholder="Description"
          value={newGroupDesc}
          onChange={(e) => setNewGroupDesc(e.target.value)}
        />
        <button onClick={handleCreate}>Create Group</button>
      </div>

      {/* List Groups */}
      <div>
        <h3>Existing Groups</h3>
        {groups.map((g) => (
          <div key={g.id} style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
            <strong>{g.name}</strong> - {g.description}
            <button
              style={{ marginLeft: "20px", color: "red" }}
              onClick={() => handleDelete(g.id)}
            >
              Delete
            </button>
            <p>Members: {g.members.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
