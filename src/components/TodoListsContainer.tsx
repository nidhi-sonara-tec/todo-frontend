import React from "react";
import TodoList from "./TodoList";
import { useSelector } from "react-redux";
import { TaskTypes } from "../helper/ResponseType";
import { Col, Row } from "react-bootstrap";
import { Droppable } from "react-beautiful-dnd";
import {
  TODO_STATUS_TITLE_DONE,
  TODO_STATUS_TITLE_PROGRESS,
  TODO_STATUS_TITLE_START,
} from "../config/Constants";

function TodoListsContainer() {
  // Retrieve task data from Redux state

  const taskData = useSelector((state: TaskTypes) => state.tasks);

  return (
    <>
      {/* Check if there are tasks in any of the three categories */}

      {taskData.taskStarted.length > 0 ||
      taskData.taskInProgress.length > 0 ||
      taskData.taskDone.length > 0 ? (
        <div className="task-list">
          <Row>
            <Col lg={4} md={6}>
              <Droppable droppableId="ToBeStart">
                {(provided) => (
                  <div
                    className=""
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <TodoList
                      tasks={taskData.taskStarted}
                      todoStatusTitle={TODO_STATUS_TITLE_START}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>
            <Col lg={4} md={6}>
              <Droppable droppableId="InProgress">
                {(provided) => (
                  <div
                    className=""
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <TodoList
                      tasks={taskData.taskInProgress}
                      todoStatusTitle={TODO_STATUS_TITLE_PROGRESS}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>

            <Col lg={4} md={6}>
              <Droppable droppableId="Completed">
                {(provided) => (
                  <div
                    className=""
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <TodoList
                      tasks={taskData.taskDone}
                      todoStatusTitle={TODO_STATUS_TITLE_DONE}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>
          </Row>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center flex-wrap notask-list">
          <h4 className="text-center">No data, yet</h4>
        </div>
      )}
    </>
  );
}

export default TodoListsContainer;
