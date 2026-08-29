// src/components/SubmissionBadge.tsx
import type { ApiSubmission } from "../types/index";
import React, { useState, useRef } from "react";

interface SubmissionBadgeProps {
  submission: ApiSubmission;
  children?: React.ReactNode;
}

const SubmissionBadge: React.FC<SubmissionBadgeProps> = ({ submission, children }) => {
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

  const getScoreDisplay = (score?: number) => {
    if (score === undefined || score === null) {
      return { text: "Not graded yet", className: "text-amber-600 dark:text-amber-400" };
    }
    if (score >= 90) {
      return { text: `${score}%`, className: "text-emerald-600 dark:text-emerald-400" };
    }
    if (score >= 70) {
      return { text: `${score}%`, className: "text-blue-600 dark:text-blue-400" };
    }
    return { text: `${score}%`, className: "text-rose-600 dark:text-rose-400" };
  };

  const scoreInfo = getScoreDisplay(submission.score);

  return (
    <div
      ref={cardRef}
      className="group relative flex h-full w-full flex-col rounded-2xl border-2 border-gray-200/80 bg-white/90 p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 dark:border-gray-600/80 dark:bg-gray-800/90 dark:hover:shadow-blue-500/10"
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
        {/* Header: Repo URL */}
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Repository
            </p>
            <p className="mt-1 truncate font-medium text-gray-800 dark:text-gray-200">
              {submission.repoUrl}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-3 border-t border-gray-200/70 dark:border-gray-700/70"></div>

        {/* Score Section — walang ID badge */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Score
          </p>
          <p className={`text-xl font-bold ${scoreInfo.className}`}>
            {scoreInfo.text}
          </p>
        </div>

        {/* Children */}
        {children && <div className="mt-3">{children}</div>}
      </div>
    </div>
  );
};

export default SubmissionBadge;