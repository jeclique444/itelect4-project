import type { User } from "../types/index";

interface UserCardProps {
  user: User;
  onSelect?: (user: User) => void;
}

function UserCard({ user, onSelect }: UserCardProps) {
  const handleClick = (_e: React.MouseEvent<HTMLButtonElement>): void => {
    if (onSelect) {
      onSelect(user);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        {user.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Role: {user.role}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Status: {user.isActive ? "✅ Active" : "❌ Inactive"}
      </p>
      {user.rating && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Rating: ⭐ {user.rating}/5
        </p>
      )}
      {user.subjects && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Subjects: {user.subjects.join(", ")}
        </p>
      )}
      {onSelect && (
        <button
          onClick={handleClick}
          className="mt-3 rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Select User
        </button>
      )}
    </div>
  );
}

export default UserCard;