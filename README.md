# ITELECT4 Project - Peer Tutoring Booking Platform

## Project Concept
A web application where students can book tutoring sessions from peer tutors. 
Tutors create sessions, students book them, and both parties can track progress 
through a complete booking lifecycle (requested → confirmed → completed).

## Core Features
- Users can sign up as tutors or tutees
- Tutors create and manage tutoring sessions
- Students browse and book available sessions
- Booking status tracking (requested, confirmed, completed, etc.)
- Rating system for tutors after sessions
- Dashboard for managing bookings and sessions

## Entities Defined

### User
Represents anyone using the platform (tutor, tutee, or admin)
- `id`: string | number - Unique identifier
- `name`: string - Full name
- `email`: string - Email address
- `role`: "tutor" | "tutee" | "admin" - User role
- `isActive`: boolean - Account status
- `rating?`: number - Optional tutor rating
- `subjects?`: string[] - Optional subjects they can teach

### Session
Represents a tutoring session offered by a tutor
- `id`: number - Unique identifier
- `tutorId`: number - Reference to User (tutor)
- `subject`: string - Subject being taught
- `description`: string - Session details
- `duration`: number - Duration in minutes
- `capacity`: number - Max number of students
- `schedule`: Date - When the session happens
- `price`: number - Cost per session
- `location`: string - Where it happens
- `status`: "active" | "cancelled" | "full" - Session status

### Booking
Represents a booking made by a tutee for a session
- `id`: number - Unique identifier
- `sessionId`: number - Reference to Session
- `tuteeId`: number - Reference to User (tutee)
- `status`: "requested" | "confirmed" | "waitlisted" | "completed" | "cancelled" - Booking lifecycle
- `bookedAt`: Date - When booking was made
- `attendedAt?`: Date - When they attended
- `feedback?`: string - Feedback after session
- `rating?`: number - Rating given

## Generic Types

### ApiResponse<T>
Generic interface for consistent API responses:
```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;                          //T is a placeholder that works with any data type.
  message?: string;
  timestamp?: Date;
}