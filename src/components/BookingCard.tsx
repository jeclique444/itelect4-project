import type { ApiBooking } from "../types/index";
import React from "react";

interface BookingCardProps {
  booking: ApiBooking;                 // ✅ Changed from Booking to ApiBooking
  onCancel?: (booking: ApiBooking) => void;
  children?: React.ReactNode;
  variant?: "default" | "compact";
  className?: string;
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onCancel,
  children,
  variant = "default",
  className = ""
}) => {
  const isCompact = variant === "compact";

  const handleCancel = (_e: React.MouseEvent<HTMLButtonElement>): void => {
    if (onCancel) {
      onCancel(booking);
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case "requested": return "⏳";
      case "confirmed": return "✅";
      case "waitlisted": return "🔄";
      case "completed": return "🎉";
      case "cancelled": return "❌";
      default: return "⚪";
    }
  };

  return (
    <div className={`rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800 ${isCompact ? "p-3" : "p-5"} ${className}`}>
      <h3 className={`font-bold text-gray-900 dark:text-white ${isCompact ? "text-sm" : "text-lg"}`}>
        Booking #{booking.id}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">Session ID: {booking.sessionId}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">Tutee ID: {booking.tuteeId}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Status: {getStatusEmoji(booking.status)} {booking.status}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        📅 Booked: {new Date(booking.bookedAt).toLocaleString()}
      </p>
      {booking.attendedAt && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          ✅ Attended: {new Date(booking.attendedAt).toLocaleString()}
        </p>
      )}
      {booking.feedback && (
        <p className="text-sm text-gray-500 dark:text-gray-400">💬 Feedback: {booking.feedback}</p>
      )}
      {booking.rating && (
        <p className="text-sm text-gray-500 dark:text-gray-400">⭐ Rating: {booking.rating}/5</p>
      )}
      {children}
      {onCancel && booking.status !== "cancelled" && booking.status !== "completed" && (
        <button
          onClick={handleCancel}
          className={`mt-3 rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:bg-red-500 dark:hover:bg-red-600 ${isCompact ? "w-full text-xs" : ""}`}
        >
          Cancel Booking
        </button>
      )}
    </div>
  );
};

export default BookingCard;