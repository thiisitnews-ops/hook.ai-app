// src/pages/SignUpPage.tsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function SignUpPage() {
  const { signUpWithEmail, signInWithProvider } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signUpWithEmail(email, password);
    if (res.error) {
      alert(res.error.message);
    } else {
      alert("Check your email for confirmation (if enabled)");
    }
  };

  return (
    <div>
      <h2>Create account</h2>
      <form onSubmit={onSignUp}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        <button type="submit">Sign up</button>
      </form>

      <div>
        <button onClick={() => signInWithProvider("google")}>Continue with Google</button>
        <button onClick={() => signInWithProvider("facebook")}>Continue with Facebook</button>
      </div>
    </div>
  );
}
