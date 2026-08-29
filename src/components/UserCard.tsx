// src/components/UserCard.tsx
import type { User } from "../types/index";
import { useState, useRef } from "react";

interface UserCardProps {
  user: User;
  onSelect?: (user: User) => void;
  isSelected?: boolean;
}

function UserCard({ user, onSelect, isSelected = false }: UserCardProps) {
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

  const handleClick = (_e: React.MouseEvent<HTMLButtonElement>): void => {
    if (onSelect) {
      onSelect(user);
    }
  };

  const buttonClasses = isSelected
    ? "bg-black dark:bg-white text-white dark:text-black shadow-lg"
    : "bg-gradient-to-r from-blue-400 to-indigo-400 text-white dark:from-blue-500 dark:to-indigo-500 shadow-md";

  return (
    <div
      ref={cardRef}
      className={`group relative flex h-full min-h-[360px] w-full flex-col rounded-2xl border-2 p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10 ${
        isSelected
          ? "border-blue-500 dark:border-white"
          : "border-gray-300 dark:border-gray-600"
      } ${isSelected ? "bg-blue-50/90 dark:bg-gray-700/90" : "bg-white/80 dark:bg-gray-800/80"}`}
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
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 opacity-50 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 150px at ${50 + rotation.y * 2}% ${50 - rotation.x * 2}%, rgba(59, 130, 246, 0.4), rgba(139, 92, 246, 0.2), transparent 70%)`,
            transition: "background 0.05s ease-out",
          }}
        />
      )}

      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30"></div>

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.name}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">{user.email}</p>
          </div>
          <span className={`inline-flex h-3.5 w-3.5 rounded-full ${user.isActive ? "bg-green-500" : "bg-red-400"}`} />
        </div>

        <p className="mt-3 text-lg">
          <span className="font-medium text-gray-700 dark:text-gray-300">Role:</span>
          <span className="ml-1 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            {user.role}
          </span>
        </p>

        <p className="text-lg text-gray-600 dark:text-gray-400">
          Status: {user.isActive ? "Active" : "Inactive"}
        </p>

        {user.rating && (
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Rating: <span className="font-bold text-yellow-500 text-xl">{user.rating}/5</span>
          </p>
        )}

        {user.subjects && (
          <div className="mt-3 flex flex-wrap gap-2">
            {user.subjects.map((subject) => (
              <span
                key={subject}
                className="rounded-full bg-indigo-100 px-3.5 py-1.5 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
              >
                {subject}
              </span>
            ))}
          </div>
        )}

        <div className="flex-1" />

        {onSelect && (
          <button
            onClick={handleClick}
            className={`mt-6 w-full rounded-xl px-6 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 ${buttonClasses}`}
          >
            {isSelected ? "Selected" : "Select User"}
          </button>
        )}
      </div>
    </div>
  );
}

export default UserCard;