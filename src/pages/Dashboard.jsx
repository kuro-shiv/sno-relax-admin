// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { getStats, getUsers, getContent } from "../services/api";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalChats: 0,
    totalContent: 0,
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentContent, setRecentContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contentTypesData, setContentTypesData] = useState([]);
  const [chatActivityData, setChatActivityData] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const statsRes = await getStats();
      const contentRes = await getContent();
      const usersRes = await getUsers();

      setStats({
        totalUsers: statsRes.data.totalUsers,
        totalChats: statsRes.data.totalChats,
        totalContent: contentRes.data.length,
      });

      setRecentUsers(usersRes.data.slice(0, 5));
      setRecentContent(contentRes.data.slice(0, 5));

      // Prepare content type distribution for Pie chart
      const typesCount = contentRes.data.reduce((acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + 1;
        return acc;
      }, {});
      const pieData = Object.keys(typesCount).map((key) => ({
        name: key,
        value: typesCount[key],
      }));
      setContentTypesData(pieData);

      // Prepare chat activity (dummy for now, real API can be added)
      // Example: 7 days chat counts
      const chatData = [
        { day: "Mon", chats: Math.floor(Math.random() * 20) },
        { day: "Tue", chats: Math.floor(Math.random() * 20) },
        { day: "Wed", chats: Math.floor(Math.random() * 20) },
        { day: "Thu", chats: Math.floor(Math.random() * 20) },
        { day: "Fri", chats: Math.floor(Math.random() * 20) },
        { day: "Sat", chats: Math.floor(Math.random() * 20) },
        { day: "Sun", chats: Math.floor(Math.random() * 20) },
      ];
      setChatActivityData(chatData);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setLoading(false);
    }
  };

  if (loading) return <p>Loading dashboard...</p>;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      {/* Stats Cards */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ flex: 1, padding: "20px", background: "#f5f5f5", borderRadius: "10px" }}>
          <h2>Total Users</h2>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{stats.totalUsers}</p>
        </div>
        <div style={{ flex: 1, padding: "20px", background: "#f5f5f5", borderRadius: "10px" }}>
          <h2>Total Chats</h2>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{stats.totalChats}</p>
        </div>
        <div style={{ flex: 1, padding: "20px", background: "#f5f5f5", borderRadius: "10px" }}>
          <h2>Total Content</h2>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{stats.totalContent}</p>
        </div>
      </div>

      {/* Recent Users Table */}
      <div style={{ marginTop: "40px" }}>
        <h2>Recent Users</h2>
        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Joined At</th>
            </tr>
          </thead>
          <tbody>
            {recentUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Content Table */}
      <div style={{ marginTop: "40px" }}>
        <h2>Recent Content</h2>
        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {recentContent.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.type}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts */}
      <div style={{ display: "flex", gap: "40px", marginTop: "40px", flexWrap: "wrap" }}>
        {/* Users Chart */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h3>Recent Users Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={recentUsers.map((u, i) => ({ name: `User ${i + 1}`, joined: new Date(u.createdAt).toLocaleDateString() }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="joined" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="name" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Content Types Pie */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h3>Content Types Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={contentTypesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {contentTypesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Chat Activity Chart */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h3>Chat Activity (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chatActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="chats" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
