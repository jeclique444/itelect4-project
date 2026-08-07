import { useState, useEffect, useRef } from "react";
import type { User, Session, Booking } from "./types/index";
import UserCard from "./components/UserCard";
import SessionCard from "./components/SessionCard";
import BookingCard from "./components/BookingCard";
import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";

// ========================================
// MOCK DATA
// ========================================

const tutor: User = {
  id: 1,
  name: "Jeric Lique",
  email: "jeric_lique@dlsl.com",
  role: "tutor",
  isActive: true,
  rating: 4.8,
  subjects: ["Mathematics", "Physics", "Programming"]
};

const tutee: User = {
  id: 2,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "tutee",
  isActive: true
};

const admin: User = {
  id: 3,
  name: "Admin User",
  email: "admin@example.com",
  role: "admin",
  isActive: true
};

const session: Session = {
  id: 1,
  tutorId: 1,
  subject: "Mathematics",
  description: "Advanced Calculus tutoring session",
  duration: 60,
  capacity: 5,
  schedule: new Date("2026-08-01T14:00:00"),
  price: 500,
  location: "Library Room MB 301",
  status: "active"
};

const booking: Booking = {
  id: 1,
  sessionId: 1,
  tuteeId: 2,
  status: "requested",
  bookedAt: new Date()
};

// All data arrays
const allUsers: User[] = [tutor, tutee, admin];
const allSessions: Session[] = [session];
const allBookings: Booking[] = [booking];

// ========================================
// APP COMPONENT
// ========================================

function App() {
  // ===== useState =====
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // ===== useRef =====
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ===== Custom Hooks =====
  const [showDetails, toggleDetails] = useToggle(false);
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  const previousSearch = usePrevious(searchTerm);

  // ===== useEffect =====
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setSessions(allSessions);
        setBookings(allBookings);
        setIsLoading(false);
        setIsError(false);
      } catch {
        setIsError(true);
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // ===== Typed Event Handler =====
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(e.target.value);
  };

  // ===== Filtered Data =====
  const filteredSessions = sessions.filter((s) =>
    s.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ===== Handlers =====
  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleBookSession = (session: Session) => {
    alert(`Booking session: ${session.subject} at ${session.location}`);
  };

  const handleCancelBooking = (booking: Booking) => {
    const updatedBookings = bookings.map((b) =>
      b.id === booking.id ? { ...b, status: "cancelled" as const } : b
    );
    setBookings(updatedBookings);
    alert(`Booking #${booking.id} cancelled!`);
  };

  const focusSearchInput = (): void => {
    searchInputRef.current?.focus();
  };

  // ===== Simulate Error =====
  const simulateError = () => {
    setIsError(true);
    setIsLoading(false);
  };

  // ===== Loading State =====
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="mx-auto h-12 w-12 rounded-full bg-blue-500"></div>
            <div className="mt-4 h-4 w-48 rounded bg-gray-300 dark:bg-gray-700"></div>
            <div className="mt-2 h-3 w-32 rounded bg-gray-200 dark:bg-gray-600"></div>
          </div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading courses...</p>
        </div>
      </div>
    );
  }

  // ===== Error State =====
  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="rounded-lg bg-red-50 p-6 text-center dark:bg-red-900/20">
          <div className="text-4xl">⚠️</div>
          <h3 className="mt-2 text-lg font-semibold text-red-700 dark:text-red-400">
            Could not load data
          </h3>
          <p className="text-sm text-red-600 dark:text-red-300">
            Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded bg-red-600 px-4 py-2 text-sm text-white transition hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ===== Render =====
  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 sm:p-6">
        {/* Header */}
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                📚 Peer Tutoring Platform
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                GT2 Part 3 - Tailwind CSS + UI Polish
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={toggleDarkMode}
                className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>
              <button
                onClick={simulateError}
                className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
              >
                ⚠️    
              </button>
            </div>
          </div>

          <hr className="my-4 border-gray-200 dark:border-gray-700" />

          {/* Search Section */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="relative flex-1">
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search sessions..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400"
              />
            </div>
            <button
              onClick={focusSearchInput}
              className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
               Search
            </button>
            <button
              onClick={toggleDetails}
              className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              {showDetails ? "Hide" : "Show"} Details
            </button>
          </div>

          {/* Previous Search */}
          {previousSearch !== undefined && previousSearch !== searchTerm && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Previous search: "{previousSearch}"
            </p>
          )}

          {/* Selected User */}
          {selectedUser && (
            <div className="mt-4 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Selected: <strong>{selectedUser.name}</strong> ({selectedUser.role})
              </p>
            </div>
          )}

          <hr className="my-4 border-gray-200 dark:border-gray-700" />

          {/* Users Section */}
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            👤 Users
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allUsers.map((user) => (
              <UserCard key={user.id} user={user} onSelect={handleSelectUser} />
            ))}
          </div>

          <hr className="my-4 border-gray-200 dark:border-gray-700" />

          {/* Sessions Section */}
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            📖 Sessions ({filteredSessions.length})
          </h2>
          {showDetails && (
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              💡 Showing {filteredSessions.length} session(s). Search to filter.
            </p>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSessions.length > 0 ? (
              filteredSessions.map((s) => (
                <SessionCard key={s.id} session={s} onBook={handleBookSession} variant="default" />
              ))
            ) : (
              <div className="col-span-full rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
                <p className="text-gray-500 dark:text-gray-400">
                  No sessions found matching "{searchTerm}"
                </p>
              </div>
            )}
          </div>

          <hr className="my-4 border-gray-200 dark:border-gray-700" />

          {/* Bookings Section */}
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            📝 Bookings ({bookings.length})
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bookings.map((b) => (
              <BookingCard key={b.id} booking={b} onCancel={handleCancelBooking} variant="default">
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  🆔 Booking #{b.id}
                </p>
              </BookingCard>
            ))}
          </div>

          <hr className="my-4 border-gray-200 dark:border-gray-700" />

          {/* Debug Info */}
          {showDetails && (
            <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white">🔍 Debug Info</h3>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400 sm:grid-cols-3">
                <p>Search: "{searchTerm}"</p>
                <p>Prev: "{previousSearch}"</p>
                <p>Sessions: {sessions.length}</p>
                <p>Filtered: {filteredSessions.length}</p>
                <p>Bookings: {bookings.length}</p>
                <p>Selected: {selectedUser?.name || "None"}</p>
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>ITELECT4 - GT2 Part 3 | Tailwind CSS + UI Polish</p>
            <p>Jeric Lique © 2026</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;