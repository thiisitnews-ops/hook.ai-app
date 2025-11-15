import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import "../styles/auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const sendReset = async (e: any) => {
    e.preventDefault();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password",
    });

    if (error) alert(error.message);
    else alert("Password reset email sent!");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-title">Reset Password</div>

        <form onSubmit={sendReset}>
          <label>Email</label>
          <input
            className="auth-input"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="auth-button" type="submit">
            Send Reset Email
          </button>
        </form>

        <div className="auth-link">
          <a href="/login">Back to login</a>
        </div>
      </div>
    </div>
  );
}
