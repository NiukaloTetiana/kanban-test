import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useAppSelector } from "../hooks";
import { selectDone, selectInProgress, selectToDo } from "../redux";
import { getGitHubLinks, getRepoInfo } from "../helpers";

export const Links = () => {
  const toDoIssues = useAppSelector(selectToDo);
  const inProgressIssues = useAppSelector(selectInProgress);
  const doneIssues = useAppSelector(selectDone);

  if (!toDoIssues.length && !inProgressIssues.length && !doneIssues.length)
    return null;

  const url =
    toDoIssues[0]?.html_url ||
    inProgressIssues[0]?.html_url ||
    doneIssues[0]?.html_url;

  const links = getGitHubLinks(url);
  const repoInfo = getRepoInfo(url);

  return (
    <Flex gap={2} mt={4} mb={4}>
      <Link target="_blank" to={links.repoUrl}>
        {repoInfo.repo.charAt(0).toUpperCase() + repoInfo.repo.slice(1)}
      </Link>
      <Text>&gt;</Text>
      <Link target="_blank" to={links.userUrl}>
        {repoInfo.owner.charAt(0).toUpperCase() + repoInfo.owner.slice(1)}
      </Link>
    </Flex>
  );
};
