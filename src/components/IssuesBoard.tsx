import { Flex, List, ListItem } from "@chakra-ui/react";

import { useAppSelector } from "../hooks";
import { selectDone, selectInProgress, selectToDo } from "../redux";
import { IssuesItem } from ".";

export const IssuesBoard = () => {
  const toDoIssues = useAppSelector(selectToDo);
  const inProgressIssues = useAppSelector(selectInProgress);
  const doneIssues = useAppSelector(selectDone);

  return (
    <Flex gap={3}>
      <List.Root
        gap={2}
        overflowX="hidden"
        overflowY="auto"
        w="1/3"
        maxH="72dvh"
        bg="#1f1f1f"
        borderRadius="30px"
        p={7}
      >
        {toDoIssues.map((issue) => (
          <ListItem
            key={issue.id}
            bg="#262626"
            p={5}
            borderRadius="12px"
            boxShadow="md"
          >
            <IssuesItem issue={issue} />
          </ListItem>
        ))}
      </List.Root>

      <List.Root
        gap={2}
        overflowX="hidden"
        overflowY="auto"
        w="1/3"
        maxH="72dvh"
      >
        {inProgressIssues.map((issue) => (
          <ListItem
            key={issue.id}
            bg="#262626"
            p={5}
            borderRadius="12px"
            boxShadow="md"
          >
            <IssuesItem issue={issue} />
          </ListItem>
        ))}
      </List.Root>

      <List.Root
        gap={2}
        overflowX="hidden"
        overflowY="auto"
        w="1/3"
        maxH="72dvh"
      >
        {doneIssues.map((issue) => (
          <ListItem
            key={issue.id}
            bg="#262626"
            p={5}
            borderRadius="12px"
            boxShadow="md"
          >
            <IssuesItem issue={issue} />
          </ListItem>
        ))}
      </List.Root>
    </Flex>
  );
};
