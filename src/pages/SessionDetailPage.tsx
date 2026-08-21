import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import type { ApiSession } from "../types/index";
import SessionCard from "../components/SessionCard";
import { fetchSessionById } from "../api/client";

function SessionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery<ApiSession>({
    queryKey: ["sessions", id],
    queryFn: () => fetchSessionById(id!),
    enabled: id !== undefined,
  });

  if (isPending) {
    return <div className="animate-pulse p-6">Loading session...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
        {error.message} — Session with ID "{id}" not found
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        📖 Session Details
      </h2>
      <div className="max-w-md">
        <SessionCard session={data as any} variant="default" />
      </div>
      <button
        onClick={() => navigate("/sessions")}
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        ← Back to Sessions
      </button>
    </div>
  );
}

export default SessionDetailPage;