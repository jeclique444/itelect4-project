// Import the Session type from our types folder
import type { Session } from "../types/index";

/**
 * SessionCardProps Interface
 * Defines the props for the SessionCard component
 * 
 * @property session - The Session object to display (required)
 * @property onBook - Optional callback when session is booked
 */
interface SessionCardProps {
  session: Session;
  onBook?: (session: Session) => void;    // Optional callback
}

/**
 * SessionCard Component
 * Displays tutoring session information with booking functionality
 * 
 * This component demonstrates:
 * 1. Typed props with Session interface
 * 2. Helper function for status display
 * 3. Typed event handler
 * 4. Date formatting with toLocaleString()
 */
function SessionCard({ session, onBook }: SessionCardProps) {
  /**
   * handleBook - Typed event handler for booking
   * React.MouseEvent<HTMLButtonElement> ensures type safety
   * 
   * e parameter is typed to the exact event type
   * The function returns void (no return value)
   */
  const handleBook = (_e: React.MouseEvent<HTMLButtonElement>): void => {
  if (onBook) {
    onBook(session);
  }
};

  /**
   * getStatusColor - Helper function
   * Returns an emoji based on session status
   * This is a pure function - same input always gives same output
   * 
   * switch statement handles all possible status values
   */
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "🟢";      // Green - available
      case "cancelled": return "🔴";    // Red - cancelled
      case "full": return "🟡";        // Yellow - full capacity
      default: return "⚪";            // White - unknown status
    }
  };

  /**
   * JSX Return
   * Demonstrates:
   * - Function call in JSX: {getStatusColor(session.status)}
   * - Date formatting: new Date(session.schedule).toLocaleString()
   * - Conditional rendering: only show onBook if it exists
   */
  return (
    <div className="session-card" style={{ border: "1px solid #ccc", padding: "1rem", margin: "0.5rem 0", borderRadius: "8px" }}>
      <h3>{session.subject}</h3>
      <p>{session.description}</p>
      <p>📚 {session.subject} - {session.duration} mins</p>
      <p>👨‍🏫 Tutor ID: {session.tutorId}</p>
      <p>📅 {new Date(session.schedule).toLocaleString()}</p>
      <p>📍 {session.location}</p>
      <p>💰 ₱{session.price}</p>
      <p>👥 Capacity: {session.capacity} students</p>
      <p>Status: {getStatusColor(session.status)} {session.status}</p>
      {onBook && (
        <button onClick={handleBook} style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>
          Book Session
        </button>
      )}
    </div>
  );
}

export default SessionCard;