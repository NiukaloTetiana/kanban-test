import { createSelector, createSlice } from "@reduxjs/toolkit";

import { IssuesResponse } from "../../types";
import { getIssues } from "./issuesOperations";

export interface IIssuesSlice {
  issues: Record<
    string,
    {
      toDo: IssuesResponse;
      inProgress: IssuesResponse;
      done: IssuesResponse;
    }
  >;
  isLoading: boolean;
}

const initialState: IIssuesSlice = {
  issues: {},
  isLoading: false,
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    reorderIssues: (state, action) => {
      const { repo, columnId, sourceIndex, destinationIndex } = action.payload;

      if (!state.issues[repo] || !(columnId in state.issues[repo])) return;

      const columnKey = columnId as keyof (typeof state.issues)[string];

      const column = state.issues[repo][columnKey];
      const updatedIssues = [...column];
      const [movedItem] = updatedIssues.splice(sourceIndex, 1);
      updatedIssues.splice(destinationIndex, 0, movedItem);

      state.issues[repo][columnKey] = updatedIssues;
    },
    moveIssue: (state, action) => {
      const { repo, source, destination } = action.payload;
      if (!destination || !state.issues[repo]) return;

      const sourceColumnKey =
        source.droppableId as keyof IIssuesSlice["issues"][string];
      const destColumnKey =
        destination.droppableId as keyof IIssuesSlice["issues"][string];

      if (
        !(sourceColumnKey in state.issues[repo]) ||
        !(destColumnKey in state.issues[repo])
      ) {
        return;
      }

      const sourceColumn = state.issues[repo][sourceColumnKey];
      const destColumn = state.issues[repo][destColumnKey];

      const [movedIssue] = sourceColumn.splice(source.index, 1);
      destColumn.splice(destination.index, 0, movedIssue);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIssues.fulfilled, (state, action) => {
        const repoKey = action.meta.arg.owner + "/" + action.meta.arg.repo;

        if (!action.payload.length) {
          if (!state.issues[repoKey]) {
            state.issues[repoKey] = { toDo: [], inProgress: [], done: [] };
          }
          state.isLoading = false;
          return;
        }

        state.issues[repoKey] = { toDo: [], inProgress: [], done: [] };

        state.issues[repoKey].toDo = action.payload.filter(
          (issue) => issue.state === "open" && issue.assignee === null
        );
        state.issues[repoKey].inProgress = action.payload.filter(
          (issue) => issue.state === "open" && issue.assignee !== null
        );
        state.issues[repoKey].done = action.payload.filter(
          (issue) => issue.state === "closed"
        );

        state.isLoading = false;
      })
      .addCase(getIssues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIssues.rejected, (state) => {
        state.isLoading = false;
      });
  },
  selectors: {
    selectIssues: (state) => state.issues.toDo,
    selectIsLoading: (state) => state.isLoading,
  },
});

export const selectIssuesByRepoAndColumn = (
  repoKey: string,
  column: keyof IIssuesSlice["issues"][string]
) => {
  return createSelector(
    [
      (state: { issues: IIssuesSlice }) =>
        state.issues.issues[repoKey]?.[column],
    ],
    (issues) => {
      return issues ? [...issues] : [];
    }
  );
};

export const issuesReducer = issuesSlice.reducer;
export const { selectIssues, selectIsLoading } = issuesSlice.selectors;
export const { reorderIssues, moveIssue } = issuesSlice.actions;

export type IssuesState = ReturnType<typeof issuesReducer>;
