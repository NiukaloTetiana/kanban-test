import { RestEndpointMethodTypes } from "@octokit/rest";

export type IssuesResponse =
  RestEndpointMethodTypes["issues"]["listForRepo"]["response"]["data"];
