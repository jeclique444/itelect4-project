import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import UserCard from "./UserCard";
import type { User } from "../types/index";

// Sample data base sa User interface mo
const mockUser: User = {
  id: 1,
  name: "Jeric Lique",
  email: "jeric@dlsl.edu.ph",
  role: "tutor",
  isActive: true,
  rating: 4.8,
};

describe("UserCard", () => {
  it("shows the user's name and role", () => {
    render(<UserCard user={mockUser} onSelect={() => {}} isSelected={false} />);

    // Dapat lumabas ang pangalan at role
    expect(screen.getByText("Jeric Lique")).toBeInTheDocument();
    expect(screen.getByText(/tutor/i)).toBeInTheDocument();
  });
});