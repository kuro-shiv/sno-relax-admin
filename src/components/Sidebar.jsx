import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart3, Users, FileText, MessageSquare, Settings, Zap, MessageCircle, Users2 } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: BarChart3 },
    { path: "/users", label: "Users", icon: Users },
    { path: "/content", label: "Content", icon: FileText },
    { path: "/community", label: "Communities", icon: Users2 },
    { path: "/private-messages", label: "Messages", icon: MessageCircle },
    { path: "/reports", label: "Reports", icon: MessageSquare },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div style={{
      width: "240px",
      background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
      color: "white",
      minHeight: "100vh",
      padding: "24px 16px",
      boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Logo */}
      <div style={{ marginBottom: "32px", paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: 0.5 }}>🛡️ SnoRelax</h1>
        <p style={{ margin: "4px 0 0 0", fontSize: 11, color: "#9ca3af", fontWeight: 500 }}>ADMIN PANEL</p>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", marginBottom: 12, letterSpacing: 0.5 }}>Main Menu</div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <li key={item.path} style={{ marginBottom: 8 }}>
                <Link
                  to={item.path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 12px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    color: active ? "#ffffff" : "#d1d5db",
                    background: active ? "rgba(59, 130, 246, 0.2)" : "transparent",
                    borderLeft: active ? "3px solid #3b82f6" : "3px solid transparent",
                    paddingLeft: active ? "9px" : "12px",
                    transition: "all 0.2s ease",
                    fontSize: 13,
                    fontWeight: active ? 600 : 500
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "rgba(75, 85, 99, 0.3)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Info */}
      <div style={{ paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: 11, color: "#9ca3af" }}>
        <p style={{ margin: 0, marginBottom: 8 }}>Admin ID: {localStorage.getItem("adminId") || "unknown"}</p>
        <p style={{ margin: 0, fontSize: 10, color: "#6b7280" }}>v1.0 • {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default Sidebar;
