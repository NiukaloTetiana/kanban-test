import { vi } from "vitest";
import { Provider } from "react-redux";
import { toast } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { Provider as UIProvider } from "./ui/provider";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { SearchBar } from "../components";

import { store } from "../redux";

const mockDispatch = vi.fn(() => ({
  unwrap: vi.fn().mockResolvedValue([]),
}));

vi.mock("../hooks", () => ({
  useAppDispatch: () => mockDispatch,
}));

vi.mock("react-toastify", () => ({
  toast: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../redux/actions", () => ({
  getIssues: vi.fn(() => ({
    unwrap: vi.fn().mockResolvedValue([]),
  })),
}));

describe("SearchBar", () => {
  it("dispatches the correct action when the input is valid", async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <UIProvider>
            <SearchBar />
          </UIProvider>
        </Provider>
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText("Enter repo URL");
    const button = screen.getByRole("button", { name: /Load issues/i });

    fireEvent.change(input, {
      target: { value: "https://github.com/octocat/Hello-World" },
    });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    });

    await waitFor(
      () => {
        expect(mockDispatch).toHaveBeenCalledTimes(1);
      },
      { timeout: 3000 }
    );
  });
});

it("calls toast.info when the input is empty", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <UIProvider>
          <SearchBar />
        </UIProvider>
      </Provider>
    </BrowserRouter>
  );

  const button = screen.getByRole("button", { name: /Load issues/i });
  fireEvent.click(button);

  waitFor(() => {
    expect(toast.info).toHaveBeenCalledWith(
      "Hey, don't forget to enter a repo URL🙈"
    );
  });
});

it("shows an error message when the input is invalid", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <UIProvider>
          <SearchBar />
        </UIProvider>
      </Provider>
    </BrowserRouter>
  );

  const input = screen.getByPlaceholderText("Enter repo URL");
  fireEvent.change(input, { target: { value: "invalid-url" } });

  expect(
    screen.getByText(/Please enter a valid GitHub repository URL/i)
  ).toBeInTheDocument();
});

it("does not allow submission if the input is invalid", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <UIProvider>
          <SearchBar />
        </UIProvider>
      </Provider>
    </BrowserRouter>
  );

  const input = screen.getByPlaceholderText("Enter repo URL");
  const button = screen.getByRole("button", { name: /Load issues/i });

  fireEvent.change(input, { target: { value: "invalid-url" } });
  expect(button).toBeDisabled();
});
