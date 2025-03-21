import { vi } from "vitest";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { render, screen, waitFor } from "@testing-library/react";

import { IssuesColumn } from "../components";
import { Provider } from "../components/ui/provider";
import { mockIssues } from "../constants";

describe("IssuesColumn", () => {
  it("renders the column title correctly", () => {
    render(
      <Provider>
        <DragDropContext onDragEnd={vi.fn()}>
          <Droppable droppableId="test-droppable">
            {(provided) => (
              <IssuesColumn
                title="Open Issues"
                issues={mockIssues}
                ulRef={provided.innerRef}
                provided={provided}
                {...provided.droppableProps}
              />
            )}
          </Droppable>
        </DragDropContext>
      </Provider>
    );

    expect(screen.getByText("Open Issues")).toBeInTheDocument();
  });

  it("renders all issues", async () => {
    render(
      <Provider>
        <DragDropContext onDragEnd={vi.fn()}>
          <Droppable droppableId="test-droppable">
            {(provided) => (
              <IssuesColumn
                title="Open Issues"
                issues={mockIssues}
                ulRef={provided.innerRef}
                provided={provided}
                {...provided.droppableProps}
              />
            )}
          </Droppable>
        </DragDropContext>
      </Provider>
    );

    await waitFor(() => {
      mockIssues.forEach(async (issue) => {
        const issueElement = await screen.findByText(issue.title);
        expect(issueElement).toBeInTheDocument();
      });
    });
  });

  it("renders the correct number of issues", () => {
    render(
      <Provider>
        <DragDropContext onDragEnd={vi.fn()}>
          <Droppable droppableId="test-droppable">
            {(provided) => (
              <IssuesColumn
                title="Open Issues"
                issues={mockIssues}
                ulRef={provided.innerRef}
                provided={provided}
                {...provided.droppableProps}
              />
            )}
          </Droppable>
        </DragDropContext>
      </Provider>
    );

    const renderedIssues = screen.getAllByText(/Fix login bug|Issue 2/);
    expect(renderedIssues).toHaveLength(mockIssues.length);
  });
});
