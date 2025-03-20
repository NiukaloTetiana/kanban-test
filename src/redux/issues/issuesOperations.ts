import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { octokit } from "../../services";
import { IssuesResponse } from "../../types";

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
        return [
          ...issues.issues[repoKey].toDo,
          ...issues.issues[repoKey].inProgress,
          ...issues.issues[repoKey].done,
        ];
      }

      const { data } = await octokit.rest.issues.listForRepo({
        owner,
        repo,
        per_page: 100,
        state: "all",
      });
      return data;
    } catch (error) {
      const err = error as { response?: { status?: number } };
      if (err.response?.status === 404) {
        return rejectWithValue("The repository does not exist.");
      }

      return rejectWithValue("Failed to fetch issues.");
    }
  }
);
