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
  reducers: {},
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
