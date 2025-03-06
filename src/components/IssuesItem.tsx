import { Flex, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";

import { Issue } from "../types";

interface IIssuesItemProps {
  issue: Issue;
}

export const IssuesItem = ({ issue }: IIssuesItemProps) => {
  const { title, number, comments, created_at } = issue;

  return (
    <>
      <Text>{title}</Text>
      <Flex gap={1}>
        <Text>#{number}</Text>
        <Text>Admin | Comments: {comments}</Text>
      </Flex>

      <Text>Opened {formatDistanceToNow(new Date(created_at))} ago</Text>
    </>
  );
};
