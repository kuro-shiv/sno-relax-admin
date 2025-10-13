import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded admin credentials
    if (adminId === "admin" && password === "pass") {
      localStorage.setItem("adminToken", "dummyToken"); // save dummy token
      navigate("/"); // redirect to dashboard
    } else {
      setError("Invalid admin ID or password");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <form onSubmit={handleSubmit} style={{ width: "300px", textAlign: "center" }}>
        <h2>Admin Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          placeholder="Admin ID"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <button type="submit" style={{ width: "100%", padding: "8px" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
