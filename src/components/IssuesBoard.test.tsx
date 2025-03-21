import { vi } from "vitest";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { IssuesBoard } from "../components";
import { store, moveIssue, reorderIssues } from "../redux";
import * as hooks from "../hooks"; // Імпортуємо ваші хуки
import { RootState } from "../redux"; // Імпортуємо тип RootState
import { Provider as UIProvider } from "../components/ui/provider";

// Мокуємо useAppSelector та useAppDispatch з правильними типами
vi.mock("../hooks", () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

describe("IssuesBoard", () => {
  it("renders columns when there are issues", () => {
    // Мокуємо значення для useAppSelector
    (hooks.useAppSelector as vi.Mock).mockReturnValueOnce({
      toDoIssues: [
        { id: 1, title: "Issue 1", state: "toDo" },
        { id: 2, title: "Issue 2", state: "toDo" },
      ],
      inProgressIssues: [{ id: 3, title: "Issue 3", state: "inProgress" }],
      doneIssues: [],
    } as RootState["issues"]);

    render(
      <BrowserRouter>
        <Provider store={store}>
          <UIProvider>
            <IssuesBoard repoKey="repo1" />{" "}
          </UIProvider>
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.queryByText("Done")).not.toBeInTheDocument();
  });

  it("shows no issues message when there are no issues", () => {
    // Мокуємо значення для useAppSelector з порожніми списками
    (hooks.useAppSelector as vi.Mock).mockReturnValueOnce({
      toDoIssues: [],
      inProgressIssues: [],
      doneIssues: [],
    } as RootState["issues"]);

    render(
      <BrowserRouter>
        <Provider store={store}>
          {" "}
          <UIProvider>
            <IssuesBoard repoKey="repo1" />{" "}
          </UIProvider>
        </Provider>
      </BrowserRouter>
    );

    expect(
      screen.getByText("🔍No searches yet... Maybe try finding some issues ?🚀")
    ).toBeInTheDocument();
  });

  describe("IssuesBoard drag and drop", () => {
    it("dispatches moveIssue when an issue is dragged to another column", async () => {
      // Мокуємо значення для useAppSelector з єдиним завданням
      (hooks.useAppSelector as vi.Mock).mockReturnValueOnce({
        toDoIssues: [{ id: 1, title: "Issue 1", state: "toDo" }],
        inProgressIssues: [],
        doneIssues: [],
      } as RootState["issues"]);

      // Мокуємо функцію useAppDispatch
      const mockDispatch = vi.fn();
      (hooks.useAppDispatch as vi.Mock).mockReturnValue(mockDispatch);

      const { getByText } = render(
        <BrowserRouter>
          <Provider store={store}>
            <UIProvider>
              <IssuesBoard repoKey="repo1" />
            </UIProvider>
          </Provider>
        </BrowserRouter>
      );

      fireEvent.dragStart(getByText("Issue 1"));
      fireEvent.drop(getByText("In Progress"));

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith(
          moveIssue({
            repoKey: "repo1",
            issueId: 1,
            targetColumn: "inProgress",
          })
        );
        expect(mockDispatch).not.toHaveBeenCalledWith(
          reorderIssues({
            repoKey: "repo1",
            columnId: "toDo",
            sourceIndex: 0,
            destinationIndex: 1,
          })
        );
      });
    });

    it("dispatches reorderIssues when an issue is reordered within the same column", async () => {
      // Мокуємо значення для useAppSelector з двома завданнями
      (hooks.useAppSelector as vi.Mock).mockReturnValueOnce({
        toDoIssues: [
          { id: 1, title: "Issue 1", state: "toDo" },
          { id: 2, title: "Issue 2", state: "toDo" },
        ],
        inProgressIssues: [],
        doneIssues: [],
      } as RootState["issues"]);

      // Мокуємо функцію useAppDispatch
      const mockDispatch = vi.fn();
      (hooks.useAppDispatch as vi.Mock).mockReturnValue(mockDispatch);

      const { getByText } = render(
        <BrowserRouter>
          <Provider store={store}>
            <UIProvider>
              <IssuesBoard repoKey="repo1" />
            </UIProvider>
          </Provider>
        </BrowserRouter>
      );

      fireEvent.dragStart(getByText("Issue 1"));
      fireEvent.drop(getByText("Issue 2"));

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith(
          reorderIssues({
            repoKey: "repo1",
            columnId: "toDo",
            sourceIndex: 0,
            destinationIndex: 1,
          })
        );
        expect(mockDispatch).not.toHaveBeenCalledWith(
          moveIssue({
            repoKey: "repo1",
            issueId: 1,
            targetColumn: "inProgress",
          })
        );
      });
    });
  });
});
