import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import type { ApiSession } from "../types/index";
import SessionCard from "../components/SessionCard";
import useUiStore from "../store/uiStore";
import usePrevious from "../hooks/usePrevious";
import { fetchSessions } from "../api/client";

function SessionsPage() {
  const searchTerm = useUiStore((state) => state.searchTerm);
  const setSearchTerm = useUiStore((state) => state.setSearchTerm);
  const previousSearch = usePrevious(searchTerm);

  const { data, isPending, isError, error } = useQuery<ApiSession[]>({
    queryKey: ["sessions"],
    queryFn: fetchSessions,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const filteredSessions = data?.filter((s) =>
    s.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) ?? [];

  if (isPending) {
    return (
      <div className="animate-pulse p-6 text-gray-500 dark:text-gray-400">
        Loading sessions...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
        {error.message} — is json-server running on port 3001?
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        📖 Sessions ({filteredSessions.length})
      </h2>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="🔍 Search sessions..."
        className="mb-4 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
      />

      {previousSearch !== undefined && previousSearch !== searchTerm && (
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          Previous search: "{previousSearch}"
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSessions.length > 0 ? (
          filteredSessions.map((s) => (
            <Link key={s.id} to={`/sessions/${s.id}`}>
              <SessionCard session={s as any} variant="default" />
            </Link>
          ))
        ) : (
          <p className="col-span-full text-gray-500 dark:text-gray-400">
            No sessions found matching "{searchTerm}"
          </p>
        )}
      </div>
    </div>
  );
}

export default SessionsPage;