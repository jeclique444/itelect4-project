// src/components/SessionCard.tsx
import type { Session } from "../types/index";
import { useState, useRef } from "react";

interface SessionCardProps {
  session: Session;
  onBook?: (session: Session) => void;
  variant?: "default" | "compact";
}

function SessionCard({ session, onBook, variant = "default" }: SessionCardProps) {
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

  const handleBook = (_e: React.MouseEvent<HTMLButtonElement>): void => {
    if (onBook) {
      onBook(session);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "active": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300";
      case "cancelled": return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300";
      case "full": return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  // 👇 Date format: Aug 10, 2026
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // 👇 Time range: 10:00 AM - 11:00 AM
  const formatTimeRange = (schedule: Date, duration: number): string => {
    const start = new Date(schedule);
    const end = new Date(start.getTime() + duration * 60000);

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };
    const startTime = start.toLocaleTimeString("en-US", timeOptions);
    const endTime = end.toLocaleTimeString("en-US", timeOptions);

    return `${startTime} - ${endTime}`;
  };

  return (
    <div
      ref={cardRef}
      className={`group relative flex h-full w-full flex-col rounded-2xl border-2 border-gray-200/80 bg-white/90 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 dark:border-gray-600/80 dark:bg-gray-800/90 dark:hover:shadow-blue-500/10 ${
        isCompact ? "p-5" : "p-7"
      }`}
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
        {/* Header: Subject + Status */}
        <div className="flex items-start justify-between gap-3">
          <h3 className={`font-bold leading-tight text-gray-900 dark:text-white ${
            isCompact ? "text-xl" : "text-2xl"
          }`}>
            {session.subject}
          </h3>
          <span className={`inline-block shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide ${getStatusClass(session.status)}`}>
            {session.status}
          </span>
        </div>

        {/* Description */}
        {!isCompact && (
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            {session.description}
          </p>
        )}

        {/* Divider */}
        <div className="my-4 border-t border-gray-200/70 dark:border-gray-700/70"></div>

        {/* Info Grid */}
        <div className={`grid gap-y-3 gap-x-4 text-gray-600 dark:text-gray-400 ${
          isCompact ? "grid-cols-2 text-sm" : "grid-cols-2 text-base"
        }`}>
          {/* Left Column */}
          <div className="space-y-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Tutor</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">#{session.tutorId}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Duration</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">{session.duration} min</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Capacity</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">{session.capacity} students</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Price</p>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">₱{session.price}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Schedule</p>
              <div className="font-medium text-gray-800 dark:text-gray-200 leading-tight">
                <p>{formatDate(session.schedule)}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatTimeRange(session.schedule, session.duration)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Location - Full Width */}
        <div className="mt-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Location</p>
          <p className="font-medium text-gray-800 dark:text-gray-200">{session.location}</p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Book Button */}
        {onBook && (
          <button
            onClick={handleBook}
            className={`mt-5 w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95 dark:from-blue-600 dark:to-indigo-600 ${
              isCompact ? "py-3 text-base" : "py-4 text-lg"
            }`}
          >
            Book Session
          </button>
        )}
      </div>
    </div>
  );
}

export default SessionCard;