import { createAsyncThunk } from "@reduxjs/toolkit";

import { octokit } from "../../services";
import { IssuesResponse } from "../../types";

export const getIssues = createAsyncThunk<
  IssuesResponse,
  { owner: string; repo: string },
  { rejectValue: string }
>("issues/getIssues", async ({ owner, repo }, { rejectWithValue }) => {
  try {
    const { data } = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      per_page: 60,
      state: "all",
    });

    return data;
  } catch (error) {
    if (error instanceof Error && "status" in error && error.status === 404) {
      return rejectWithValue("The repository does not exist or has no issues.");
    }

    return rejectWithValue("Failed to fetch issues.");
  }
});
