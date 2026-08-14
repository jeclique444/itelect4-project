import { useParams, useNavigate } from "react-router";
import SessionCard from "../components/SessionCard";
import { allSessions } from "../data/mockData";

function SessionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const session = allSessions.find((s) => s.id === Number(id));

  if (!session) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
        ❌ No session found with ID "{id}"
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        📖 Session Details
      </h2>

      <div className="max-w-md">
        <SessionCard session={session} variant="default" />
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