// Import necessary modules and dependencies
import React from "react";
import { render } from "@testing-library/react";
import axios from "axios";
import TaskCard from "./utils/TaskCard";
import { Provider } from "react-redux";
import store from "./store";

// Define a mock task for testing purposes
const mockTask = {
  id: "1",
  index: 0,
  title: "Sample Task",
  type: "Frontend",
  assignee: "John Doe",
  description: "Customise your todos."
};
axios.get = jest.fn().mockResolvedValue({
  data: [
    {
      userId: 1,
      id: 1,
      title: "test",
    },
  ],
});
// Mock Axios to simulate a successful request
jest.mock("axios", () => {
  return {
    create: jest.fn(() => ({
      get: jest.fn(),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
    })),
  };
});

// Mock the 'react-beautiful-dnd' library for draggable components
jest.mock('react-beautiful-dnd', () => ({
  __esModule: true,
  Draggable: jest.fn(({ children }) => children({
    draggableProps: { style: {} },
    innerRef: jest.fn(),
    dragHandleProps: { style: {} },
  })),
}));
// Test suite for the TaskCard Component
describe("TaskCard Component", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <TaskCard {...mockTask} />;
      </Provider>
    );
  });
});
