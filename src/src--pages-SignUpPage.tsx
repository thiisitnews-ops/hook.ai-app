import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";

export default function SignUpPage() {
  const { signUpEmail, signInGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const res = await signUpEmail(email, password);
    if (res.error) return alert(res.error.message);
    alert("Check your inbox to confirm your email.");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-title">Create Account</div>

        <button onClick={signInGoogle} className="google-button">
          Sign Up with Google
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
            Create Account
          </button>
        </form>

        <div className="auth-link">
          Already have an account? <a href="/login">Sign In</a>
        </div>
      </div>
    </div>
  );
}
