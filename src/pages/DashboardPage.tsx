// src/pages/DashboardPage.tsx
import { useState } from "react";
import type { User } from "../types/index";
import UserCard from "../components/UserCard";
import useToggle from "../hooks/useToggle";
import { allUsers } from "../data/mockData";

function DashboardPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDetails, toggleDetails] = useToggle(false);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-400 to-indigo-400 p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 h-64 w-64 -translate-y-12 translate-x-12 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-12 translate-y-12 rounded-full bg-white/5 blur-2xl"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold [text-shadow:_0_2px_8px_rgba(0,0,0,0.2)]">
            Dashboard
          </h2>
          <p className="mt-1 text-blue-50 [text-shadow:_0_1px_4px_rgba(0,0,0,0.15)]">
            Welcome to the Peer Tutoring Platform. Manage your sessions and bookings here.
          </p>
        </div>
      </div>

      {/* User Cards Grid — may isSelected prop */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onSelect={setSelectedUser}
            isSelected={selectedUser?.id === user.id} // 👈 ito ang magic
          />
        ))}
      </div>

      {/* Show Details Button */}
      <button
        onClick={toggleDetails}
        className="group relative mt-6 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 to-indigo-400 px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-300/40 active:scale-95 dark:from-blue-600 dark:to-indigo-600 [text-shadow:_0_1px_4px_rgba(0,0,0,0.15)]"
      >
        {showDetails ? "Hide Details" : "Show Details"}
        <span className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-40 dark:from-blue-600 dark:to-indigo-600"></span>
      </button>

      {/* Details Panel */}
      {showDetails && (
        <div className="mt-4 animate-slide-up rounded-2xl border-2 border-gray-200/80 bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:border-gray-600/80 dark:bg-gray-800/90">
          <div className="flex items-center gap-3 border-b border-gray-200 pb-3 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard Details</h3>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-blue-100 p-4 shadow-sm dark:bg-blue-900/30">
              <p className="text-sm text-blue-700 dark:text-blue-300">Total Users</p>
              <p className="text-2xl font-bold text-blue-800 dark:text-blue-100">{allUsers.length}</p>
            </div>
            <div className="rounded-xl bg-green-100 p-4 shadow-sm dark:bg-green-900/30">
              <p className="text-sm text-green-700 dark:text-green-300">Active Users</p>
              <p className="text-2xl font-bold text-green-800 dark:text-green-100">{allUsers.filter(u => u.isActive).length}</p>
            </div>
            <div className="rounded-xl bg-yellow-100 p-4 shadow-sm dark:bg-yellow-900/30">
              <p className="text-sm text-yellow-700 dark:text-yellow-300">Inactive Users</p>
              <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-100">{allUsers.filter(u => !u.isActive).length}</p>
            </div>
            <div className="rounded-xl bg-purple-100 p-4 shadow-sm dark:bg-purple-900/30">
              <p className="text-sm text-purple-700 dark:text-purple-300">Selected User</p>
              <p className="text-2xl font-bold text-purple-800 dark:text-purple-100 truncate">
                {selectedUser?.name || "None"}
              </p>
            </div>
          </div>

          <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Roles Breakdown:</p>
            <div className="mt-2 flex flex-wrap gap-4">
              <span className="rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                Tutor: {allUsers.filter(u => u.role === "tutor").length}
              </span>
              <span className="rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                Tutee: {allUsers.filter(u => u.role === "tutee").length}
              </span>
              <span className="rounded-full bg-purple-100 px-4 py-1.5 text-sm font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                Admin: {allUsers.filter(u => u.role === "admin").length}
              </span>
            </div>
          </div>

          <button
            onClick={toggleDetails}
            className="mt-4 rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Close Details
          </button>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;