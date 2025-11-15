import React, { useState } from "react";
import { Mail, Lock, CircleAlert as AlertCircle } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

interface AuthFormProps {
  mode: "signin" | "signup";
  onToggleMode: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ mode, onToggleMode }) => {
  const { signIn, signUp, signInWithGoogle, resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isSignIn = mode === "signin";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const action = isSignIn ? signIn : signUp;

    const { error } = await action(email, password);

    if (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!email) return setErrorMessage("Enter your email first.");

    const { error } = await resetPassword(email);

    if (error) return setErrorMessage(error.message);

    alert("Password reset email sent! Check your inbox.");
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        {isSignIn ? "Welcome Back" : "Create Account"}
      </h2>

      {/* Google Login */}
      <button
        onClick={signInWithGoogle}
        className="w-full bg-white border border-gray-300 rounded-lg py-3 mb-4 hover:bg-gray-100 transition flex items-center justify-center gap-3"
      >
        <img
          src="https://www.gstatic.com/images/branding/product/1x/googlelogo_color_112x36dp.png"
          alt="Google"
          className="h-5"
        />
        Continue with Google
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="text-gray-500 text-sm">OR</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded mb-4 flex gap-2">
          <AlertCircle size={20} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Email & Password Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Email */}
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <div className="flex items-center gap-2 border rounded-lg px-3">
            <Mail size={20} className="text-gray-400" />
            <input
              type="email"
              className="w-full py-3 focus:outline-none"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <div className="flex items-center gap-2 border rounded-lg px-3">
            <Lock size={20} className="text-gray-400" />
            <input
              type="password"
              className="w-full py-3 focus:outline-none"
              placeholder="••••••••"
              required
              onPaste={(e) => e.preventDefault()} // disable paste
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          {loading
            ? "Please wait…"
            : isSignIn
            ? "Sign In"
            : "Create Account"}
        </button>
      </form>

      {/* Forgot Password */}
      {isSignIn && (
        <button
          onClick={handleForgotPassword}
          className="text-indigo-600 text-sm mt-3 w-full"
        >
          Forgot your password?
        </button>
      )}

      {/* Mode Toggle */}
      <p className="text-center text-gray-600 mt-6">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={onToggleMode}
          className="text-indigo-600 font-semibold"
        >
          {isSignIn ? "Sign Up" : "Sign In"}
        </button>
      </p>
    </div>
  );
};
