// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { signInWithEmail, signInWithProvider } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signInWithEmail(email, password);
    setLoading(false);
    if (res.error) {
      alert(res.error.message);
    } else {
      // success (supabase handles session)
    }
  };

  return (
    <div className="auth-card">
      <h2>Welcome back</h2>

      <form onSubmit={onEmailSignIn}>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        <label>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        <button type="submit" disabled={loading}>
          Sign in
        </button>
      </form>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => signInWithProvider("google")}>Sign in with Google</button>
        <button onClick={() => signInWithProvider("facebook")}>Sign in with Facebook</button>
        <button onClick={() => signInWithProvider("github")}>Sign in with GitHub</button>
        <button onClick={() => signInWithProvider("twitter")}>Sign in with X</button>
      </div>
    </div>
  );
}
