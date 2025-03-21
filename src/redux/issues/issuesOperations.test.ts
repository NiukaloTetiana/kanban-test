import { describe, it, expect, vi } from "vitest";

import { octokit } from "../../services";
import { getIssues, store } from "../../redux";
import { mockIssues } from "../../constants";

vi.mock("../../services", () => ({
  octokit: {
    rest: {
      issues: {
        listForRepo: vi.fn(),
      },
    },
  },
}));

describe("getIssues async thunk", () => {
  it("should fetch issues successfully when repo doesn't exist in state", async () => {
    vi.mocked(octokit.rest.issues.listForRepo).mockResolvedValue({
      data: mockIssues,
      headers: {},
      status: 200,
      url: "https://api.github.com/repos/facebook/react/issues",
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
    vi.mocked(octokit.rest.issues.listForRepo).mockRejectedValue({
      response: { status: 404 },
    });

    const result = await store.dispatch(
      getIssues({ owner: "unknown", repo: "repo" })
    );
    expect(result.type).toBe("issues/getIssues/rejected");
    expect(result.payload).toBe("The repository does not exist.");
  });

  it("should handle other errors gracefully", async () => {
    vi.mocked(octokit.rest.issues.listForRepo).mockRejectedValue({
      response: { status: 500 },
    });

    const result = await store.dispatch(
      getIssues({ owner: "owner", repo: "react" })
    );

    expect(result.type).toBe("issues/getIssues/rejected");
    expect(result.payload).toBe("Failed to fetch issues.");
  });
});
