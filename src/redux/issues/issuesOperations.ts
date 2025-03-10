import { createAsyncThunk } from "@reduxjs/toolkit";

import { octokit } from "../../services";
import { IssuesResponse } from "../../types";
import { RootState } from "../store";

export const getIssues = createAsyncThunk<
  IssuesResponse,
  { owner: string; repo: string },
  { rejectValue: string; state: RootState }
>(
  "issues/getIssues",
  async ({ owner, repo }, { rejectWithValue, getState }) => {
    try {
      const { issues } = getState();
      const repoKey = `${owner}/${repo}`;

      if (issues.issues[repoKey]) {
        return issues.issues[repoKey].toDo
          .concat(issues.issues[repoKey].inProgress)
          .concat(issues.issues[repoKey].done);
      }

      const { data } = await octokit.rest.issues.listForRepo({
        owner,
        repo,
        per_page: 100,
        state: "all",
      });

      return data;
    } catch (error) {
      if (error instanceof Error && "status" in error && error.status === 404) {
        return rejectWithValue(
          "The repository does not exist or has no issues."
        );
      }

      return rejectWithValue("Failed to fetch issues.");
    }
  }
);
