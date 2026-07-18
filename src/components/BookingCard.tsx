// Import the Booking type and React for ReactNode
import type { Booking } from "../types/index";
import React from "react";

/**
 * BookingCardProps Interface
 * 
 * @property booking - The Booking object to display (required)
 * @property onCancel - Optional callback to cancel booking
 * @property children - React children (for wrapping content)
 * 
 * children?: React.ReactNode allows passing content between tags
 * Example: <BookingCard><p>Extra info</p></BookingCard>
 */
interface BookingCardProps {
  booking: Booking;
  onCancel?: (booking: Booking) => void;
  children?: React.ReactNode;          // For wrapping child components
}

/**
 * BookingCard Component
 * Uses React.FC (Function Component) syntax
 * 
 * React.FC<BookingCardProps> automatically:
 * - Types the return value as JSX
 * - Adds implicit children prop
 * 
 * This component demonstrates:
 * 1. React.FC syntax
 * 2. children prop handling
 * 3. Multiple conditionals in rendering
 * 4. Destructuring props in function signature
 */
const BookingCard: React.FC<BookingCardProps> = ({ booking, onCancel, children }) => {
  /**
   * handleCancel - Typed event handler
   * React.MouseEvent<HTMLButtonElement> - click event on button
   * 
   * Prevents cancellation if booking is already cancelled or completed
   */
  const handleCancel = (_e: React.MouseEvent<HTMLButtonElement>): void => {
  if (onCancel) {
    onCancel(booking);
  }
};

  /**
   * getStatusEmoji - Helper function
   * Maps status to appropriate emoji
   * 
   * Switch statement ensures all status values are handled
   * Default case handles any unexpected values
   */
  const getStatusEmoji = (status: string) => {
    switch (status) {
      case "requested": return "⏳";      // Clock - waiting
      case "confirmed": return "✅";       // Check - approved
      case "waitlisted": return "🔄";     // Refresh - on waitlist
      case "completed": return "🎉";      // Celebration - done
      case "cancelled": return "❌";      // X - cancelled
      default: return "⚪";               // Unknown status
    }
  };

  /**
   * JSX Return with Complex Conditional Rendering
   * 
   * {children} - Renders any child elements passed between tags
   * 
   * Cancel button only shows if:
   * 1. onCancel exists (prop passed from parent)
   * 2. Booking is NOT cancelled
   * 3. Booking is NOT completed
   * 
   * This prevents cancelling already finished bookings
   */
  return (
    <div className="booking-card" style={{ border: "1px solid #ccc", padding: "1rem", margin: "0.5rem 0", borderRadius: "8px" }}>
      <h3>Booking #{booking.id}</h3>
      <p>Session ID: {booking.sessionId}</p>
      <p>Tutee ID: {booking.tuteeId}</p>
      <p>Status: {getStatusEmoji(booking.status)} {booking.status}</p>
      <p>📅 Booked: {new Date(booking.bookedAt).toLocaleString()}</p>
      {booking.attendedAt && <p>✅ Attended: {new Date(booking.attendedAt).toLocaleString()}</p>}
      {booking.feedback && <p>💬 Feedback: {booking.feedback}</p>}
      {booking.rating && <p>⭐ Rating: {booking.rating}/5</p>}
      {children}  {/* Renders any child components */}
      {onCancel && booking.status !== "cancelled" && booking.status !== "completed" && (
        <button onClick={handleCancel} style={{ padding: "0.5rem 1rem", cursor: "pointer", backgroundColor: "#ff4444", color: "white", border: "none", borderRadius: "4px" }}>
          Cancel Booking
        </button>
      )}
    </div>
  );
};

export default BookingCard;