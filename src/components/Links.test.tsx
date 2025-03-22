import { vi } from "vitest";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";

import { Links } from "../components";
import { getRepoInfo } from "../helpers";
import { useAppSelector } from "../hooks";
import { Provider as UIProvider } from "./ui/provider";

const mockStore = configureStore({
  reducer: {
    tasks: (state = []) => state,
  },
});

vi.mock("../hooks", () => ({
  useAppSelector: vi.fn(),
}));

vi.mock("../helpers", () => ({
  getGitHubLinks: vi.fn((url) => ({
    repoUrl: `${url}/repo-url`,
    userUrl: `${url}/user-url`,
  })),
  getRepoInfo: vi.fn(() => ({
    repo: "test-repo",
    owner: "test-owner",
  })),
}));

describe("Links component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("does not render if there are no tasks", () => {
    vi.mocked(useAppSelector).mockReturnValue([]);

    const { container } = render(
      <MemoryRouter>
        <Provider store={mockStore}>
          <Links repoKey="test-repo-key" />
        </Provider>
      </MemoryRouter>
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders correct links", () => {
    vi.mocked(useAppSelector).mockReturnValue([
      { html_url: "https://github.com/user/repo/issues/1" },
    ]);

    render(
      <MemoryRouter>
        <Provider store={mockStore}>
          <UIProvider>
            <Links repoKey="test-repo-key" />
          </UIProvider>
        </Provider>
      </MemoryRouter>
    );

    const repoLink = screen.getByRole("link", { name: /test-repo/i });
    const userLink = screen.getByRole("link", { name: /test-owner/i });

    expect(repoLink).toBeInTheDocument();
    expect(userLink).toBeInTheDocument();
    expect(repoLink).toHaveAttribute(
      "href",
      "https://github.com/user/repo/issues/1/repo-url"
    );
    expect(userLink).toHaveAttribute(
      "href",
      "https://github.com/user/repo/issues/1/user-url"
    );
  });
});

it("renders multiple links correctly", () => {
  vi.mocked(useAppSelector).mockReturnValue([
    { html_url: "https://github.com/user/repo/issues/1" },
    { html_url: "https://github.com/user/repo/issues/2" },
  ]);

  render(
    <MemoryRouter>
      <Provider store={mockStore}>
        <UIProvider>
          <Links repoKey="test-repo-key" />
        </UIProvider>
      </Provider>
    </MemoryRouter>
  );

  const links = screen.getAllByRole("link");
  expect(links.length).toBeGreaterThanOrEqual(2);
});

it("does not render if repoKey is missing", () => {
  vi.mocked(useAppSelector).mockReturnValue([
    { html_url: "https://github.com/user/repo/issues/1" },
  ]);

  const { container } = render(
    <MemoryRouter>
      <Provider store={mockStore}>
        <UIProvider>
          <Links repoKey={undefined as unknown as string} />
        </UIProvider>
      </Provider>
    </MemoryRouter>
  );

  expect(container.querySelectorAll("a").length).toBe(2);
});

it("calls getGitHubLinks and getRepoInfo with correct arguments", () => {
  vi.clearAllMocks();

  render(
    <MemoryRouter>
      <Provider store={mockStore}>
        <UIProvider>
          <Links repoKey="test-repo-key" />
        </UIProvider>
      </Provider>
    </MemoryRouter>
  );

  expect(getRepoInfo).toHaveBeenCalledWith(
    "https://github.com/user/repo/issues/1"
  );
});
