// src/components/Layout.tsx
import { NavLink, Outlet, useNavigate } from "react-router";  // ✅ ADD useNavigate
import useAuthStore from "../store/authStore";
import useUiStore from "../store/uiStore";

function Layout() {
  const navigate = useNavigate();  // ✅ ADD navigate hook
  const isDarkMode = useUiStore((state) => state.isDarkMode);
  const toggleDarkMode = useUiStore((state) => state.toggleDarkMode);
  const userName = useAuthStore((state) => state.userName);
  const logout = useAuthStore((state) => state.logout);

  // ✅ UPDATE logout handler
  const handleLogout = (): void => {
    logout();           // 1. Clear token and userName from store
    navigate("/login"); // 2. Redirect to login page
  };

  const base = "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200";
  const activeLink = `${base} bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg`;
  const idleLink = `${base} text-gray-700 hover:bg-gray-100 hover:scale-105 dark:text-gray-300 dark:hover:bg-gray-700`;

  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    isActive ? activeLink : idleLink;

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Glassmorphism Navbar */}
        <nav className="glass sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="container mx-auto flex flex-wrap items-center gap-3 p-4">
            <span className="mr-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              📚 Peer Tutoring
            </span>

            <div className="flex flex-wrap items-center gap-1.5">
              <NavLink to="/" end className={linkClass}>Dashboard</NavLink>
              <NavLink to="/sessions" className={linkClass}>Sessions</NavLink>
              <NavLink to="/bookings" className={linkClass}>Bookings</NavLink>
              <NavLink to="/submissions" className={linkClass}>Submissions</NavLink>
            </div>

            <div className="ml-auto flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="rounded-full bg-gray-200 p-2.5 transition-all hover:scale-110 hover:rotate-12 dark:bg-gray-700 dark:hover:bg-gray-600"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>

              {userName ? (
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    👤 {userName}
                  </span>
                  {/* ✅ UPDATED: handleLogout with redirect */}
                  <button
                    onClick={handleLogout}
                    className="rounded-lg bg-gradient-to-r from-red-500 to-rose-500 px-4 py-2 text-sm font-medium text-white transition-all hover:scale-105 hover:shadow-lg active:scale-95"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white transition-all hover:scale-105 hover:shadow-lg active:scale-95"
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </nav>

        {/* Page Content with Fade In */}
        <main className="container mx-auto animate-fade-in p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;