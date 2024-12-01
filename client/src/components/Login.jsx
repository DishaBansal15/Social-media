import React, { useContext } from "react";
import { AuthenticationContext } from "../context/AuthenticationContextProvider";

const Login = ({ setIsLoginBox }) => {
  const { setEmail, setPassword, login } = useContext(AuthenticationContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to bottom, #4facfe, #00f2fe)",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "90%",
          maxWidth: "400px",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        {/* App Logo */}
        <img
          src="https://img.icons8.com/color/96/000000/chat.png" // Placeholder for your app logo
          alt="VibeZone Logo"
          style={{
            width: "70px",
            height: "70px",
            marginBottom: "15px",
          }}
        />

        {/* Title */}
        <h2 style={{ marginBottom: "20px", color: "#333", fontWeight: "700" }}>
          Welcome to VibeZone!
        </h2>

        {/* Email Input */}
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="email"
            style={{
              display: "block",
              marginBottom: "5px",
              fontSize: "0.9rem",
              color: "#555",
            }}
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "1rem",
            }}
            required
          />
        </div>

        {/* Password Input */}
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="password"
            style={{
              display: "block",
              marginBottom: "5px",
              fontSize: "0.9rem",
              color: "#555",
            }}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "1rem",
            }}
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#1f9bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#187bd8")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#1f9bff")}
        >
          Sign In
        </button>

        {/* Register Link */}
        <p style={{ marginTop: "15px", fontSize: "0.9rem", color: "#777" }}>
          New to VibeZone?{" "}
          <span
            onClick={() => setIsLoginBox(false)}
            style={{
              color: "#1f9bff",
              fontWeight: "600",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Register Here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
