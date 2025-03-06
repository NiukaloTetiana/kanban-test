import { Flex } from "@chakra-ui/react";

import { useAppSelector } from "../hooks";
import { selectDone, selectInProgress, selectToDo } from "../redux";
import { IssuesColumn } from "./IssuesColumn";

export const IssuesBoard = () => {
  const toDoIssues = useAppSelector(selectToDo);
  const inProgressIssues = useAppSelector(selectInProgress);
  const doneIssues = useAppSelector(selectDone);

  return toDoIssues.length || inProgressIssues.length || doneIssues.length ? (
    <Flex gap={3}>
      <IssuesColumn title="ToDo" issues={toDoIssues} />
      <IssuesColumn title="In Progress" issues={inProgressIssues} />
      <IssuesColumn title="Done" issues={doneIssues} />
    </Flex>
  ) : null;
};
