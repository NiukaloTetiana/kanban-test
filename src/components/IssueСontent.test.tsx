import { render, screen } from "@testing-library/react";
import { IssueContent } from "../components/IssueContent";
import { Issue } from "../types";
import { vi } from "vitest";

vi.mock("date-fns", () => ({
  formatDistanceToNow: () => "3 days",
}));

const mockIssue: Issue = {
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
    starred_url: "https://api.github.com/users/john_doe/starred{/owner}{/repo}",
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
};

describe("IssueContent Component", () => {
  test("renders issue title", () => {
    render(<IssueContent issue={mockIssue} />);
    expect(screen.getByText("Fix login bug")).toBeInTheDocument();
  });

  test("displays issue number", () => {
    render(<IssueContent issue={mockIssue} />);
    expect(screen.getByText("#123")).toBeInTheDocument();
  });

  test("formats created_at date", () => {
    render(<IssueContent issue={mockIssue} />);
    expect(screen.getByText("opened 3 days ago")).toBeInTheDocument();
  });

  test("displays user login", () => {
    render(<IssueContent issue={mockIssue} />);
    expect(screen.getByText("john_doe | Comments: 5")).toBeInTheDocument();
  });

  test("handles zero comments correctly", () => {
    render(<IssueContent issue={{ ...mockIssue, comments: 0 }} />);
    expect(
      screen.getByText("john_doe | Comments: no comments yet")
    ).toBeInTheDocument();
  });
});
