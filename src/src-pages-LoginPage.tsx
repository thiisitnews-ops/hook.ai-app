import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";

export default function LoginPage() {
  const { signInEmail, signInGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const res = await signInEmail(email, password);
    if (res.error) return alert(res.error.message);
    window.location.href = "/";
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-title">Sign In</div>

        <button onClick={signInGoogle} className="google-button">
          Continue with Google
        </button>

        <hr style={{ margin: "20px 0" }} />

        <form onSubmit={onSubmit}>
          <label>Email</label>
          <input
            className="auth-input"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            className="auth-input"
            type="password"
            required
            onPaste={(e) => e.preventDefault()}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-button" type="submit">
            Sign In
          </button>
        </form>

        <div className="auth-link">
          <a href="/forgot">Forgot password?</a>
        </div>

        <div className="auth-link">
          Don’t have an account? <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
}
