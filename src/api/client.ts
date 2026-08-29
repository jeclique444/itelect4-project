import type { ApiSession, NewSession, ApiBooking, NewBooking, ApiCourse, ApiSubmission, NewSubmission } from "../types/index";


const API_URL = "http://localhost:3001";

// ========================================
// SESSIONS API
// ========================================

export async function fetchSessions(): Promise<ApiSession[]> {
  const res = await fetch(`${API_URL}/sessions`);
  if (!res.ok) {
    throw new Error("Could not load sessions");
  }
  return res.json();
}

export async function fetchSessionById(id: string): Promise<ApiSession> {
  const res = await fetch(`${API_URL}/sessions/${id}`);
  if (!res.ok) {
    throw new Error(`Could not load session with id ${id}`);
  }
  return res.json();
}

export async function createSession(newSession: NewSession): Promise<ApiSession> {
  const res = await fetch(`${API_URL}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newSession),
  });
  if (!res.ok) {
    throw new Error("Could not save the session");
  }
  return res.json();
}

// ========================================
// BOOKINGS API
// ========================================

export async function fetchBookings(): Promise<ApiBooking[]> {
  const res = await fetch(`${API_URL}/bookings`);
  if (!res.ok) {
    throw new Error("Could not load bookings");
  }
  return res.json();
}

export async function createBooking(newBooking: NewBooking): Promise<ApiBooking> {
  const res = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newBooking),
  });
  if (!res.ok) {
    throw new Error("Could not save the booking");
  }
  return res.json();
}

  // ========================================
// COURSES API
// ========================================

export async function fetchCourses(): Promise<ApiCourse[]> {
  const res = await fetch(`${API_URL}/courses`);
  if (!res.ok) {
    throw new Error("Could not load courses");
  }
  return res.json();
}

// ========================================
// SUBMISSIONS API
// ========================================

export async function fetchSubmissions(): Promise<ApiSubmission[]> {
  const res = await fetch(`${API_URL}/submissions`);
  if (!res.ok) {
    throw new Error("Could not load submissions");
  }
  return res.json();
}

export async function createSubmission(
  newSubmission: NewSubmission
): Promise<ApiSubmission> {
  const res = await fetch(`${API_URL}/submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newSubmission),
  });
  if (!res.ok) {
    throw new Error("Could not save the submission");
  }
  return res.json();
}