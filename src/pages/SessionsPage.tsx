import { useState, useEffect } from "react";
import { Link } from "react-router";
import type { Session } from "../types/index";
import SessionCard from "../components/SessionCard";
import { allSessions } from "../data/mockData";

function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setSessions(allSessions);
        setIsLoading(false);
      } catch {
        setIsError(true);
        setIsLoading(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const filteredSessions = sessions.filter((s) =>
    s.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="animate-pulse p-6 text-gray-500 dark:text-gray-400">
        Loading sessions...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
        Could not load sessions. Please try again.
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSessions.length > 0 ? (
          filteredSessions.map((s) => (
            <Link key={s.id} to={`/sessions/${s.id}`}>
              <SessionCard session={s} variant="default" />
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