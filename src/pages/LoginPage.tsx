// src/pages/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthStore from "../store/authStore";
import useUiStore from "../store/uiStore";

function LoginPage() {
  const [name, setName] = useState<string>("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  // 👇 Dark mode state
  const isDarkMode = useUiStore((state) => state.isDarkMode);
  const toggleDarkMode = useUiStore((state) => state.toggleDarkMode);

  const handleLogin = (): void => {
    if (name.trim() === "") return;
    login(name);
    navigate("/");
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* 👇 Header — Peer Tutoring Platform + Dark Mode Toggle */}
        <header className="glass sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="container mx-auto flex items-center justify-between p-4">
            {/* Brand Name */}
            <span className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              <span className="text-2xl">📚</span>
              Peer Tutoring Platform
            </span>

            {/* Dark Mode Toggle — may label */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-2 rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:scale-105 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </header>

        {/* 👇 Login Form — centered */}
        <div className="flex min-h-[80vh] items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border-2 border-gray-200/80 bg-white/90 p-8 shadow-xl backdrop-blur-sm dark:border-gray-600/80 dark:bg-gray-800/90">
            {/* Header with Icon */}
            <div className="mb-6 text-center">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 shadow-md dark:from-blue-500 dark:to-indigo-500">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome Back, Ka-Pair! 👋
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Ready to learn something new today?
              </p>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  Just type your name
                </span>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  What do we call you?
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Juan dela Cruz"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleLogin();
                  }}
                  className="h-11 border-2 border-gray-200/80 bg-white/90 text-gray-900 placeholder:text-gray-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 dark:border-gray-600/80 dark:bg-gray-800/90 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500"
                />
              </div>

              <Button
                onClick={handleLogin}
                disabled={name.trim() === ""}
                className="h-11 w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-base font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:hover:scale-100 dark:from-blue-600 dark:to-indigo-600 [text-shadow:_0_1px_4px_rgba(0,0,0,0.15)]"
              >
                {name.trim() ? "Log in" : "Type your name to start"}
              </Button>

              <p className="text-center text-xs text-gray-400 dark:text-gray-500">
                No password needed — just your name, and you're in!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;