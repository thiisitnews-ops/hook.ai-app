import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import "../styles/auth.css";

export default function ResetPassword() {
  const [password, setPassword] = useState("");

  const reset = async (e: any) => {
    e.preventDefault();

    const { error } = await supabase.auth.updateUser({ password });

    if (error) alert(error.message);
    else {
      alert("Password updated! You can now sign in.");
      window.location.href = "/login";
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-title">Set New Password</div>

        <form onSubmit={reset}>
          <label>New Password</label>
          <input
            className="auth-input"
            type="password"
            required
            onPaste={(e) => e.preventDefault()}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-button" type="submit">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
