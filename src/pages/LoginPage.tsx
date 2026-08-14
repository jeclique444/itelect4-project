import { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../store/authStore";

function LoginPage() {
  const [name, setName] = useState<string>("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (): void => {
    if (name.trim() === "") return;
    login(name);
    navigate("/bookings");
  };

  return (
    <div className="max-w-sm">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        🔐 Login
      </h2>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Enter your name to log in (no password required for demo).
      </p>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleLogin();
        }}
      />

      <button
        onClick={handleLogin}
        disabled={name.trim() === ""}
        className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        Log In
      </button>
    </div>
  );
}

export default LoginPage;