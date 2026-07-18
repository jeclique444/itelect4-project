// ========================================
// INTERFACES - Core Entities
// ========================================

// INTERFACE 1: User
// Represents anyone using the platform (tutor, tutee, or admin)
// This is our main user entity with all necessary fields
export interface User {
  id: number;              // Unique identifier 
  name: string;                     // Full name of the user
  email: string;                    // Email address for login/notifications
  role: "tutor" | "tutee" | "admin"; // Literal union - only these 3 roles allowed
  isActive: boolean;                // Account status (active/inactive)
  rating?: number;                  // Optional - tutor rating (1-5 stars)
  subjects?: string[];              // Optional - subjects the tutor can teach
}

// INTERFACE 2: Session
// Represents a tutoring session offered by a tutor
// This entity has a status lifecycle (active → full/cancelled)
export interface Session {
  id: number;                       // Unique identifier
  tutorId: number;                  // Reference to User (who is teaching)
  subject: string;                  // Subject being taught (e.g., "Mathematics")
  description: string;              // Detailed description of the session
  duration: number;                 // Duration in minutes
  capacity: number;                 // Maximum number of students allowed
  schedule: Date;                   // When the session happens (date/time)
  price: number;                    // Cost per session in PHP
  location: string;                 // Where the session takes place
  status: "active" | "cancelled" | "full"; // Current session status
}

// INTERFACE 3: Booking
// Represents a booking made by a tutee for a specific session
// This entity has a complete status lifecycle:
// requested → confirmed → completed (or waitlisted/cancelled)
export interface Booking {
  id: number;                       // Unique identifier
  sessionId: number;                // Reference to Session being booked
  tuteeId: number;                  // Reference to User (who is booking)
  status: "requested" | "confirmed" | "waitlisted" | "completed" | "cancelled";
  bookedAt: Date;                   // When the booking was made
  attendedAt?: Date;                // Optional - when they attended
  feedback?: string;                // Optional - feedback after session
  rating?: number;                  // Optional - rating given to tutor (1-5)
}

// ========================================
// TYPE ALIASES
// ========================================

// Type aliases make complex types easier to use and reuse
export type ID = number;                    // Flexible ID type
export type StringOrNumber = string | number;        // Union type for flexibility
export type Status = "pending" | "active" | "inactive"; // Generic status
export type BookingStatus = "requested" | "confirmed" | "waitlisted" | "completed" | "cancelled";

// ========================================
// UTILITY TYPES
// ========================================

// Utility Type 1: Partial<T>
// Makes all fields optional - perfect for update payloads
// Instead of sending all fields, you only send what changed
export type UserUpdate = Partial<User>;

// Utility Type 2: Pick<T, K>
// Creates a new type with only selected fields
// Useful for previews/lists where you don't need all data
export type UserPreview = Pick<User, "id" | "name" | "role" | "rating">;

// Utility Type 3: Omit<T, K>
// Creates a new type by excluding fields
// Useful for public profiles (hide sensitive data like email)
export type PublicUser = Omit<User, "email" | "isActive" | "subjects">;

// Utility Type 4: Record<K, T>
// Maps specific keys to the same value type
// Perfect for dashboard statistics or counts
export type RoleCount = Record<"tutor" | "tutee" | "admin", number>;

// ========================================
// GENERIC INTERFACE
// ========================================

// Generic Interface: ApiResponse<T>
// A reusable interface that works with ANY data type
// T is a placeholder - it becomes whatever type you specify
// This ensures consistent API responses across your entire app
export interface ApiResponse<T> {
  success: boolean;                 // Did the operation succeed?
  data: T;                          // The actual data (any type)
  message?: string;                 // Optional success/error message
  timestamp?: Date;                 // Optional timestamp
}

// ========================================
// GENERIC FUNCTIONS
// ========================================

// Generic Function 1: getFirst<T>
// Works with any array type
// T is inferred from whatever array you pass in
// Returns the first element or undefined if array is empty
export function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

// Generic Function 2: getById<T>
// Constrained generic - T must have an "id" field
// This ensures only types with 'id' can use this function
// Returns the item with matching id or undefined
export function getById<T extends { id: number }>(
  items: T[],
  id: number
): T | undefined {
  return items.find((item) => item.id === id);
}

// Generic Function 3: getItemsByStatus<T>
// Constrained generic - T must have a "status" field
// Filters items by their status
// Useful for getting active sessions, pending bookings, etc.
export function getItemsByStatus<T extends { status: string }>(
  items: T[],
  status: string
): T[] {
  return items.filter((item) => item.status === status);
}

// Generic Function 4: createApiResponse<T>
// A factory function that creates consistent API responses
// Automatically adds a timestamp
// Can be used for any data type
export function createApiResponse<T>(
  data: T,
  success: boolean = true,
  message?: string
): ApiResponse<T> {
  return {
    success,
    data,
    message,
    timestamp: new Date()
  };
}

// ========================================
// ENUMS
// ========================================

// ENUM 1: Regular Enum - BookingStatusEnum
// Exists at runtime - can be used for reverse mapping
// Reverse mapping: BookingStatusEnum["requested"] returns "Requested"
// Useful when you need to loop through values or display names
export enum BookingStatusEnum {
  Requested = "requested",
  Confirmed = "confirmed",
  Waitlisted = "waitlisted",
  Completed = "completed",
  Cancelled = "cancelled"
}

// ENUM 2: Const Enum - UserRole
// Inlined at compile time - zero runtime overhead
// More performant for simple values
// Cannot be reverse mapped (no UserRole["tutor"])
export const enum UserRole {
  Tutor = "tutor",
  Tutee = "tutee",
  Admin = "admin"
}

// ENUM 3: Numeric Enum - SessionStatus
// Auto-increments from 0: Active=0, Cancelled=1, Full=2
// Supports reverse mapping: SessionStatus[0] returns "Active"
export enum SessionStatus {
  Active,      // 0
  Cancelled,   // 1
  Full         // 2
}