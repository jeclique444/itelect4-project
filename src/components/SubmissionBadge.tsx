// src/components/SubmissionBadge.tsx
import type { ApiSubmission } from "../types/index";
import React from "react";

interface SubmissionBadgeProps {
  submission: ApiSubmission;
  children?: React.ReactNode;
}

const SubmissionBadge: React.FC<SubmissionBadgeProps> = ({ submission, children }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <p className="text-gray-900 dark:text-white">Repo: {submission.repoUrl}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Score: {submission.score ?? "Not graded yet"}
      </p>
      {children}
    </div>
  );
};

export default SubmissionBadge;