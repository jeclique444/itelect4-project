// src/App.tsx
import { Routes, Route, Navigate } from "react-router";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import SessionsPage from "./pages/SessionsPage";
import SessionDetailPage from "./pages/SessionDetailPage";
import BookingsPage from "./pages/BookingsPage";
import SubmissionsPage from "./pages/SubmissionsPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import useAuthStore from "./store/authStore";

function App() {
  const token = useAuthStore((state) => state.token);

  return (
    <Routes>
      {/* ✅ Login route — accessible kahit hindi logged in */}
      <Route path="/login" element={<LoginPage />} />

      {/* ✅ All other routes are protected — kailangan logged in */}
      <Route
        path="/"
        element={
          token ? <Layout /> : <Navigate to="/login" replace />
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="sessions">
          <Route index element={<SessionsPage />} />
          <Route path=":id" element={<SessionDetailPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="submissions" element={<SubmissionsPage />} />
        </Route>
      </Route>

      {/* ✅ 404 — accessible kahit hindi logged in */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;