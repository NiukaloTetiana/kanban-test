import { describe, it, expect } from "vitest";

import { issuesReducer, getIssues } from "../../redux";

const initialState = {
  issues: {},
  isLoading: false,
};

describe("issuesReducer", () => {
  it("should return the initial state for an unknown action", () => {
    const action = { type: "DUMMY_ACTION" };
    expect(issuesReducer(undefined, action)).toEqual(initialState);
  });

  it("should set isLoading to true when pending", () => {
    const action = { type: getIssues.pending.type };
    const state = issuesReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it("should handle the fulfilled action and save issue data", () => {
    const mockIssues = {
      toDo: [{ id: 1, title: "Issue 1", state: "open", assignee: null }],
      inProgress: [
        {
          id: 2,
          title: "Issue 2",
          state: "open",
          assignee: { login: "user1" },
        },
      ],
      done: [{ id: 3, title: "Issue 3", state: "closed", assignee: null }],
    };

    const action = {
      type: getIssues.fulfilled.type,
      meta: { arg: { owner: "facebook", repo: "react" } },
      payload: [
        ...mockIssues.toDo,
        ...mockIssues.inProgress,
        ...mockIssues.done,
      ],
    };

    const state = issuesReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.issues["facebook/react"]).toEqual(mockIssues);
  });

  it("should handle the fulfilled action with an empty payload", () => {
    const action = {
      type: getIssues.fulfilled.type,
      meta: { arg: { owner: "facebook", repo: "react" } },
      payload: [],
    };

    const state = issuesReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.issues["facebook/react"]).toEqual({
      toDo: [],
      inProgress: [],
      done: [],
    });
  });

  it("should handle the rejected action and set isLoading to false", () => {
    const action = { type: getIssues.rejected.type };
    const state = issuesReducer(initialState, action);

    expect(state.isLoading).toBe(false);
  });
});
