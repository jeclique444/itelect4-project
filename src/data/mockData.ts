import type { User, Session, Booking } from "../types/index";

export const tutor: User = {
  id: 1,
  name: "Jeric Lique",
  email: "jeric_lique@dlsl.com",
  role: "tutor",
  isActive: true,
  rating: 4.8,
  subjects: ["Mathematics", "Physics", "Programming"]
};

export const tutee: User = {
  id: 2,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "tutee",
  isActive: true
};

export const admin: User = {
  id: 3,
  name: "Admin User",
  email: "admin@example.com",
  role: "admin",
  isActive: true
};

export const allUsers: User[] = [tutor, tutee, admin];

export const allSessions: Session[] = [
  {
    id: 1,
    tutorId: 1,
    subject: "Mathematics",
    description: "Advanced Calculus tutoring session",
    duration: 60,
    capacity: 5,
    schedule: new Date("2026-08-01T14:00:00"),
    price: 500,
    location: "Library Room MB 301",
    status: "active"
  }
];

export const allBookings: Booking[] = [
  {
    id: 1,
    sessionId: 1,
    tuteeId: 2,
    status: "requested",
    bookedAt: new Date()
  }
];