import { configureStore } from "@reduxjs/toolkit";
import { describe, it, expect, vi } from "vitest";

import { octokit } from "../../services";
import { getIssues, issuesReducer } from "../../redux";
import { RootState } from "../../redux";

vi.mock("../../services", () => ({
  octokit: {
    rest: {
      issues: {
        listForRepo: vi.fn(),
      },
    },
  },
}));

const initialState: RootState = {
  issues: {
    issues: {
      "facebook/react": {
        toDo: [{ id: 1, title: "Issue 1", state: "open", assignee: null }],
        inProgress: [],
        done: [],
      },
    },
    isLoading: false,
  },
};

const store = configureStore({
  reducer: { issues: issuesReducer },
  preloadedState: initialState,
});

describe("getIssues async thunk", () => {
  it("should fetch issues successfully when repo doesn't exist in state", async () => {
    const mockData = [
      { id: 1, title: "New Issue", state: "open", assignee: null },
    ];

    (octokit.rest.issues.listForRepo as vi.Mock).mockResolvedValue({
      data: mockData,
    });

    const result = await store.dispatch(
      getIssues({ owner: "facebook", repo: "react" })
    );

    expect(result.type).toBe("issues/getIssues/fulfilled");
  });

  it("should return existing issues from state when repo is already present", async () => {
    const existingIssues = [
      { id: 1, title: "Existing Issue", state: "open", assignee: null },
    ];

    store.dispatch({
      type: "issues/getIssues/fulfilled",
      payload: existingIssues,
      meta: { arg: { owner: "facebook", repo: "react" } },
    });

    const result = await store.dispatch(
      getIssues({ owner: "facebook", repo: "react" })
    );

    expect(result.type).toBe("issues/getIssues/fulfilled");
    expect(result.payload).toEqual(existingIssues);
  });

  it("should handle 404 error when repo does not exist", async () => {
    (octokit.rest.issues.listForRepo as vi.Mock).mockRejectedValue({
      response: { status: 404 },
    });

    const result = await store.dispatch(
      getIssues({ owner: "unknown", repo: "repo" })
    );
    expect(result.type).toBe("issues/getIssues/rejected");
    expect(result.payload).toBe("The repository does not exist.");
  });

  it("should handle other errors gracefully", async () => {
    (octokit.rest.issues.listForRepo as vi.Mock).mockRejectedValue({
      response: { status: 500 },
    });

    const result = await store.dispatch(
      getIssues({ owner: "owner", repo: "react" })
    );

    expect(result.type).toBe("issues/getIssues/rejected");
    expect(result.payload).toBe("Failed to fetch issues.");
  });
});
