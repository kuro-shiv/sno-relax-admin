import React, { useEffect, useState } from "react";
import { getUsers, updateUser, deleteUser, getProfileChanges } from "../services/api";
import UserTable from "../components/UserTable";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [profileChanges, setProfileChanges] = useState({}); // Map of userId -> [changes]
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsersAndChanges();
  }, []);

  const fetchUsersAndChanges = async () => {
    try {
      setLoading(true);
      const res = await getUsers();
      setUsers(res.data);

      // Fetch profile changes for all users to highlight recent edits
      try {
        const changesRes = await getProfileChanges(null, 500);
        const changesMap = {};
        if (changesRes.changes && Array.isArray(changesRes.changes)) {
          changesRes.changes.forEach(change => {
            if (!changesMap[change.userId]) {
              changesMap[change.userId] = [];
            }
            changesMap[change.userId].push(change);
          });
        }
        setProfileChanges(changesMap);
      } catch (err) {
        console.warn('Failed to fetch profile changes:', err);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBan = async (id, status) => {
    try {
      await updateUser(id, { banned: status });
      fetchUsersAndChanges();
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsersAndChanges();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Users Management</h1>
      <UserTable users={users} onBan={handleBan} onDelete={handleDelete} profileChanges={profileChanges} />
    </div>
  );
};

export default Users;
