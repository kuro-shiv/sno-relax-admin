// src/pages/Content.jsx
import React, { useEffect, useState } from "react";
import {
  getContent,
  createContent,
  updateContent,
  deleteContent,
} from "../services/api";

const Content = () => {
  const [contentList, setContentList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("article");
  const [mediaUrl, setMediaUrl] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [searchTitle, setSearchTitle] = useState("");

  const contentTypes = ["article", "video", "exercise", "guide", "tip"];

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await getContent();
      setContentList(res.data || []);
    } catch (err) {
      console.error("Error fetching content:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!title.trim() || !description.trim()) return;
    try {
      await createContent({ title, description, type, mediaUrl: mediaUrl || null, createdBy: "admin" });
      resetForm();
      fetchContent();
      alert("Content created successfully");
    } catch (err) {
      console.error("Error adding content:", err);
      alert("Failed to add content");
    }
  };

  const handleEdit = (content) => {
    setEditingId(content._id);
    setTitle(content.title);
    setDescription(content.description);
    setType(content.type || "article");
    setMediaUrl(content.mediaUrl || "");
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    try {
      await updateContent(editingId, { title, description, type, mediaUrl: mediaUrl || null });
      resetForm();
      fetchContent();
      alert("Content updated successfully");
    } catch (err) {
      console.error("Error updating content:", err);
      alert("Failed to update content");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this content?")) return;
    try {
      await deleteContent(id);
      fetchContent();
      alert("Content deleted successfully");
    } catch (err) {
      console.error("Error deleting content:", err);
      alert("Failed to delete content");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setType("article");
    setMediaUrl("");
  };

  // Filter and search
  const filtered = contentList.filter(c => {
    const matchType = filterType === "all" || c.type === filterType;
    const matchTitle = c.title.toLowerCase().includes(searchTitle.toLowerCase());
    return matchType && matchTitle;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Content Management</h1>

      {/* Create/Edit Form */}
      <div style={{ marginBottom: "24px", padding: "16px", background: "#f9f9f9", borderRadius: 8 }}>
        <h3>{editingId ? "Edit Content" : "Create New Content"}</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "12px" }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Title *</label>
            <input
              type="text"
              placeholder="Content title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: 4, boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Type *</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: 4, boxSizing: "border-box" }}
            >
              {contentTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Description *</label>
            <textarea
              placeholder="Content description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: 4, boxSizing: "border-box", minHeight: 80, fontFamily: "Arial" }}
            />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Media URL (optional)</label>
            <input
              type="text"
              placeholder="https://example.com/media"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: 4, boxSizing: "border-box" }}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {editingId ? (
            <>
              <button onClick={handleUpdate} style={{ padding: "8px 16px", background: "#10b981", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>Update</button>
              <button onClick={resetForm} style={{ padding: "8px 16px", background: "#6b7280", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>Cancel</button>
            </>
          ) : (
            <button onClick={handleAdd} style={{ padding: "8px 16px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>Create</button>
          )}
        </div>
      </div>

      {/* Filters & Search */}
      <div style={{ display: "flex", gap: 12, marginBottom: "16px", alignItems: "center" }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, marginRight: 8 }}>Filter by Type:</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{ padding: "6px", border: "1px solid #ddd", borderRadius: 4 }}
          >
            <option value="all">All Types</option>
            {contentTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 12, fontWeight: 600, marginRight: 8 }}>Search Title:</label>
          <input
            type="text"
            placeholder="Search..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            style={{ padding: "6px", border: "1px solid #ddd", borderRadius: 4, width: "100%", boxSizing: "border-box" }}
          />
        </div>
      </div>

      {/* Content Table */}
      {loading ? (
        <p>Loading content...</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Arial" }}>
            <thead>
              <tr style={{ background: "#f7f7f7", textAlign: "left" }}>
                <th style={{ padding: 8, borderBottom: "2px solid #ddd" }}>#</th>
                <th style={{ padding: 8, borderBottom: "2px solid #ddd" }}>Title</th>
                <th style={{ padding: 8, borderBottom: "2px solid #ddd" }}>Type</th>
                <th style={{ padding: 8, borderBottom: "2px solid #ddd" }}>Description</th>
                <th style={{ padding: 8, borderBottom: "2px solid #ddd" }}>Media URL</th>
                <th style={{ padding: 8, borderBottom: "2px solid #ddd" }}>Created</th>
                <th style={{ padding: 8, borderBottom: "2px solid #ddd" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((content, idx) => (
                  <tr key={content._id} style={{ borderTop: "1px solid #eee" }}>
                    <td style={{ padding: 8 }}>{idx + 1}</td>
                    <td style={{ padding: 8, fontWeight: 600 }}>{content.title}</td>
                    <td style={{ padding: 8 }}><span style={{ background: "#e0f2fe", padding: "2px 8px", borderRadius: 3, fontSize: 12 }}>{content.type}</span></td>
                    <td style={{ padding: 8, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{content.description}</td>
                    <td style={{ padding: 8, maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {content.mediaUrl ? <a href={content.mediaUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#0ea5e9" }}>View</a> : "-"}
                    </td>
                    <td style={{ padding: 8, fontSize: 12, color: "#666" }}>{new Date(content.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: 8 }}>
                      <button onClick={() => handleEdit(content)} style={{ marginRight: 6, padding: "4px 8px", background: "#fbbf24", border: "none", borderRadius: 3, cursor: "pointer", fontSize: 12 }}>Edit</button>
                      <button onClick={() => handleDelete(content._id)} style={{ padding: "4px 8px", background: "#ef4444", color: "#fff", border: "none", borderRadius: 3, cursor: "pointer", fontSize: 12 }}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="7" style={{ padding: 16, textAlign: "center", color: "#999" }}>No content found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ marginTop: 16, fontSize: 12, color: "#666" }}>
        Total: {contentList.length} | Filtered: {filtered.length}
      </div>
    </div>
  );
};

export default Content;
