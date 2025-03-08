import { Flex } from "@chakra-ui/react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import { useAppDispatch, useAppSelector } from "../hooks";
import {
  moveIssue,
  reorderIssues,
  selectDone,
  selectInProgress,
  selectToDo,
} from "../redux";
import { IssuesColumn } from "./IssuesColumn";

export const IssuesBoard = () => {
  const toDoIssues = useAppSelector(selectToDo);
  const inProgressIssues = useAppSelector(selectInProgress);
  const doneIssues = useAppSelector(selectDone);
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
          columnId: source.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index,
        })
      );
    } else {
      dispatch(moveIssue({ source, destination }));
    }
  };

  return toDoIssues.length || inProgressIssues.length || doneIssues.length ? (
    <Flex gap={3}>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(columns).map(([key, column]) => (
          <Droppable key={key} droppableId={column.id}>
            {(provided) => (
              <IssuesColumn
                ulRef={provided.innerRef}
                title={column.name}
                issues={column.issues}
                {...provided.droppableProps}
              />
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </Flex>
  ) : null;
};
