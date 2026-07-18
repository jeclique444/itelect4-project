/**
 * App.tsx - Main Application Component
 * 
 * This component:
 * 1. Imports all three typed components
 * 2. Creates mock data using GT1 interfaces
 * 3. Uses useState for state management
 * 4. Defines callback functions with typed parameters
 * 5. Renders all components with event handlers
 */

// React useState hook for state management
import { useState } from "react";

// Import our typed components
import UserCard from "./components/UserCard";
import SessionCard from "./components/SessionCard";
import BookingCard from "./components/BookingCard";

// Import types from our types folder
import type { User, Session, Booking } from "./types/index";

// ========================================
// MOCK DATA
// ========================================

/**
 * Mock data created using the User interface
 * This simulates data from an API or database
 * All fields match the interface requirements
 */
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

/**
 * Mock session data
 * Uses Session interface
 * Schedule is set to a future date
 */
const session: Session = {
  id: 1,
  tutorId: 1,
  subject: "Mathematics",
  description: "Advanced Calculus tutoring session",
  duration: 60,
  capacity: 5,
  schedule: new Date("2026-07-20T14:00:00"),
  price: 500,
  location: "Library Room MB 301",
  status: "active"
};

/**
 * Mock booking data
 * Uses Booking interface
 * Initial status is "requested"
 */
const booking: Booking = {
  id: 1,
  sessionId: 1,
  tuteeId: 2,
  status: "requested",
  bookedAt: new Date()
};

// ========================================
// APP COMPONENT
// ========================================

/**
 * App Component
 * The root component that renders everything
 * 
 * Uses useState for three pieces of state:
 * 1. selectedUser - tracks which user is selected
 * 2. selectedSession - tracks which session is selected
 * 3. bookings - array of bookings (can be updated)
 * 
 * Callback functions:
 * - handleSelectUser: Updates selectedUser when a user is selected
 * - handleBookSession: Shows alert and updates selectedSession
 * - handleCancelBooking: Updates booking status to "cancelled"
 */
function App() {
  // State declarations with explicit types
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([booking]);

  /**
   * handleSelectUser - Typed callback for UserCard
   * @param user - The selected User object
   * 
   * This function:
   * 1. Updates the state with selected user
   * 2. Logs to console for debugging
   */
  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    console.log("Selected user:", user.name);
  };

  /**
   * handleBookSession - Typed callback for SessionCard
   * @param session - The selected Session object
   * 
   * This function:
   * 1. Updates the state with selected session
   * 2. Shows an alert to confirm booking
   * 3. Logs to console for debugging
   */
  const handleBookSession = (session: Session) => {
    setSelectedSession(session);
    console.log("Booking session:", session.subject);
    alert(`Booking session: ${session.subject} at ${session.location}`);
  };

  /**
   * handleCancelBooking - Typed callback for BookingCard
   * @param booking - The Booking to cancel
   * 
   * This function:
   * 1. Creates a new array with the booking status changed to "cancelled"
   * 2. Updates the bookings state
   * 3. Shows an alert to confirm cancellation
   * 4. Logs to console for debugging
   * 
   * Uses array.map() to create a new array (immutable update)
   * The 'as const' assertion ensures TypeScript treats it as a literal
   */
  const handleCancelBooking = (booking: Booking) => {
    const updatedBookings = bookings.map((b) =>
      b.id === booking.id ? { ...b, status: "cancelled" as const } : b
    );
    setBookings(updatedBookings);
    console.log("Cancelled booking:", booking.id);
    alert(`Booking #${booking.id} cancelled!`);
  };

  /**
   * JSX Return
   * 
   * The component renders:
   * 1. Header with app title
   * 2. UserCards section with 3 users
   * 3. Selected user feedback
   * 4. SessionCard section with 1 session
   * 5. Selected session feedback
   * 6. BookingCard section with bookings
   * 7. Footer
   * 
   * Grid layout using CSS Grid:
   * - repeat(auto-fit, minmax(300px, 1fr)) - responsive cards
   * - Each card takes at least 300px
   */
  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>📚 Peer Tutoring Booking Platform</h1>
      <p>GT2 Part 1 - React + TypeScript Components</p>

      <hr style={{ margin: "2rem 0" }} />

      <h2>👤 Users</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
        <UserCard user={tutor} onSelect={handleSelectUser} />
        <UserCard user={tutee} onSelect={handleSelectUser} />
        <UserCard user={admin} onSelect={handleSelectUser} />
      </div>

      {selectedUser && (
        <p style={{ marginTop: "1rem", padding: "0.5rem", backgroundColor: "#e0f7fa", borderRadius: "4px" }}>
          ✅ Selected: {selectedUser.name} ({selectedUser.role})
        </p>
      )}

      <hr style={{ margin: "2rem 0" }} />

      <h2>📖 Sessions</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
        <SessionCard session={session} onBook={handleBookSession} />
      </div>

      {selectedSession && (
        <p style={{ marginTop: "1rem", padding: "0.5rem", backgroundColor: "#fff3e0", borderRadius: "4px" }}>
          📖 Selected Session: {selectedSession.subject}
        </p>
      )}

      <hr style={{ margin: "2rem 0" }} />

      <h2>📝 Bookings</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
        {bookings.map((b) => (
          <BookingCard key={b.id} booking={b} onCancel={handleCancelBooking}>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>🆔 Booking #{b.id}</p>
          </BookingCard>
        ))}
      </div>

      <hr style={{ margin: "2rem 0" }} />

      <footer style={{ textAlign: "center", color: "#666", fontSize: "0.9rem" }}>
        <p>ITELECT4 - GT2 Part 1 | React + TypeScript Components</p>
        <p>Jeric Lique © 2026</p>
      </footer>
    </div>
  );
}

export default App;