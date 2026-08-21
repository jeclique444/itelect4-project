import type { User } from "../types/index";

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