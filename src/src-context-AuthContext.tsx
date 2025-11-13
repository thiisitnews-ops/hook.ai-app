// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type AuthContextValue = {
  user: any | null;
  signInWithEmail: (email: string, password: string) => Promise<any>;
  signUpWithEmail: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  signInWithProvider: (provider: string) => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  const signInWithEmail = (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password });

  const signUpWithEmail = (email: string, password: string) =>
    supabase.auth.signUp({ email, password });

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const signInWithProvider = async (provider: string) => {
    // provider: "google", "facebook", "github", "twitter"
    await supabase.auth.signInWithOAuth({
      provider: provider as any,
      options: {
        // redirect to your app after sign in
        redirectTo: window.location.origin,
      },
    });
  };

  return (
    <AuthContext.Provider value={{ user, signInWithEmail, signUpWithEmail, signOut, signInWithProvider, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
