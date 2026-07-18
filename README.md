# ITELECT4 Project - Peer Tutoring Booking Platform

## Project Concept
A web application where students can book tutoring sessions from peer tutors. 
Tutors create sessions, students book them, and both parties can track progress 
through a complete booking lifecycle (requested → confirmed → completed).

## Tech Stack
- React 18
- TypeScript
- Vite
- CSS (for styling)

## List of Interfaces/Types Defined

### User
```typescript
interface User {
  id: string | number;       // Unique identifier
  name: string;              // Full name
  email: string;             // Email address
  role: "tutor" | "tutee" | "admin";  // User role
  isActive: boolean;         // Account status
  rating?: number;           // Optional tutor rating
  subjects?: string[];       // Optional subjects they can teach
}
```

### Session
```typescript
interface Session {
  id: number;                // Unique identifier
  tutorId: number;           // Reference to User (tutor)
  subject: string;           // Subject being taught
  description: string;       // Session details
  duration: number;          // Duration in minutes
  capacity: number;          // Max number of students
  schedule: Date;            // When the session happens
  price: number;             // Cost per session
  location: string;          // Where it happens
  status: "active" | "cancelled" | "full";  // Session status
}
```

### Booking
```typescript
interface Booking {
  id: number;                // Unique identifier
  sessionId: number;         // Reference to Session
  tuteeId: number;           // Reference to User (tutee)
  status: "requested" | "confirmed" | "waitlisted" | "completed" | "cancelled";
  bookedAt: Date;            // When booking was made
  attendedAt?: Date;         // When they attended
  feedback?: string;         // Feedback after session
  rating?: number;           // Rating given
}
```

### Type Aliases
```typescript
type ID = number;                              // Unique identifier type
type StringOrNumber = string | number;         // Flexible type
type Status = "pending" | "active" | "inactive"; // Generic status
type BookingStatus = "requested" | "confirmed" | "waitlisted" | "completed" | "cancelled";
```

### Utility Types
```typescript
type UserUpdate = Partial<User>;  // All fields optional for updates
type UserPreview = Pick<User, "id" | "name" | "role" | "rating">;  // Selected fields
type PublicUser = Omit<User, "email" | "isActive" | "subjects">;  // Excludes sensitive fields
type RoleCount = Record<"tutor" | "tutee" | "admin", number>;  // Dashboard statistics
```

### Generic Interface
```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;                          // T is a placeholder that works with any data type
  message?: string;
  timestamp?: Date;
}
```

### Generic Functions
```typescript
function getFirst<T>(items: T[]): T | undefined
function getById<T extends { id: number }>(items: T[], id: number): T | undefined
function getItemsByStatus<T extends { status: string }>(items: T[], status: string): T[]
function createApiResponse<T>(data: T, success?: boolean, message?: string): ApiResponse<T>
```

### Enums
```typescript
// Regular enum - supports reverse mapping
enum BookingStatusEnum {
  Requested = "requested",
  Confirmed = "confirmed",
  Waitlisted = "waitlisted",
  Completed = "completed",
  Cancelled = "cancelled"
}

// Const enum - inlined at compile time
const enum UserRole {
  Tutor = "tutor",
  Tutee = "tutee",
  Admin = "admin"
}

// Numeric enum - auto-incrementing values
enum SessionStatus {
  Active,      // 0
  Cancelled,   // 1
  Full         // 2
}
```

## Installation and Setup

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/jeclique444/itelect4-project.git
   cd itelect4-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the application**
   ```bash
   npm run dev
   ```


