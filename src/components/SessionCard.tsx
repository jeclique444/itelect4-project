import type { Session } from "../types/index";

interface SessionCardProps {
  session: Session;
  onBook?: (session: Session) => void;
  variant?: "default" | "compact";  // <-- NEW variant prop
}

function SessionCard({ session, onBook, variant = "default" }: SessionCardProps) {
  const isCompact = variant === "compact";

  const handleBook = (_e: React.MouseEvent<HTMLButtonElement>): void => {
    if (onBook) {
      onBook(session);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "🟢";
      case "cancelled": return "🔴";
      case "full": return "🟡";
      default: return "⚪";
    }
  };

  return (
    <div className={`rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800 ${isCompact ? "p-3" : "p-5"}`}>
      <h3 className={`font-bold text-gray-900 dark:text-white ${isCompact ? "text-sm" : "text-lg"}`}>
        {session.subject}
      </h3>
      {!isCompact && (
        <p className="text-gray-600 dark:text-gray-300">{session.description}</p>
      )}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        📚 {session.subject} - {session.duration} mins
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        👨‍🏫 Tutor ID: {session.tutorId}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        📅 {new Date(session.schedule).toLocaleString()}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        📍 {session.location}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        💰 ₱{session.price}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        👥 Capacity: {session.capacity} students
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Status: {getStatusColor(session.status)} {session.status}
      </p>
      {onBook && (
        <button
          onClick={handleBook}
          className={`mt-3 rounded bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:bg-green-500 dark:hover:bg-green-600 ${isCompact ? "w-full text-xs" : ""}`}
        >
          Book Session
        </button>
      )}
    </div>
  );
}

export default SessionCard;