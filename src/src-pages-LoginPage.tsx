import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { signInEmail, signInGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await signInEmail(email, password);
    setLoading(false);

    if (res.error) {
      alert(res.error.message);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="login-wrapper">

      <h2>Welcome Back</h2>

      {/* Google Login */}
      <button
        onClick={signInGoogle}
        style={{
          width: "100%",
          padding: "10px",
          background: "white",
          border: "1px solid #ccc",
          cursor: "pointer",
          marginBottom: "15px"
        }}
      >
        Continue with Google
      </button>

      <hr />

      {/* Email Login */}
      <form onSubmit={handleLogin} style={{ marginTop: "15px" }}>
        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onPaste={(e) => e.preventDefault()}  // 🚫 Disable paste
        />

        <button type="submit" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Loading..." : "Sign in"}
        </button>
      </form>

      <div style={{ marginTop: "15px" }}>
        Don't have an account? <a href="/signup">Sign up</a>
      </div>
    </div>
  );
}
