import { Flex, Text } from "@chakra-ui/react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

import { IssuesColumn } from "../components";

import { useAppDispatch, useAppSelector } from "../hooks";
import {
  moveIssue,
  reorderIssues,
  selectIssuesByRepoAndColumn,
} from "../redux";

export const IssuesBoard = ({ repoKey }: { repoKey: string }) => {
  const toDoIssues = useAppSelector(
    selectIssuesByRepoAndColumn(repoKey, "toDo")
  );
  const inProgressIssues = useAppSelector(
    selectIssuesByRepoAndColumn(repoKey, "inProgress")
  );
  const doneIssues = useAppSelector(
    selectIssuesByRepoAndColumn(repoKey, "done")
  );
  const dispatch = useAppDispatch();

  const columns = {
    toDo: { id: "toDo", name: "To Do", issues: toDoIssues },
    inProgress: {
      id: "inProgress",
      name: "In Progress",
      issues: inProgressIssues,
    },
    done: { id: "done", name: "Done", issues: doneIssues },
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      dispatch(
        reorderIssues({
          repo: repoKey,
          columnId: source.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index,
        })
      );
    } else {
      dispatch(moveIssue({ repo: repoKey, source, destination }));
    }
  };

  const hasIssues =
    toDoIssues?.length || inProgressIssues?.length || doneIssues?.length;

  return hasIssues ? (
    <Flex data-testid="issues-board" data-repokey={repoKey} gap={3}>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(columns).map(([key, column]) => (
          <Droppable key={key} droppableId={column.id}>
            {(provided) => (
              <IssuesColumn
                data-testid={column.id}
                ulRef={provided.innerRef}
                title={column.name}
                issues={column.issues}
                provided={provided}
                {...provided.droppableProps}
              />
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </Flex>
  ) : (
    <Flex align="center" justify="center" h="400px" w="400px" mx="auto">
      <Text fontWeight="bold" fontSize="30px" textAlign="center">
        🔍No searches yet... Maybe try finding some issues ?🚀
      </Text>
    </Flex>
  );
};
