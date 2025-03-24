import { ForwardedRef } from "react";
import { List, ListItem, Heading, Box } from "@chakra-ui/react";
import { Draggable, DroppableProvided } from "@hello-pangea/dnd";

import { Issue } from "../types";

import { IssueContent } from "../components";

interface IIssuesColumnProps {
  title: string;
  issues: Issue[];
  ulRef: ForwardedRef<HTMLUListElement>;
  provided: DroppableProvided;
}

export const IssuesColumn = ({
  title,
  issues,
  ulRef,
  provided,
  ...rest
}: IIssuesColumnProps) => {
  return (
    <Box w="1/3">
      <Heading
        data-testid={`column-title-${title}`}
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
        maxH="calc(100dvh - 250px)"
        minH="300px"
        bg="#1f1f1f"
        borderRadius="30px"
        p={7}
        className="scrollbar"
        ref={ulRef}
        {...rest}
      >
        {issues.map((issue, index) => (
          <Draggable
            key={issue.id}
            draggableId={issue.id.toString()}
            index={index}
          >
            {(provided) => (
              <ListItem
                data-testid={issue.title}
                bg="#f9f9f9"
                color="#1f1f1f"
                p={3}
                borderRadius="12px"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <IssueContent issue={issue} />
              </ListItem>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </List.Root>
    </Box>
  );
};
