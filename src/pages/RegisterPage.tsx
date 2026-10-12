// src/pages/RegisterPage.tsx
import { useNavigate, Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthStore from "../store/authStore";
import useUiStore from "../store/uiStore";
import { registerUser, loginUser } from "../api/client";
import { registerSchema } from "../schemas/authSchema";
import type { RegisterFormValues } from "../schemas/authSchema";

function RegisterPage() {
  const setSession = useAuthStore((state) => state.setSession);
  const navigate = useNavigate();

  const isDarkMode = useUiStore((state) => state.isDarkMode);
  const toggleDarkMode = useUiStore((state) => state.toggleDarkMode);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: { name: "", email: "", password: "" },
  });

  const signUp = useMutation({
    // Two requests in order: register creates the account, login
    // signs the token. Only /api/auth/login issues one.
    mutationFn: async (values: RegisterFormValues) => {
      await registerUser(values);
      return loginUser({ email: values.email, password: values.password });
    },
    onSuccess: (reply) => {
      setSession(reply.token, reply.user.name);
      navigate("/sessions");
    },
  });

  const onSubmit = (values: RegisterFormValues): void => {
    signUp.mutate(values);
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <header className="glass sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="container mx-auto flex items-center justify-between p-4">
            <span className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              <span className="text-2xl">📚</span>
              Peer Tutoring Platform
            </span>

            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-2 rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:scale-105 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </header>

        <div className="flex min-h-[80vh] items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border-2 border-gray-200/80 bg-white/90 p-8 shadow-xl backdrop-blur-sm dark:border-gray-600/80 dark:bg-gray-800/90">
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
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Join Ka-Pair! 🎉
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Create an account to start tutoring.
              </p>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  Fill in your details
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  aria-invalid={errors.name ? true : undefined}
                  placeholder="Juan dela Cruz"
                  className="h-11 border-2 border-gray-200/80 bg-white/90 text-gray-900 placeholder:text-gray-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 dark:border-gray-600/80 dark:bg-gray-800/90 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500"
                />
                {errors.name && (
                  <p className="text-sm text-rose-600 dark:text-rose-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  aria-invalid={errors.email ? true : undefined}
                  placeholder="juan@dlsl.edu.ph"
                  className="h-11 border-2 border-gray-200/80 bg-white/90 text-gray-900 placeholder:text-gray-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 dark:border-gray-600/80 dark:bg-gray-800/90 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500"
                />
                {errors.email && (
                  <p className="text-sm text-rose-600 dark:text-rose-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  aria-invalid={errors.password ? true : undefined}
                  placeholder="At least 8 characters"
                  className="h-11 border-2 border-gray-200/80 bg-white/90 text-gray-900 placeholder:text-gray-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 dark:border-gray-600/80 dark:bg-gray-800/90 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500"
                />
                {errors.password && (
                  <p className="text-sm text-rose-600 dark:text-rose-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={signUp.isPending}
                className="h-11 w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-base font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:hover:scale-100 dark:from-blue-600 dark:to-indigo-600 [text-shadow:_0_1px_4px_rgba(0,0,0,0.15)]"
              >
                {signUp.isPending ? "Creating account..." : "Register"}
              </Button>

              {signUp.isError && (
                <p className="rounded-lg bg-rose-50 p-3 text-center text-sm text-rose-700 dark:bg-rose-900/20 dark:text-rose-400">
                  {signUp.error.message}
                </p>
              )}

              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;