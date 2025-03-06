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
      <Text truncate fontWeight="bold" fontSize="18px" mb={2}>
        {title}
      </Text>
      <Flex gap={1}>
        <Text color="#4f92f7" fontWeight="bold" mb={2}>
          #{number}
        </Text>
        <Text>opened {formatDistanceToNow(new Date(created_at))} ago</Text>
      </Flex>

      <Text fontWeight="bold">Admin | Comments: {comments}</Text>
    </>
  );
};
