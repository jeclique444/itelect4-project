import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">🔐 Login</h2>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Enter your name to log in (no password required for demo).
      </p>

      <div className="grid gap-1.5">
        <Label htmlFor="name" className="text-foreground">Your name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Juan dela Cruz"
        />
      </div>

      <Button
        onClick={handleLogin}
        disabled={name.trim() === ""}
        className="mt-3"
      >
        Log In
      </Button>
    </div>
  );
}

export default LoginPage;