import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useAppSelector } from "../hooks";
import { getGitHubLinks, getRepoInfo } from "../helpers";
import { selectIssuesByRepoAndColumn } from "../redux";

interface ILinksProps {
  repoKey: string;
}

export const Links = ({ repoKey }: ILinksProps) => {
  const toDoIssues = useAppSelector(
    selectIssuesByRepoAndColumn(repoKey, "toDo")
  );
  const inProgressIssues = useAppSelector(
    selectIssuesByRepoAndColumn(repoKey, "inProgress")
  );
  const doneIssues = useAppSelector(
    selectIssuesByRepoAndColumn(repoKey, "done")
  );

  if (!toDoIssues.length && !inProgressIssues.length && !doneIssues.length)
    return null;

  const url =
    toDoIssues[0]?.html_url ||
    inProgressIssues[0]?.html_url ||
    doneIssues[0]?.html_url;

  const links = getGitHubLinks(url);
  const repoInfo = getRepoInfo(url);

  return (
    <Flex
      data-testid="links"
      data-repokey={repoKey}
      gap={2}
      mt={4}
      mb={4}
      fontSize="18px"
    >
      <Link
        rel="noopener noreferrer"
        target="_blank"
        to={links.repoUrl}
        className="link"
      >
        {repoInfo.repo.charAt(0).toUpperCase() + repoInfo.repo.slice(1)}
      </Link>
      <Text>&gt;</Text>
      <Link
        rel="noopener noreferrer"
        target="_blank"
        to={links.userUrl}
        className="link"
      >
        {repoInfo.owner.charAt(0).toUpperCase() + repoInfo.owner.slice(1)}
      </Link>
    </Flex>
  );
};
