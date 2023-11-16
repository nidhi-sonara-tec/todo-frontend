
// This test file is for the ModalHelper component in a React application. It uses the @testing-library/react library for testing React components and Jest for test assertions and mocking.

// Import necessary modules and dependencies
import React from "react";
import ModalHelper from "./helper/Modal";

import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store";

// Define mock properties for the ModalHelper component
const mockProps = {
  show: true,
  onHide: jest.fn(),
  titleText: "Test Modal",
  buttonText:"Create Task",
  modalData: {
    _id: "1",
    title: "Sample Task",
    type: "Frontend",
    assignee: "John Doe",
    description: "Asign this task",
    currentStateId: "2",
  },
};

// Test suite for the ModalHelper Component
describe("ModalHelper Component", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <ModalHelper {...mockProps} />
      </Provider>
    );
  });

  // Test case: It should render the correct title text
  it("renders the correct title text", () => {
    render(
      <Provider store={store}>
        <ModalHelper {...mockProps} />
      </Provider>
    );
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  // Test case: It should render the correct test id for the close button in the modal
  it("Render Correct Test id for Modal", () => {
    render(
      <Provider store={store}>
        <ModalHelper {...mockProps} />
      </Provider>
    );
    expect(screen.getByTestId("close-button")).toBeInTheDocument()
  });
});
