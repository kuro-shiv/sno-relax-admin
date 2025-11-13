import React, { useEffect, useState, useCallback } from "react";
import { getProfileChanges, getUsers } from "../services/api";

const ProfileChanges = () => {
  const [changes, setChanges] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await getUsers();
        setUsers(res.data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    })();
  }, []);

  const fetchChanges = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getProfileChanges(selectedUserId === "all" ? null : selectedUserId, 100);
      setChanges(res.changes || []);
    } catch (err) {
      console.error("Error fetching profile changes:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedUserId]);

  useEffect(() => {
    fetchChanges();
  }, [fetchChanges]);


  const getUserName = (userId) => {
    const user = users.find(u => u.userId === userId);
    return user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email : userId;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Profile Changes (Audit Log)</h1>

      {/* Filters */}
      <div style={{ marginBottom: "20px", display: "flex", gap: 12, alignItems: "center" }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, marginRight: 8 }}>Filter by User:</label>
          <select
            value={selectedUserId}
            onChange={(e) => {
              setSelectedUserId(e.target.value);
            }}
            style={{ padding: "6px 8px", border: "1px solid #ddd", borderRadius: 4 }}
          >
            <option value="all">All Users</option>
            {users.map(u => (
              <option key={u.userId} value={u.userId}>
                {`${u.firstName || ''} ${u.lastName || ''}`.trim() || u.email}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Changes Table */}
      {loading ? (
        <p>Loading changes...</p>
      ) : (
        <>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Arial", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#f7f7f7", textAlign: "left" }}>
                  <th style={{ padding: 8, borderBottom: "2px solid #ddd" }}>User</th>
                  <th style={{ padding: 8, borderBottom: "2px solid #ddd" }}>Field</th>
                  <th style={{ padding: 8, borderBottom: "2px solid #ddd" }}>Old Value</th>
                  <th style={{ padding: 8, borderBottom: "2px solid #ddd" }}>New Value</th>
                  <th style={{ padding: 8, borderBottom: "2px solid #ddd" }}>Changed By</th>
                  <th style={{ padding: 8, borderBottom: "2px solid #ddd" }}>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {changes && changes.length > 0 ? (
                  changes.map((change, idx) => (
                    <tr key={change._id} style={{ borderTop: "1px solid #eee" }}>
                      <td style={{ padding: 8, fontWeight: 600 }}>{getUserName(change.userId)}</td>
                      <td style={{ padding: 8 }}><span style={{ background: "#e0e7ff", padding: "2px 6px", borderRadius: 3, fontSize: 11 }}>{change.fieldName}</span></td>
                      <td style={{ padding: 8, maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#666" }}>
                        {typeof change.oldValue === 'object' ? JSON.stringify(change.oldValue) : String(change.oldValue)}
                      </td>
                      <td style={{ padding: 8, maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: 600, color: "#16a34a" }}>
                        {typeof change.newValue === 'object' ? JSON.stringify(change.newValue) : String(change.newValue)}
                      </td>
                      <td style={{ padding: 8, fontSize: 12 }}>{change.changedBy || 'user'}</td>
                      <td style={{ padding: 8, fontSize: 12, color: "#666" }}>{new Date(change.changedAt).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="6" style={{ padding: 16, textAlign: "center", color: "#999" }}>No changes recorded</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: "#666" }}>
            Total changes: {changes.length}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileChanges;
