import React, { useState } from "react";
import Header from "./components/Header";
import { PricingSection } from "./components/PricingSection";
import { AuthForm } from "./components/AuthForm";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { user, loading, signOut } = useAuth();
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [activePage, setActivePage] = useState<"generate" | "upload" | "pricing">("pricing");

  // Loading indicator
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // If user NOT logged in → show Auth card
  if (!user) {
    return (
      <div className="auth-wrapper">
        <AuthForm
          mode={authMode}
          onToggleMode={() =>
            setAuthMode(authMode === "signin" ? "signup" : "signin")
          }
        />
      </div>
    );
  }

  // If logged in → show full UI
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        onSignInClick={signOut}
        isLoggedIn={true}
      />

      {/* SHOW YOUR PRICING UI FOR NOW */}
      <main>
        <PricingSection />
      </main>
    </div>
  );
}
