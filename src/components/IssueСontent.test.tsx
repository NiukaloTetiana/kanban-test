import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Provider } from "../components/ui/provider";

import { IssueContent } from "../components";
import { mockIssues } from "../constants";

describe("IssueContent Component", () => {
  const renderWithProviders = (component: React.ReactNode) => {
    return render(<Provider>{component}</Provider>);
  };

  it("renders issue title", () => {
    renderWithProviders(<IssueContent issue={mockIssues[0]} />);
    expect(screen.getByText("Fix login bug")).toBeInTheDocument();
  });

  it("displays issue number", () => {
    renderWithProviders(<IssueContent issue={mockIssues[0]} />);
    expect(screen.getByText("#1")).toBeInTheDocument();
  });

  it("formats created_at date", () => {
    renderWithProviders(<IssueContent issue={mockIssues[0]} />);
    const dateText = document.querySelector("p.css-0");
    expect(dateText).toHaveTextContent(/opened about? \d+ (days|year) ago/i);
  });

  it("displays user login", () => {
    renderWithProviders(<IssueContent issue={mockIssues[0]} />);
    expect(screen.getByText("john_doe | Comments: 5")).toBeInTheDocument();
  });

  it("handles zero comments correctly", () => {
    renderWithProviders(
      <IssueContent issue={{ ...mockIssues[0], comments: 0 }} />
    );
    expect(
      screen.getByText("john_doe | Comments: no comments yet")
    ).toBeInTheDocument();
  });
});
