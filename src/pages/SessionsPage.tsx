// src/pages/SessionsPage.tsx
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
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-400 border-t-transparent"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading sessions...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl bg-rose-50 p-6 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400">
        <p className="font-medium">{error.message}</p>
        <p className="mt-1 text-sm">Is json-server running on port 3001?</p>
      </div>
    );
  }

  const totalSessions = data?.length || 0;
  const filteredCount = filteredSessions.length;
  const isSearching = searchTerm.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Sessions
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isSearching
              ? `Showing ${filteredCount} of ${totalSessions} session${totalSessions !== 1 ? "s" : ""}`
              : `${filteredCount} session${filteredCount !== 1 ? "s" : ""} available`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-3.5 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            {isSearching ? `${filteredCount} / ${totalSessions}` : `${totalSessions}`}
          </span>
        </div>
      </div>

      {/* Search Section */}
      <div className="relative">
        <div className="relative">
          {/* Search Icon */}
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <svg
              className="h-5 w-5 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search sessions by subject or description..."
            className="w-full rounded-xl border-2 border-gray-200/80 bg-white/90 py-3.5 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400/20 dark:border-gray-600/80 dark:bg-gray-800/90 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Previous search indicator */}
        {previousSearch !== undefined && previousSearch !== searchTerm && searchTerm && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Previous search: <span className="font-medium">"{previousSearch}"</span>
          </p>
        )}
      </div>

      {/* Results count - zero state */}
      {filteredCount === 0 && searchTerm && (
        <div className="rounded-xl bg-gray-50 p-8 text-center dark:bg-gray-800/50">
          <p className="text-gray-500 dark:text-gray-400">
            No sessions found matching <span className="font-medium text-gray-700 dark:text-gray-300">"{searchTerm}"</span>
          </p>
          <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
            Try adjusting your search terms
          </p>
        </div>
      )}

      {/* Sessions Grid */}
      {filteredCount > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSessions.map((s) => (
            <Link key={s.id} to={`/sessions/${s.id}`} className="block transition-opacity hover:opacity-100">
              <SessionCard session={s as any} variant="default" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SessionsPage;