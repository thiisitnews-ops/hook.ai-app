import React, { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { AuthForm } from "./components/AuthForm";
import { Header } from "./components/Header";
import { PricingSection } from "./components/PricingSection";
import { Success } from "./pages/Success";

export default function App() {
  try {
    const { user, loading } = useAuth();
    const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
    const isSuccessPage = window.location.pathname === "/success";

    if (loading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      );
    }

    if (isSuccessPage) return <Success />;

    if (!user)
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <AuthForm
            mode={authMode}
            onToggleMode={() =>
              setAuthMode(authMode === "signin" ? "signup" : "signin")
            }
          />
        </div>
      );

    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <main>
          <PricingSection />
        </main>
      </div>
    );
  } catch (error) {
    console.error("App render error:", error);
    return (
      <div className="min-h-screen bg-red-900 text-white flex items-center justify-center">
        <p>Render failed. Check console for details.</p>
      </div>
    );
  }
}
