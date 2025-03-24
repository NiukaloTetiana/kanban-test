import { vi } from "vitest";
import { act } from "react";
import { Provider } from "react-redux";
// import { DndProvider } from "react-dnd";
import { BrowserRouter } from "react-router-dom";
// import { HTML5Backend } from "react-dnd-html5-backend";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { IssuesBoard } from "../components";

import * as hooks from "../hooks";
import { store, moveIssue, reorderIssues, RootState } from "../redux";
import { mockIssues } from "../constants";
import { Provider as UIProvider } from "../components/ui/provider";

vi.mock("../hooks", () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

describe("IssuesBoard", () => {
  it("renders columns when there are issues", async () => {
    vi.mocked(hooks.useAppSelector).mockImplementation((selector) => {
      const mockState = {
        issues: {
          issues: {
            repo1: {
              toDo: mockIssues,
              inProgress: [],
              done: [],
            },
          },
          isLoading: false,
        },
      };

      return selector(mockState as unknown as RootState);
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <UIProvider>
            <IssuesBoard repoKey="repo1" />
          </UIProvider>
        </Provider>
      </BrowserRouter>
    );
    expect(
      screen.queryByText(
        "🔍No searches yet... Maybe try finding some issues ?🚀"
      )
    ).not.toBeInTheDocument();

    expect(screen.queryByText("To Do"));
    expect(screen.queryByText("In Progress"));
    expect(screen.queryByText("Done"));
  });

  it("shows no issues message when there are no issues", () => {
    vi.mocked(hooks.useAppSelector).mockReturnValue([]);

    render(
      <BrowserRouter>
        <Provider store={store}>
          <UIProvider>
            <IssuesBoard repoKey="repo1" />
          </UIProvider>
        </Provider>
      </BrowserRouter>
    );

    expect(
      screen.getByText("🔍No searches yet... Maybe try finding some issues ?🚀")
    ).toBeInTheDocument();
  });

  it("dispatches reorderIssues when an issue is reordered within the same column", async () => {
    vi.mocked(hooks.useAppSelector).mockImplementation((selector) => {
      const mockState = {
        issues: {
          issues: {
            repo1: {
              toDo: mockIssues,
              inProgress: [],
              done: [],
            },
          },
          isLoading: false,
        },
      };

      return selector(mockState as unknown as RootState);
    });

    const mockDispatch = vi.fn();
    vi.mocked(hooks.useAppDispatch).mockReturnValue(mockDispatch);

    const { findByTestId, findByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <UIProvider>
            <IssuesBoard repoKey="repo1" />
          </UIProvider>
        </Provider>
      </BrowserRouter>
    );

    const issue = await findByTestId("Fix login bug");
    const toDoColumn = await findByText("To Do");

    expect(toDoColumn).toBeInTheDocument();

    await act(async () => {
      fireEvent.mouseDown(issue);
      fireEvent.mouseMove(issue, { clientX: 200, clientY: 50 });
      fireEvent.mouseUp(toDoColumn);
    });

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        reorderIssues({
          repo: "repo1",
          columnId: "toDo",
          sourceIndex: 0,
          destinationIndex: 0,
        })
      );
      expect(mockDispatch).not.toHaveBeenCalledWith(moveIssue({}));
    });
  });
});

//  it("dispatches moveIssue when an issue is dragged to another column", async () => {
//     vi.mocked(hooks.useAppSelector).mockImplementation((selector) => {
//       const mockState = {
//         issues: {
//           issues: {
//             repo1: {
//               toDo: mockIssues,
//               inProgress: [
//                 {
//                   id: 3,
//                   title: "Issue 3",
//                   status: "inProgress",
//                   created_at: "2025-06-11T16:02:44Z",
//                   updated_at: "2025-06-11T16:02:44Z",
//                 },
//               ],
//               done: [],
//             },
//           },
//           isLoading: false,
//         },
//       };

//       return selector(mockState as unknown as RootState);
//     });

//     const mockDispatch = vi.fn();
//     vi.mocked(hooks.useAppDispatch).mockReturnValue(mockDispatch);

//     const { findByTestId, findByText } = render(
//       <BrowserRouter>
//         <Provider store={store}>
//           <UIProvider>
//             <DndProvider backend={HTML5Backend}>
//               <IssuesBoard repoKey="repo1" />
//             </DndProvider>
//           </UIProvider>
//         </Provider>
//       </BrowserRouter>
//     );

//     const issue = await findByTestId("Issue 3");
//     const toDoColumn = await findByText("To Do");
//     const inProgressColumn = await findByText("In Progress");

//     await waitFor(() => {
//       expect(toDoColumn).toBeInTheDocument();
//       expect(inProgressColumn).toBeInTheDocument();
//     });

//     const inProgressList = await findByTestId("inProgress");
//     const toDoList = await findByTestId("toDo");
//     expect(inProgressList).toBeInTheDocument();
//     expect(toDoList).toBeInTheDocument();

//     const { top, left, width, height } = toDoList.getBoundingClientRect();
//     const targetX = left + width / 2;
//     const targetY = top + height / 2;
//     await act(async () => {
//       fireEvent.mouseDown(issue);
//       fireEvent.mouseMove(issue, {
//         clientX: targetX + 50,
//         clientY: targetY + 50,
//       });
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       fireEvent.dragEnter(toDoList);
//       fireEvent.dragOver(toDoList);
//       fireEvent.mouseUp(toDoList);
//     });

//     await waitFor(() => {
//       expect(mockDispatch).toHaveBeenCalledWith(
//         moveIssue({
//           repo: "repo1",
//           source: { index: 0, droppableId: "inProgress" },
//           destination: { index: 0, droppableId: "toDo" },
//         })
//       );
//     });
//   });
