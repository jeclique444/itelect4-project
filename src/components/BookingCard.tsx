// src/components/BookingCard.tsx
import type { ApiBooking } from "../types/index";
import React, { useState, useRef } from "react";

interface BookingCardProps {
  booking: ApiBooking;
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
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * -6;
    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * 6;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const handleCancel = (_e: React.MouseEvent<HTMLButtonElement>): void => {
    if (onCancel) {
      onCancel(booking);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "requested": return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";
      case "confirmed": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300";
      case "waitlisted": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "completed": return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
      case "cancelled": return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      ref={cardRef}
      className={`group relative flex h-full w-full flex-col rounded-2xl border-2 border-gray-200/80 bg-white/90 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 dark:border-gray-600/80 dark:bg-gray-800/90 dark:hover:shadow-blue-500/10 ${
        isCompact ? "p-4" : "p-6"
      } ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.02 : 1})`,
        transition: "transform 0.1s ease-out",
        transformStyle: "preserve-3d",
        overflow: "hidden",
      }}
    >
      {/* Comet Glow Effect */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 opacity-50 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 200px at ${50 + rotation.y * 2}% ${50 - rotation.x * 2}%, rgba(59, 130, 246, 0.25), rgba(139, 92, 246, 0.15), transparent 70%)`,
            transition: "background 0.05s ease-out",
          }}
        />
      )}

      {/* Background Glow */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20"></div>

      <div className="relative z-10 flex flex-1 flex-col">
        {/* Header: Booking ID + Status */}
        <div className="flex items-start justify-between gap-3">
          <h3 className={`font-bold leading-tight text-gray-900 dark:text-white ${
            isCompact ? "text-lg" : "text-2xl"
          }`}>
            Booking #{booking.id}
          </h3>
          <span className={`inline-block shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide ${getStatusClass(booking.status)}`}>
            {booking.status}
          </span>
        </div>

        {/* Divider */}
        <div className="my-3 border-t border-gray-200/70 dark:border-gray-700/70"></div>

        {/* Info Grid */}
        <div className={`grid gap-y-2.5 gap-x-4 text-gray-600 dark:text-gray-400 ${
          isCompact ? "grid-cols-2 text-sm" : "grid-cols-2 text-base"
        }`}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Session</p>
            <p className="font-medium text-gray-800 dark:text-gray-200">#{booking.sessionId}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Tutee</p>
            <p className="font-medium text-gray-800 dark:text-gray-200">#{booking.tuteeId}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Booked On</p>
            <p className="font-medium text-gray-800 dark:text-gray-200">{formatDate(booking.bookedAt)}</p>
          </div>
        </div>

        {/* Optional fields */}
        {booking.attendedAt && (
          <div className="mt-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Attended</p>
            <p className="font-medium text-emerald-600 dark:text-emerald-400">{formatDate(booking.attendedAt)}</p>
          </div>
        )}

        {booking.feedback && (
          <div className="mt-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Feedback</p>
            <p className="text-gray-700 dark:text-gray-300 italic">"{booking.feedback}"</p>
          </div>
        )}

        {booking.rating && (
          <div className="mt-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Rating</p>
            <p className="text-xl font-bold text-yellow-500">{booking.rating}/5</p>
          </div>
        )}

        {/* Children */}
        {children && <div className="mt-2">{children}</div>}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Cancel Button */}
        {onCancel && booking.status !== "cancelled" && booking.status !== "completed" && (
          <button
            onClick={handleCancel}
            className={`mt-4 w-full rounded-xl bg-gradient-to-r from-rose-500 to-red-500 px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95 dark:from-rose-600 dark:to-red-600 ${
              isCompact ? "text-sm py-2.5" : "text-base py-3.5"
            }`}
          >
            Cancel Booking
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;