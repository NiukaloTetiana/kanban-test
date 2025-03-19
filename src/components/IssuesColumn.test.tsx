import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { DragDropContext } from "@hello-pangea/dnd";

import { IssuesColumn } from "../components";
import { Provider } from "../components/ui/provider";
import { Issue } from "../types";

const mockIssues: Issue[] = [
  {
    id: 1,
    node_id: "MDU6SXNzdWUx",
    url: "https://api.github.com/repos/octocat/Hello-World/issues/1",
    repository_url: "https://api.github.com/repos/octocat/Hello-World",
    labels_url:
      "https://api.github.com/repos/octocat/Hello-World/issues/1/labels{/name}",
    comments_url:
      "https://api.github.com/repos/octocat/Hello-World/issues/1/comments",
    events_url:
      "https://api.github.com/repos/octocat/Hello-World/issues/1/events",
    html_url: "https://github.com/octocat/Hello-World/issues/1",
    number: 1,
    state: "open",
    state_reason: null,
    title: "Fix login bug",
    body: "There is an issue with the login system.",
    user: {
      login: "john_doe",
      id: 1,
      node_id: "MDQ6VXNlcjE=",
      avatar_url: "https://example.com/avatar.jpg",
      gravatar_id: null,
      url: "https://api.github.com/users/john_doe",
      html_url: "https://github.com/john_doe",
      followers_url: "https://api.github.com/users/john_doe/followers",
      following_url:
        "https://api.github.com/users/john_doe/following{/other_user}",
      gists_url: "https://api.github.com/users/john_doe/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/john_doe/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/john_doe/subscriptions",
      organizations_url: "https://api.github.com/users/john_doe/orgs",
      repos_url: "https://api.github.com/users/john_doe/repos",
      events_url: "https://api.github.com/users/john_doe/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/john_doe/received_events",
      type: "User",
      site_admin: false,
    },
    labels: [],
    assignee: null,
    assignees: [],
    milestone: null,
    locked: false,
    active_lock_reason: null,
    comments: 5,
    created_at: "2024-03-10T12:00:00Z",
    updated_at: "2024-03-11T12:00:00Z",
    closed_at: null,
    author_association: "OWNER",
    draft: false,
    reactions: {
      url: "https://api.github.com/repos/octocat/Hello-World/issues/1/reactions",
      total_count: 0,
      "+1": 0,
      "-1": 0,
      laugh: 0,
      hooray: 0,
      confused: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
    timeline_url:
      "https://api.github.com/repos/octocat/Hello-World/issues/1/timeline",
    performed_via_github_app: null,
  },
  {
    id: 2,
    title: "Issue 2",
    number: 2,
    comments: 5,
    user: {
      login: "User2",
      id: 2,
      node_id: "MDQ6VXNlcjE=",
      avatar_url: "https://example.com/avatar.jpg",
      gravatar_id: null,
      url: "https://api.github.com/users/User2",
      html_url: "https://github.com/User2",
      followers_url: "https://api.github.com/users/User2/followers",
      following_url:
        "https://api.github.com/users/User2/following{/other_user}",
      gists_url: "https://api.github.com/users/User2/gists{/gist_id}",
      starred_url: "https://api.github.com/users/User2/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/User2/subscriptions",
      organizations_url: "https://api.github.com/users/User2/orgs",
      repos_url: "https://api.github.com/users/User2/repos",
      events_url: "https://api.github.com/users/User2/events{/privacy}",
      received_events_url: "https://api.github.com/users/User2/received_events",
      type: "User",
      site_admin: false,
    },
    node_id: "node2",
    url: "https://example.com/issue/2",
    repository_url: "https://example.com/repo",
    labels_url: "https://example.com/labels",
    comments_url: "https://example.com/comments",
    events_url: "https://example.com/events",
    html_url: "https://example.com/issue/2",
    state: "open",
    state_reason: null,
    assignee: null,
    assignees: [],
    labels: [],
    milestone: null,
    locked: false,
    active_lock_reason: null,
    pull_request: {
      merged_at: null,
      diff_url: null,
      html_url: null,
      patch_url: null,
      url: null,
    },
    closed_at: null,
    author_association: "OWNER",
    created_at: "2023-03-19T12:00:00Z",
    updated_at: "2023-03-19T12:00:00Z",
    closed_by: null,
    reactions: {
      url: "https://example.com/issue/2/reactions",
      total_count: 0,
      "+1": 0,
      "-1": 0,
      laugh: 0,
      hooray: 0,
      confused: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
    timeline_url: "https://example.com/issue/2/timeline",
    performed_via_github_app: null,
  },
];

describe("IssuesColumn", () => {
  it("renders the column title correctly", () => {
    render(
      <Provider>
        <DragDropContext onDragEnd={vi.fn()}>
          <IssuesColumn
            title="Open Issues"
            issues={mockIssues}
            ulRef={null}
            provided={{
              droppableProps: {},
              innerRef: vi.fn(),
              placeholder: <div />,
            }}
          />
        </DragDropContext>
      </Provider>
    );

    expect(screen.getByText("Open Issues")).toBeInTheDocument();
  });

  it("renders all issues", () => {
    render(
      <Provider>
        <IssuesColumn
          title="Open Issues"
          issues={mockIssues}
          ulRef={null}
          provided={{
            droppableProps: {
              "data-rfd-droppable-id": "test",
              "data-rfd-droppable-context-id": "test",
            },
            innerRef: vi.fn(),
            placeholder: <div />,
          }}
        />
      </Provider>
    );

    mockIssues.forEach((issue) => {
      expect(screen.getByText(issue.title)).toBeInTheDocument();
      if (issue.user) {
        expect(screen.getByText(issue.user.login)).toBeInTheDocument();
      }
    });
  });

  it("renders the correct number of issues", () => {
    render(
      <Provider>
        <IssuesColumn
          title="Open Issues"
          issues={mockIssues}
          ulRef={null}
          provided={{
            droppableProps: {
              "data-rfd-droppable-id": "test",
              "data-rfd-droppable-context-id": "test",
            },
            innerRef: vi.fn(),
            placeholder: <div />,
          }}
        />
      </Provider>
    );

    const renderedIssues = screen.getAllByText(/Fix login bug|Issue 2/);
    expect(renderedIssues).toHaveLength(mockIssues.length);
  });
});
