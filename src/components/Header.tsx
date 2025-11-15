import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-10 w-10 object-contain"
        />
        <span className="text-xl font-bold tracking-tight">HOOK.AI</span>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center gap-5 ml-10">
          <Link to="/generate" className="hover:text-cyan-400">Generate</Link>
          <Link to="/upload" className="hover:text-cyan-400">Upload</Link>
          <Link to="/pricing" className="hover:text-cyan-400">Pricing</Link>
          {user && (
            <Link to="/dashboard" className="hover:text-cyan-400">Dashboard</Link>
          )}
        </nav>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-5">
        {user ? (
          <>
            <span className="text-sm text-gray-300">
              {user.email}
            </span>
            <button
              onClick={signOut}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link
            to="/signin"
            className="bg-cyan-600 px-4 py-2 rounded hover:bg-cyan-700"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
