import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, Bell, User } from "lucide-react";

const Topbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminId, setAdminId] = useState("");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setAdminId(localStorage.getItem("adminId") || "Admin");
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminId");
      navigate("/login");
    }
  };

  const getPageTitle = () => {
    const titles = {
      "/": "Dashboard",
      "/users": "Users Management",
      "/content": "Content Management",
      "/community-admin": "Community Control",
      "/private-messages": "Private Messages",
      "/reports": "Reports & Analytics",
      "/settings": "Settings"
    };
    return titles[location.pathname] || "Dashboard";
  };

  return (
    <div style={{
      background: "linear-gradient(90deg, #ffffff 0%, #f9fafb 100%)",
      padding: "16px 24px",
      borderBottom: "1px solid #e5e7eb",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
    }}>
      {/* Left Side - Page Title */}
      <div>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#111827" }}>{getPageTitle()}</h2>
        <p style={{ margin: "4px 0 0 0", fontSize: 12, color: "#6b7280" }}>
          {time.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })} · {time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>

      {/* Right Side - Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Notification Bell */}
        <button style={{
          background: "transparent",
          border: "1px solid #e5e7eb",
          padding: "8px 12px",
          borderRadius: 6,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          color: "#6b7280",
          transition: "all 0.2s"
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f3f4f6";
            e.currentTarget.style.color = "#111827";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#6b7280";
          }}
        >
          <Bell size={18} />
        </button>

        {/* User Info */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 12px",
          background: "#f3f4f6",
          borderRadius: 6
        }}>
          <User size={18} style={{ color: "#6b7280" }} />
          <div style={{ fontSize: 12 }}>
            <p style={{ margin: 0, fontWeight: 600, color: "#111827" }}>Admin</p>
            <p style={{ margin: 0, fontSize: 11, color: "#6b7280" }}>{adminId}</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: 6,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontWeight: 500,
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#dc2626";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#ef4444";
          }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;
