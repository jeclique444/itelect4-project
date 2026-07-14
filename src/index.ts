// ========================================
// IMPORTS
// ========================================

// Import types only (removed at compile time)
// These are used for type checking only
import type {
  User,
  Session,
  Booking,
  ApiResponse,
  UserUpdate,
  UserPreview,
  PublicUser,
  RoleCount
} from "../types/index";

// Import actual values (exist at runtime)
// These include enums, functions, etc.
import {
  BookingStatusEnum,
  UserRole,
  SessionStatus,
  getFirst,
  getById,
  getItemsByStatus,
  createApiResponse
} from "../types/index";

// ========================================
// PRIMITIVE TYPE ANNOTATIONS
// ========================================

// Basic TypeScript types - explicit annotations
const appName: string = "Peer Tutoring Platform";  // string type
const currentYear: number = 2026;                   // number type
const isProduction: boolean = false;                // boolean type
const nothing: null = null;                        // null type
const notSet: undefined = undefined;               // undefined type

// Function with typed parameters and return type
// Parameters must be strings, return must be string
function greet(name: string, year: number): string {
  return `Welcome to ${appName} -- AY ${year}!`;
}

// Void function - returns nothing
function logMessage(message: string): void {
  console.log(message);
}

// Call the function
logMessage(greet(appName, currentYear));

// ========================================
// CREATE SAMPLE DATA
// ========================================

// Create a tutor using the User interface
// TypeScript checks that all required fields are present
const tutor: User = {
  id: 1,
  name: "Jeric Lique",                      
  email: "jeric_lique@dlsl.com",           
  role: "tutor",                    // Must be one of: tutor, tutee, admin
  isActive: true,
  rating: 4.8,                      // Optional field
  subjects: ["Mathematics", "Physics"] // Optional array
};

// Create a tutee user
const tutee: User = {
  id: 2,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "tutee",
  isActive: true
};

// Create an admin user
const admin: User = {
  id: 3,
  name: "Admin User",
  email: "admin@example.com",
  role: "admin",
  isActive: true
};

// Create a sample session
const session: Session = {
  id: 1,
  tutorId: 1,                       // Reference to tutor's id
  subject: "Mathematics",
  description: "Advanced Calculus tutoring session",
  duration: 60,                     // 60 minutes
  capacity: 5,                      // Max 5 students
  schedule: new Date("2026-07-15T14:00:00"),
  price: 500,                       // ₱500 per session
  location: "Library Room MB 301",  //room sa 301
  status: "active"                  // Currently active
};

// Create a sample booking
const booking: Booking = {
  id: 1,
  sessionId: 1,                     // Reference to session
  tuteeId: 2,                       // Reference to tutee
  status: "requested",              // Initial status
  bookedAt: new Date()
};

// ========================================
// USING GENERIC FUNCTIONS
// ========================================

// Generic function works with User array
// TypeScript infers T as User automatically
const firstUser = getFirst<User>([tutor, tutee, admin]);
console.log("First user:", firstUser?.name);

// getById requires types with 'id' field
// TypeScript ensures User has id: number
const foundTutor = getById<User>([tutor, tutee, admin], 1);
console.log("Found tutor:", foundTutor?.name);

// getItemsByStatus requires types with 'status' field
// Session has status, so this works
const activeSessions = getItemsByStatus<Session>([session], "active");
console.log("Active sessions:", activeSessions.length);

// ========================================
// USING API RESPONSE INTERFACE
// ========================================

// Create API responses with different data types
// ApiResponse<User> - response wraps a User
const userResponse = createApiResponse<User>(tutor, true, "User fetched");

// ApiResponse<Session[]> - response wraps an array of Sessions
const sessionsResponse = createApiResponse<Session[]>([session], true, "Sessions fetched");

console.log("User response:", userResponse.data.name);
console.log("Sessions response:", sessionsResponse.data[0]?.subject);
console.log("Timestamp:", userResponse.timestamp);

// ========================================
// USING UTILITY TYPES
// ========================================

