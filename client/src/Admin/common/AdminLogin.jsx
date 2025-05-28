import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!credentials.email || !credentials.password) {
      setError("Please enter both email and password!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3030/expert/login", credentials);

      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token);
        navigate("/expert/dashboard");  // Redirect to dashboard
      } else {
        setError("Invalid credentials, please try again.");
      }
    } catch (error) {
      setError("Login failed, please check your credentials.");
      console.error("Login Failed:", error);
    }
  };

  return (
    <div className="d-flex vh-100 align-items-center justify-content-center ">
      <div className="card shadow-lg p-4 w-100 bg-[#FF9933] border-2 border-[#CC5200]" style={{ maxWidth: "400px" }}>
        <h2 className="text-center fw-bold text-[#4A2F00] bg-gradient-to-r from-[#FFCC99] to-[#FF9933]">Admin Login</h2>

        {error && <p className="text-[#CC0000] text-center mt-2">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mt-3">
            <label className="form-label text-[#4A2F00]">Your Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              className="form-control border-[#FF6600] focus:ring-[#CC5200] focus:border-[#CC5200] placeholder-white"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
          </div>

          <div className="mt-3">
            <label className="form-label text-[#4A2F00]">Your Password</label>
            <input
              type="password"
              placeholder="Enter your password "
              className="form-control border-[#FF6600] focus:ring-[#CC5200] focus:border-[#CC5200] placeholder-white "
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="btn w-100 mt-4 bg-[#FF6600] text-white hover:bg-[#FFCC99] border-none bg-gradient-to-r from-[#FFCC99] to-[#FF9933]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;