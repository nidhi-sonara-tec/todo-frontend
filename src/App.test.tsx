import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
test("renders title and additional element", () => {
  // Render the App component
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  // Check if the title "Create Task" is present
  const title = screen.getByText("Create Task");
  expect(title).toBeInTheDocument();
});
