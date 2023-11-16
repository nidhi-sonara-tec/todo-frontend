// This test file is for the TodoList component in a React application. It utilizes the @testing-library/react library for testing React components and Jest for test assertions and mocking.

// Import necessary modules and dependencies
import React from "react";
import TodoList from "./components/TodoList";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store";

// Define mock tasks for testing purposes
const mockTasks = [
  {
    id: "1",
    title: "Task 1",
    type: "Design",
    assignee: "John Doe",
  },
  {
    id: "2",
    title: "Task 2",
    type: "Frontend",
    assignee: "Jane Doe",
  },
];

// Define mock properties for the TodoList component
const mockProps = {
  tasks: mockTasks as [],
  todoStatusTitle: "To Do",
};


// Mock the 'react-beautiful-dnd' library for draggable components
jest.mock('react-beautiful-dnd', () => ({
  __esModule: true,
  Draggable: jest.fn(({ children }) => children({
    draggableProps: { style: {} },
    innerRef: jest.fn(),
    dragHandleProps: { style: {} },
  })),
}));

// Test suite for the TodoList Component
describe("TodoList Component", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <TodoList {...mockProps} />
      </Provider>
    );
  });

  
  // Test case: It should render with the correct data-test-id
  it("renders the correct data-test-id", () => {
    render(
      <Provider store={store}>
        <TodoList {...mockProps} />
      </Provider>
    );
    expect(screen.getByTestId("todo")).toBeInTheDocument();
  });
});
