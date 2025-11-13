import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function SignUpPage() {
  const { signUpEmail, signInGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e: any) => {
    e.preventDefault();

    const res = await signUpEmail(email, password);

    if (res.error) {
      alert(res.error.message);
    } else {
      alert("Check your email inbox to confirm your account.");
    }
  };

  return (
    <div className="signup-wrapper">
      <h2>Create Account</h2>

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
        Sign Up with Google
      </button>

      <hr />

      <form onSubmit={handleSignUp}>
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

        <button type="submit" style={{ width: "100%" }}>
          Create Account
        </button>
      </form>

      <div style={{ marginTop: "15px" }}>
        Already have an account? <a href="/login">Sign in</a>
      </div>
    </div>
  );
}
