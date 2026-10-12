import type { ApiSession, NewSession, ApiCourse, AuthReply, ApiUser } from "../types/index";
import useAuthStore from "../store/authStore";

// Vite only exposes variables whose name starts with VITE_, and it
// replaces this at BUILD time -- the value that was in .env when
// `npm run build` ran is baked into the bundle.
export const API_URL = import.meta.env.VITE_API_URL;

// The same guard db.ts has for MONGODB_URI, for the same reason: a
// sentence now beats every call going to "undefined/api/sessions".
if (!API_URL) {
  throw new Error(
    "VITE_API_URL is missing. Copy .env.example to .env, fill it in, " +
      "and restart npm run dev.",
  );
}

// Every call goes through here: the host, the JSON header, the token
// when there is one, and the API's own message when it refuses.
async function request<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = useAuthStore.getState().token;

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `Request failed (${res.status})`);
  }

  return res.json();
}

// ---- courses: public. request() sends no token, and none is needed.

export function fetchCourses(): Promise<ApiCourse[]> {
  return request<ApiCourse[]>("/api/courses");
}

export function fetchCourseByCode(code: string): Promise<ApiCourse> {
  return request<ApiCourse>(`/api/courses/${code}`);
}

// ---- sessions: private. The token goes on automatically.

export function fetchSessions(): Promise<ApiSession[]> {
  return request<ApiSession[]>("/api/sessions");
}

export function fetchSessionById(id: string): Promise<ApiSession> {
  return request<ApiSession>(`/api/sessions/${id}`);
}

export function createSession(newSession: NewSession): Promise<ApiSession> {
  return request<ApiSession>("/api/sessions", {
    method: "POST",
    body: JSON.stringify(newSession),
  });
}

// ---- auth: the two routes that make a session exist

export function registerUser(body: {
  name: string;
  email: string;
  password: string;
}): Promise<ApiUser> {
  return request<ApiUser>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function loginUser(body: {
  email: string;
  password: string;
}): Promise<AuthReply> {
  return request<AuthReply>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}