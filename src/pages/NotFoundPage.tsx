import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="text-center">
      <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        🚫 404 - Page Not Found
      </h2>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
      >
        Go back to Dashboard
      </Link>
    </div>
  );
}

export default NotFoundPage;