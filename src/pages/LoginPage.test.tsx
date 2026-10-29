import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./LoginPage";

function renderLoginPage() {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  });
  
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("LoginPage", () => {
  it("shows validation messages when empty", async () => {
    const user = userEvent.setup();
    renderLoginPage();

    await user.click(screen.getByRole("button", { name: /log in/i }));

    // 👇 Ito ang inayos natin para tumugma sa Zod schema mo 👇
    expect(
      await screen.findByText(/That is not an email address/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/at least 8 characters/i)
    ).toBeInTheDocument();
  });

  it("sends nothing to the API while invalid", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const user = userEvent.setup();
    renderLoginPage();

    await user.type(screen.getByLabelText(/email/i), "test@dlsl.edu.ph");
    await user.type(screen.getByLabelText(/password/i), "short");
    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(
      await screen.findByText(/at least 8 characters/i)
    ).toBeInTheDocument();
    
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});