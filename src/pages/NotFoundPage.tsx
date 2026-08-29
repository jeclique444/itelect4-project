// src/pages/NotFoundPage.tsx
import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
      {/* Icon / Visual Element */}
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30">
        <svg
          className="h-12 w-12 text-blue-500 dark:text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* Error Code */}
      <h1 className="text-7xl font-extrabold text-gray-800 dark:text-gray-200">
        404
      </h1>

      {/* Title */}
      <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
        Page Not Found
      </h2>

      {/* Description */}
      <p className="mt-2 max-w-md text-gray-600 dark:text-gray-400">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Divider */}
      <div className="my-6 w-16 border-t border-gray-300 dark:border-gray-700"></div>

      {/* Back to Dashboard Button — consistent with other buttons */}
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 px-8 py-3.5 text-base font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95 dark:from-blue-600 dark:to-indigo-600"
      >
        <svg
          className="mr-2 h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        Back to Dashboard
      </Link>

      {/* Helpful hint */}
      <p className="mt-6 text-sm text-gray-400 dark:text-gray-500">
        If you think this is a mistake, please contact support.
      </p>
    </div>
  );
}

export default NotFoundPage;