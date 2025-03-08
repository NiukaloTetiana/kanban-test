import { createSlice } from "@reduxjs/toolkit";

import { IssuesResponse } from "../../types";
import { getIssues } from "./issuesOperations";

export interface IIssuesSlice {
  issues: {
    toDo: IssuesResponse;
    inProgress: IssuesResponse;
    done: IssuesResponse;
  };
  isLoading: boolean;
}

const initialState: IIssuesSlice = {
  issues: { toDo: [], inProgress: [], done: [] },
  isLoading: false,
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    reorderIssues: (state, action) => {
      const { columnId, sourceIndex, destinationIndex } = action.payload;

      if (!(columnId in state.issues)) return;
      const column = state.issues[columnId as keyof typeof state.issues];
      const updatedIssues = [...column];
      const [movedItem] = updatedIssues.splice(sourceIndex, 1);
      updatedIssues.splice(destinationIndex, 0, movedItem);

      state.issues[columnId as keyof typeof state.issues] = updatedIssues;
    },
    moveIssue: (state, action) => {
      const { source, destination } = action.payload;
      if (!destination) return;

      const sourceColumnKey = source.droppableId as keyof typeof state.issues;
      const destColumnKey =
        destination.droppableId as keyof typeof state.issues;

      if (
        !(sourceColumnKey in state.issues) ||
        !(destColumnKey in state.issues)
      )
        return;

      const sourceColumn = state.issues[sourceColumnKey];
      const destColumn = state.issues[destColumnKey];
      const [movedIssue] = sourceColumn.splice(source.index, 1);

      destColumn.splice(destination.index, 0, movedIssue);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIssues.fulfilled, (state, action) => {
        state.issues.toDo = action.payload.filter(
          (issue) => issue.state === "open" && issue.assignee === null
        );
        state.issues.inProgress = action.payload.filter(
          (issue) => issue.state === "open" && issue.assignee !== null
        );
        state.issues.done = action.payload.filter(
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
    selectToDo: (state) => state.issues.toDo,
    selectInProgress: (state) => state.issues.inProgress,
    selectDone: (state) => state.issues.done,
    selectIsLoading: (state) => state.isLoading,
  },
});

export const issuesReducer = issuesSlice.reducer;
export const { selectToDo, selectInProgress, selectDone, selectIsLoading } =
  issuesSlice.selectors;
export const { reorderIssues, moveIssue } = issuesSlice.actions;
