// ========================================
// INTERFACES - Core Entities
// ========================================

// INTERFACE 1: User
// Represents anyone using the platform (tutor, tutee, or admin)
export interface User {
  id: number;                        // Unique identifier
  name: string;                      // Full name of the user
  email: string;                     // Email address for login/notifications
  role: "tutor" | "tutee" | "admin"; // Literal union - only these 3 roles allowed
  isActive: boolean;                 // Account status (active/inactive)
  rating?: number;                   // Optional - tutor rating (1-5 stars)
  subjects?: string[];               // Optional - subjects the tutor can teach
}

// INTERFACE 2: Session
// Represents a tutoring session offered by a tutor
export interface Session {
  id: number;                       // Unique identifier
  tutorId: number;                  // Reference to User (who is teaching)
  subject: string;                  // Subject being taught
  description: string;              // Detailed description
  duration: number;                 // Duration in minutes
  capacity: number;                 // Maximum number of students allowed
  schedule: Date;                   // When the session happens
  price: number;                    // Cost per session in PHP
  location: string;                 // Where the session takes place
  status: "active" | "cancelled" | "full"; // Current session status
}

// INTERFACE 3: Booking
// Represents a booking made by a tutee for a specific session
export interface Booking {
  id: number;
  sessionId: number;
  tuteeId: number;
  status: "requested" | "confirmed" | "waitlisted" | "completed" | "cancelled";
  bookedAt: Date;
  attendedAt?: Date;
  feedback?: string;
  rating?: number;
}

// ========================================
// TYPE ALIASES
// ========================================

export type ID = number;
export type StringOrNumber = string | number;
export type Status = "pending" | "active" | "inactive";
export type BookingStatus = "requested" | "confirmed" | "waitlisted" | "completed" | "cancelled";

// ========================================
// UTILITY TYPES
// ========================================

export type UserUpdate = Partial<User>;
export type UserPreview = Pick<User, "id" | "name" | "role" | "rating">;
export type PublicUser = Omit<User, "email" | "isActive" | "subjects">;
export type RoleCount = Record<"tutor" | "tutee" | "admin", number>;

// ========================================
// GENERIC INTERFACE
// ========================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp?: Date;
}

// ========================================
// GENERIC FUNCTIONS
// ========================================

export function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

export function getById<T extends { id: number }>(
  items: T[],
  id: number
): T | undefined {
  return items.find((item) => item.id === id);
}

export function getItemsByStatus<T extends { status: string }>(
  items: T[],
  status: string
): T[] {
  return items.filter((item) => item.status === status);
}

export function createApiResponse<T>(
  data: T,
  success: boolean = true,
  message?: string
): ApiResponse<T> {
  return {
    success,
    data,
    message,
    timestamp: new Date(),
  };
}

// ========================================
// ENUMS
// ========================================

export enum BookingStatusEnum {
  Requested = "requested",
  Confirmed = "confirmed",
  Waitlisted = "waitlisted",
  Completed = "completed",
  Cancelled = "cancelled",
}

export const enum UserRole {
  Tutor = "tutor",
  Tutee = "tutee",
  Admin = "admin",
}

export enum SessionStatus {
  Active,      // 0
  Cancelled,   // 1
  Full,        // 2
}

// ========================================
// API TYPES - for data from itelect4-backend
// ========================================

// JSON has no Date type, and MongoDB sends ObjectIds as
// 24-character hex strings. These types represent what the API
// actually returns.

// ApiSession - Session as returned by the API
// 'id' and 'tutorId' become strings (Mongo _id), 'schedule' becomes string
export type ApiSession = Omit<Session, "id" | "tutorId" | "schedule"> & {
  id: string;
  tutorId: string;
  schedule: string;
};

// NewSession - what we SEND when creating a new session.
// tutorId comes off the token, so it is not in the body.
// schedule is a Date from the form (backend will store it).
export type NewSession = Pick<
  Session,
  "subject" | "description" | "duration" | "capacity" | "schedule" | "price" | "location"
>;

// ApiBooking - Booking as returned by the API
export type ApiBooking = Omit<Booking, "id" | "sessionId" | "tuteeId" | "bookedAt"> & {
  id: string;
  sessionId: string;
  tuteeId: string;
  bookedAt: string;
};

// NewBooking - what we send when creating a booking
export type NewBooking = Omit<ApiBooking, "id" | "bookedAt">;

// ========================================
// COURSE & SUBMISSION TYPES
// ========================================

// Course - reference data. The backend has no id field for a course;
// the code IS its identity.
export interface Course {
  code: string;
  title: string;
  units: number;
  semester: string;
}

// ApiCourse - course as returned by the API (identical to Course)
export type ApiCourse = Course;

// Submission - legacy from Session 7-8. Kept for the SubmissionsPage
// that still imports it, but not wired to any live route.
export interface Submission {
  id: number;
  studentId: number;
  courseCode: string;
  repoUrl: string;
  submittedAt: Date;
  score?: number;
}

export type ApiSubmission = Omit<Submission, "id" | "studentId" | "submittedAt"> & {
  id: string;
  studentId: string;
  submittedAt: string;
};

export type NewSubmission = Pick<Submission, "courseCode" | "repoUrl">;

// ========================================
// AUTH TYPES - for /api/auth/register + /api/auth/login
// ========================================

// What /api/auth/register sends back, and what sits inside the
// login reply. Session 1 said id was a number because there was no
// database to number the rows.
export type ApiUser = Omit<User, "id"> & {
  id: string;
};

// What /api/auth/login sends back. The token is the string that goes
// in the Authorization header on every request after this one.
export interface AuthReply {
  token: string;
  user: ApiUser;
}