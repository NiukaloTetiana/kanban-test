import { vi } from "vitest";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Provider as UIProvider } from "./ui/provider";
import { render, screen } from "@testing-library/react";

import { App } from "../components";

import { useAppSelector } from "../hooks";
import { store } from "../redux";
import { mockIssues } from "../constants";

vi.mock("../hooks", async () => {
  const actual = await import("../hooks");
  return {
    ...actual,
    useAppSelector: vi.fn(() => false),
  };
});

vi.mock("../helpers", async () => {
  const actual = await import("../helpers");
  return {
    ...actual,
    getRepoInfo: vi.fn(() => ({ owner: "test-owner", repo: "test-repo" })),
  };
});

describe("App component", () => {
  it("renders SearchBar, Links, and IssuesBoard", () => {
    vi.mocked(useAppSelector).mockImplementation(() => {
      return mockIssues;
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <UIProvider>
            <App />
          </UIProvider>
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByRole("searchbox")).toBeInTheDocument();
    expect(screen.getByTestId("links")).toBeInTheDocument();
    expect(screen.getByTestId("issues-board")).toBeInTheDocument();
  });

  it("shows Loader when isLoading is true", () => {
    vi.mocked(useAppSelector).mockReturnValueOnce(true);

    render(
      <BrowserRouter>
        <Provider store={store}>
          <UIProvider>
            <App />
          </UIProvider>
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("updates repoKey based on searchParams", () => {
    const testQuery = "test-owner/test-repo";
    window.history.pushState({}, "Test page", `/?query=${testQuery}`);

    render(
      <BrowserRouter>
        <Provider store={store}>
          <UIProvider>
            <App />
          </UIProvider>
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByTestId("links")).toHaveAttribute(
      "data-repokey",
      "test-owner/test-repo"
    );
    expect(screen.getByTestId("issues-board")).toHaveAttribute(
      "data-repokey",
      "test-owner/test-repo"
    );
  });
});
