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
  schedule: new Date("2026-07-25T14:00:00"),
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

// All users for the dropdown/selection
const allUsers: User[] = [tutor, tutee, admin];
const allSessions: Session[] = [session];
const allBookings: Booking[] = [booking];

// ========================================
// APP COMPONENT
// ========================================

function App() {
  // ===== useState<T> - Typed State =====

  // State for selected user - starts as null
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // State for sessions list - starts empty
  const [sessions, setSessions] = useState<Session[]>([]);

  // State for bookings list - starts empty
  const [bookings, setBookings] = useState<Booking[]>([]);

  // State for loading flag - starts true
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // State for search term - starts empty string
  const [searchTerm, setSearchTerm] = useState<string>("");

  // ===== useRef - Typed DOM Reference =====

  // Reference to the search input element
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ===== Custom Hooks =====

  // useToggle - for showing/hiding details
  const [showDetails, toggleDetails] = useToggle(false);

  // usePrevious - tracks previous search term
  const previousSearch = usePrevious(searchTerm);

  // ===== useEffect - Load Mock Data on Mount =====

  // Runs once when component mounts (empty dependency array)
  useEffect(() => {
    // Simulate API call with setTimeout
    const timer = setTimeout(() => {
      setSessions(allSessions);
      setBookings(allBookings);
      setIsLoading(false);
    }, 500); // 500ms delay to simulate loading

    // Cleanup timeout on unmount
    return () => clearTimeout(timer);
  }, []); // Empty array = run once on mount

  // ===== Typed Event Handler =====

  // React.ChangeEvent<HTMLInputElement> types the event
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(e.target.value);
  };

  // ===== Filtered Data =====

  // Filter sessions based on search term
  const filteredSessions = sessions.filter((s) =>
    s.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ===== Handlers for Components =====

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

  // ===== Focus Input Function =====

  const focusSearchInput = (): void => {
    searchInputRef.current?.focus();
  };

  // ===== Loading State =====

  if (isLoading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>📚 Loading Peer Tutoring Platform...</h2>
        <p>Please wait while we load your data.</p>
      </div>
    );
  }

  // ===== Render =====

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>📚 Peer Tutoring Booking Platform</h1>
      <p>GT2 Part 2 - React Hooks + State</p>

      <hr style={{ margin: "1.5rem 0" }} />

      {/* ===== Search Section ===== */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
        <input
          ref={searchInputRef}
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search sessions..."
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
            flex: 1,
            maxWidth: "400px"
          }}
        />
        <button
          onClick={focusSearchInput}
          style={{
            padding: "0.5rem 1rem",
            cursor: "pointer",
            borderRadius: "4px",
            border: "1px solid #ccc",
            backgroundColor: "#f0f0f0"
          }}
        >
          Search
        </button>
        <button
          onClick={toggleDetails}
          style={{
            padding: "0.5rem 1rem",
            cursor: "pointer",
            borderRadius: "4px",
            border: "1px solid #ccc",
            backgroundColor: showDetails ? "#e0f7fa" : "#f5f5f5"
          }}
        >
          {showDetails ? "Hide" : "Show"} Details
        </button>
      </div>

      {/* ===== Previous Search Display ===== */}
      {previousSearch !== undefined && previousSearch !== searchTerm && (
        <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "1rem" }}>
          Previous search: "{previousSearch}"
        </p>
      )}

      {/* ===== Selected User Display ===== */}
      {selectedUser && (
        <p style={{ padding: "0.5rem", backgroundColor: "#e0f7fa", borderRadius: "4px" }}>
          ✅ Selected User: {selectedUser.name} ({selectedUser.role})
        </p>
      )}

      <hr style={{ margin: "1.5rem 0" }} />

      {/* ===== Users Section ===== */}
      <h2>👤 Users</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
        {allUsers.map((user) => (
          <UserCard key={user.id} user={user} onSelect={handleSelectUser} />
        ))}
      </div>

      <hr style={{ margin: "1.5rem 0" }} />

      {/* ===== Sessions Section ===== */}
      <h2>📖 Sessions ({filteredSessions.length})</h2>
      {showDetails && (
        <p style={{ color: "#666", fontSize: "0.9rem" }}>
          💡 Showing {filteredSessions.length} session(s). Search to filter.
        </p>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
        {filteredSessions.length > 0 ? (
          filteredSessions.map((s) => (
            <SessionCard key={s.id} session={s} onBook={handleBookSession} />
          ))
        ) : (
          <p>No sessions found matching "{searchTerm}"</p>
        )}
      </div>

      <hr style={{ margin: "1.5rem 0" }} />

      {/* ===== Bookings Section ===== */}
      <h2>📝 Bookings ({bookings.length})</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
        {bookings.map((b) => (
          <BookingCard key={b.id} booking={b} onCancel={handleCancelBooking}>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>🆔 Booking #{b.id}</p>
          </BookingCard>
        ))}
      </div>

      <hr style={{ margin: "1.5rem 0" }} />

      {/* ===== Debug Info (Optional) ===== */}
      {showDetails && (
        <div style={{ backgroundColor: "#f5f5f5", padding: "1rem", borderRadius: "4px" }}>
          <h3>🔍 Debug Info</h3>
          <p><strong>Search Term:</strong> "{searchTerm}"</p>
          <p><strong>Previous Search:</strong> "{previousSearch}"</p>
          <p><strong>Sessions Count:</strong> {sessions.length}</p>
          <p><strong>Filtered Sessions:</strong> {filteredSessions.length}</p>
          <p><strong>Bookings Count:</strong> {bookings.length}</p>
          <p><strong>Selected User:</strong> {selectedUser?.name || "None"}</p>
          <p><strong>Show Details:</strong> {showDetails ? "Yes" : "No"}</p>
        </div>
      )}

      <footer style={{ textAlign: "center", color: "#666", fontSize: "0.9rem", marginTop: "2rem" }}>
        <p>ITELECT4 - GT2 Part 2 | React Hooks + State</p>
        <p>Jeric Lique © 2026</p>
      </footer>
    </div>
  );
}

export default App;