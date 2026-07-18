// Import the User type from our types folder
// 'import type' is used for TypeScript types only (removed at compile time)
import type { User } from "../types/index";

/**
 * UserCardProps Interface
 * Defines the shape of props this component accepts
 * 
 * @property user - The User object to display (required)
 * @property onSelect - Optional callback function when user is selected
 */
interface UserCardProps {
  user: User;
  onSelect?: (user: User) => void;    // Optional callback prop
}

/**
 * UserCard Component
 * A reusable component that displays user information
 * 
 * @param props - UserCardProps
 * @returns JSX element
 * 
 * This component demonstrates:
 * 1. Typed props using an interface
 * 2. Optional callback prop (onSelect)
 * 3. Typed event handler (React.MouseEvent)
 * 4. Conditional rendering (rating, subjects, button)
 */
function UserCard({ user, onSelect }: UserCardProps) {
  /**
   * handleClick - Typed event handler
   * React.MouseEvent<HTMLButtonElement> types the click event
   * The generic <HTMLButtonElement> specifies the exact element type
   * 
   * e: React.MouseEvent<HTMLButtonElement> - e is the event object
   * :void - function doesn't return anything
   */
  const handleClick = (_e: React.MouseEvent<HTMLButtonElement>): void => {
  if (onSelect) {
    onSelect(user);
  }
};

  /**
   * JSX Return
   * Inline styles are used for simplicity (will be replaced with Tailwind later)
   * 
   * Conditional rendering examples:
   * - {user.rating && <p>...</p>} - Only shows if rating exists
   * - {user.subjects && <p>...</p>} - Only shows if subjects exist
   * - {onSelect && <button>...</button>} - Only shows if onSelect exists
   */
  return (
    <div className="user-card" style={{ border: "1px solid #ccc", padding: "1rem", margin: "0.5rem 0", borderRadius: "8px" }}>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Status: {user.isActive ? "✅ Active" : "❌ Inactive"}</p>
      {user.rating && <p>Rating: ⭐ {user.rating}/5</p>}
      {user.subjects && <p>Subjects: {user.subjects.join(", ")}</p>}
      {onSelect && (
        <button onClick={handleClick} style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>
          Select User
        </button>
      )}
    </div>
  );
}

export default UserCard;