import { NavLink, Outlet } from "react-router";
import useAuthStore from "../store/authStore";
import useUiStore from "../store/uiStore";

function Layout() {
  const isDarkMode = useUiStore((state) => state.isDarkMode);
  const toggleDarkMode = useUiStore((state) => state.toggleDarkMode);
  const userName = useAuthStore((state) => state.userName);
  const logout = useAuthStore((state) => state.logout);

  const base = "rounded px-3 py-1.5 text-sm transition";
  const activeLink = `${base} bg-blue-600 font-semibold text-white`;
  const idleLink = `${base} text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700`;

  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    isActive ? activeLink : idleLink;

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <nav className="flex flex-wrap items-center gap-2 border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <span className="mr-4 font-bold text-gray-900 dark:text-white">
            📚 Peer Tutoring
          </span>

          <NavLink to="/" end className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/sessions" className={linkClass}>
            Sessions
          </NavLink>
          <NavLink to="/bookings" className={linkClass}>
            Bookings
          </NavLink>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="rounded bg-gray-200 px-3 py-1.5 text-sm text-gray-800 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>

            {userName ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  👤 {userName}
                </span>
                <button
                  onClick={logout}
                  className="rounded bg-red-600 px-3 py-1.5 text-sm text-white transition hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink to="/login" className={idleLink}>
                Login
              </NavLink>
            )}
          </div>
        </nav>

        <main className="container mx-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;