import { useState } from "react";
import type { User } from "../types/index";
import UserCard from "../components/UserCard";
import useToggle from "../hooks/useToggle";
import { allUsers } from "../data/mockData";

function DashboardPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDetails, toggleDetails] = useToggle(false);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        📊 Dashboard
      </h2>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        Welcome to the Peer Tutoring Platform. Manage your sessions and bookings here.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allUsers.map((user) => (
          <UserCard key={user.id} user={user} onSelect={setSelectedUser} />
        ))}
      </div>

      {selectedUser && (
        <div className="mt-4 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            ✅ Selected: <strong>{selectedUser.name}</strong> ({selectedUser.role})
          </p>
        </div>
      )}

      <button
        onClick={toggleDetails}
        className="mt-4 rounded bg-gray-200 px-4 py-2 text-sm text-gray-800 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
      >
        {showDetails ? "Hide" : "Show"} Details
      </button>

      {showDetails && (
        <div className="mt-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Total Users: {allUsers.length}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Selected: {selectedUser?.name || "None"}
          </p>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;