// Utility Type 1: Partial<T>
// Update payload - only needs changed fields
// Here we only update name and rating, email stays the same
const updateData: UserUpdate = { 
  name: "Jeric Lique",             
  rating: 4.9 
};

// Utility Type 2: Pick<T, K>
// Preview - only essential fields
// Good for list views where you don't need all data
const userPreview: UserPreview = { 
  id: tutor.id, 
  name: tutor.name, 
  role: tutor.role, 
  rating: tutor.rating 
};

// Utility Type 3: Omit<T, K>
// Public profile - hide sensitive fields
// Good for displaying to other users
const publicProfile: PublicUser = { 
  id: tutor.id, 
  name: tutor.name, 
  role: tutor.role 
};

// Utility Type 4: Record<K, T>
// Dashboard statistics
// Forces exactly these 3 keys with number values
const roleStats: RoleCount = { 
  tutor: 15, 
  tutee: 120, 
  admin: 3 
};

console.log("User update:", updateData);
console.log("User preview:", userPreview);
console.log("Public profile:", publicProfile);
console.log("Role statistics:", roleStats);

// Utility Type 5: ReturnType<T>
// Infer return type from a function
// This avoids duplicating the type definition
function getSessionWithBookings(sessionId: number) {
  const sessionFound = { ...session };
  const bookings = [booking];
  return {
    session: sessionFound,
    bookings: bookings,
    totalBookings: bookings.length,
    availableSlots: session.capacity - bookings.length
  };
}

// TypeScript automatically infers the return type
type SessionWithBookings = ReturnType<typeof getSessionWithBookings>;
const sessionDetails: SessionWithBookings = getSessionWithBookings(1);
console.log("Session details:", sessionDetails);

// ========================================
// USING ENUMS
// ========================================

// ENUM 1: Regular Enum - supports reverse mapping
// You can get the name from the value
let bookingStatus: BookingStatusEnum = BookingStatusEnum.Requested; 
console.log("Booking status:", bookingStatus);
console.log("Enum value used:", BookingStatusEnum.Requested);

// Update status - enum values are type-safe
bookingStatus = BookingStatusEnum.Confirmed;
console.log("Updated status:", bookingStatus);

// ENUM 2: Const Enum - inlined at compile time
// More performant, but no reverse mapping
const userRole: UserRole = UserRole.Tutor;
console.log("User role:", userRole); // "tutor"

// ENUM 3: Numeric Enum - auto-incrementing values
let sessionStatus: SessionStatus = SessionStatus.Active;
console.log("Session status:", sessionStatus); // 0
console.log("Status name:", SessionStatus[0]); // "Active"

// ========================================
// TYPE NARROWING
// ========================================

// Type narrowing helps TypeScript understand the type
// The function accepts string or BookingStatusEnum
// Inside the if/else, TypeScript knows the exact type
function processBookingStatus(status: string | BookingStatusEnum): string {
  if (typeof status === "string") {
    // TypeScript knows: status is a string here
    return `String status: ${status}`;
  }
  // TypeScript knows: status is BookingStatusEnum here
  return `Enum status: ${BookingStatusEnum[status]}`;
}

console.log(processBookingStatus("pending"));
console.log(processBookingStatus(BookingStatusEnum.Completed));

// ========================================
// INTERSECTION TYPES
// ========================================

// Combine two types using &
// Here we combine User with an additional property
type TutorWithAverageRating = User & { averageRating: number };

// Create a new object that has all User fields + averageRating
const topTutor: TutorWithAverageRating = {
  ...tutor,              // Spread all User fields
  averageRating: 4.8    // Add the extra property
};

console.log("Top tutor:", topTutor);

// ========================================
// RUN THE APP
// ========================================

console.log("\n--- App Summary ---");
console.log(`Total users: ${roleStats.tutor + roleStats.tutee + roleStats.admin}`);
console.log(`First user: ${firstUser?.name}`);
console.log(`Active sessions: ${activeSessions.length}`);
console.log(`Booking status: ${bookingStatus}`);
console.log("\n--- App Running Successfully ---");