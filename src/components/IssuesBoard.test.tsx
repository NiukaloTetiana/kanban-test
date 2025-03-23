// import { vi } from "vitest";
// import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// import { IssuesBoard } from "../components";
// import * as hooks from "../hooks";
// import { Provider as UIProvider } from "../components/ui/provider";
// import { store, moveIssue, reorderIssues, RootState } from "../redux";

// vi.mock("../hooks", () => ({
//   useAppSelector: vi.fn(),
//   useAppDispatch: vi.fn(),
// }));

// describe("IssuesBoard", () => {
//   it("renders columns when there are issues", async () => {
//     (hooks.useAppSelector as vi.Mock).mockReturnValueOnce({
//       toDoIssues: [
//         { id: 1, title: "Issue 1", state: "toDo" },
//         { id: 2, title: "Issue 2", state: "toDo" },
//       ],
//       inProgressIssues: [{ id: 3, title: "Issue 3", state: "inProgress" }],
//       doneIssues: [],
//     } as RootState["issues"]);

//     render(
//       <BrowserRouter>
//         <Provider store={store}>
//           <UIProvider>
//             <IssuesBoard repoKey="repo1" />
//           </UIProvider>
//         </Provider>
//       </BrowserRouter>
//     );

//     expect(screen.getByText(/No searches yet.../i)).toBeInTheDocument();
//     expect(screen.queryByText(/To Do/i)).toBeNull();
//   });

//   it("shows no issues message when there are no issues", () => {
//     (hooks.useAppSelector as vi.Mock).mockReturnValueOnce({
//       toDoIssues: [],
//       inProgressIssues: [],
//       doneIssues: [],
//     } as RootState["issues"]);

//     render(
//       <BrowserRouter>
//         <Provider store={store}>
//           <UIProvider>
//             <IssuesBoard repoKey="repo1" />{" "}
//           </UIProvider>
//         </Provider>
//       </BrowserRouter>
//     );

//     expect(
//       screen.getByText("🔍No searches yet... Maybe try finding some issues ?🚀")
//     ).toBeInTheDocument();
//   });

//   //   it("dispatches moveIssue when an issue is dragged to another column", async () => {
//   //     (hooks.useAppSelector as vi.Mock).mockReturnValueOnce({
//   //       toDoIssues: [{ id: 1, title: "Issue 1", state: "toDo" }],
//   //       inProgressIssues: [],
//   //       doneIssues: [],
//   //     } as RootState["issues"]);

//   //     const mockDispatch = vi.fn();
//   //     (hooks.useAppDispatch as vi.Mock).mockReturnValue(mockDispatch);

//   //     const { findByText, findByRole } = render(
//   //       <BrowserRouter>
//   //         <Provider store={store}>
//   //           <UIProvider>
//   //             <IssuesBoard repoKey="repo1" />
//   //           </UIProvider>
//   //         </Provider>
//   //       </BrowserRouter>
//   //     );

//   //     // Перевіряємо, що "Issue 1" відображається
//   //     const issue = await findByText(/Issue 1/i);
//   //     expect(issue).toBeInTheDocument();

//   //     // Виконання drag and drop
//   //     fireEvent.dragStart(issue);

//   //     // Перевіряємо, що колонка "In Progress" відображається
//   //     const inProgressColumn = await findByText(/In Progress/i);
//   //     fireEvent.drop(inProgressColumn);

//   //     // Перевірка, чи викликано dispatch
//   //     await waitFor(() =>
//   //       expect(mockDispatch).toHaveBeenCalledWith(
//   //         expect.objectContaining({
//   //           type: "issues/moveIssue", // Заміни на правильний тип дії у твоєму додатку
//   //           payload: { id: 1, from: "toDo", to: "inProgress" }, // Це також може залежати від твоєї логіки
//   //         })
//   //       )
//   //     );
//   //   });
//   //   it("dispatches reorderIssues when an issue is reordered within the same column", async () => {
//   //     (hooks.useAppSelector as vi.Mock).mockReturnValueOnce({
//   //       toDoIssues: [
//   //         { id: 1, title: "Issue 1", state: "toDo" },
//   //         { id: 2, title: "Issue 2", state: "toDo" },
//   //       ],
//   //       inProgressIssues: [],
//   //       doneIssues: [],
//   //     } as RootState["issues"]);

//   //     const mockDispatch = vi.fn();
//   //     (hooks.useAppDispatch as vi.Mock).mockReturnValue(mockDispatch);

//   //     const { findByTestId } = render(
//   //       <BrowserRouter>
//   //         <Provider store={store}>
//   //           <UIProvider>
//   //             <IssuesBoard repoKey="repo1" />
//   //           </UIProvider>
//   //         </Provider>
//   //       </BrowserRouter>
//   //     );

//   //     // Очікуємо на наявність елементів
//   //     const issue1 = await findByTestId("issue-1");
//   //     const issue2 = await findByTestId("issue-2");

//   //     // Виконання drag and drop
//   //     fireEvent.dragStart(issue1);
//   //     fireEvent.drop(issue2);

//   //     await waitFor(() => {
//   //       expect(mockDispatch).toHaveBeenCalledWith(
//   //         reorderIssues({
//   //           repo: "repo1",
//   //           columnId: "toDo",
//   //           sourceIndex: 0,
//   //           destinationIndex: 1,
//   //         })
//   //       );
//   //       expect(mockDispatch).not.toHaveBeenCalledWith(moveIssue({}));
//   //     });
//   //   });
// });
