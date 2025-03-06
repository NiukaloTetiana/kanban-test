import { List, ListItem, Heading, Box } from "@chakra-ui/react";

import { Issue } from "../types";

import { IssuesItem } from ".";

interface IIssuesColumnProps {
  title: string;
  issues: Issue[];
}

export const IssuesColumn = ({ title, issues }: IIssuesColumnProps) => {
  return (
    <Box w="1/3">
      <Heading
        as="h3"
        size="md"
        mb={6}
        textAlign="center"
        color="#f9f9f9"
        fontSize="24px"
      >
        {title}
      </Heading>

      <List.Root
        gap={2}
        maxH="62dvh"
        minH="300px"
        bg="#1f1f1f"
        borderRadius="30px"
        p={7}
        className="scrollbar"
      >
        {issues.map((issue) => (
          <ListItem
            key={issue.id}
            bg="#f9f9f9"
            color="#1f1f1f"
            p={5}
            borderRadius="12px"
          >
            <IssuesItem issue={issue} />
          </ListItem>
        ))}
      </List.Root>
    </Box>
  );
};
