import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import ModalHelper from "./helper/Modal";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import ApiUtils from "./api/ApiUtils";
import { TaskTypes, TodoType } from "./helper/ResponseType";
import {
  CREATE_TASK,
  DROPPABLE_ID_DONE,
  DROPPABLE_ID_PROGRESS,
  DROPPABLE_ID_START,
  MODAL_TITLE_CREATE,
  TASK_STATUS_COMPLETED,
  TASK_STATUS_IN_PROGRESS,
  TASK_STATUS_TO_BE_START,
} from "./config/Constants";
import {
  setInProgressData,
  setTaskDoneData,
  setTobeStartData,
} from "./store/reducers/tasksSlice";
import { fetchTaskDataByStatus } from "./helper/fetchData";
import TodoListsContainer from "./components/TodoListsContainer";

function App() {
  // State for controlling the visibility of the task creation modal
  const [showModal, setShowModal] = useState(false);
  const [data] = useState(null);
  const taskData = useSelector((state: TaskTypes) => state.tasks);
  const handleTaskModalShow = () => setShowModal(true);
  const handleTaskModalNotShow = () => setShowModal(false);
  const dispatch = useDispatch();

  // Initial data fetching on component mount
  useEffect(() => {
    getTaskData(TASK_STATUS_TO_BE_START, setTobeStartData);
    getTaskData(TASK_STATUS_IN_PROGRESS, setInProgressData);
    getTaskData(TASK_STATUS_COMPLETED, setTaskDoneData);
  }, []);

  const getTaskData = (status: string, action: any) => {
    fetchTaskDataByStatus(status, action, dispatch);
  };

  // Drag and drop logic when tasks are moved between statuses

  function moveObject(data: any, fromIndex: number, toIndex: number) {
    // Ensure indices are within bounds
    if (
      fromIndex >= 0 &&
      fromIndex < data.length &&
      toIndex >= 0 &&
      toIndex < data.length
    ) {
      // Remove the object from the "from" index
      const [movedObject] = data.splice(fromIndex, 1);

      // Insert the object at the "to" index
      data.splice(toIndex, 0, movedObject);
    }

    return data;
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    // If the dragged item is dropped in the same position, exit the function
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // If trying to move a task from "To Be Started" directly to "Done", exit the function

    if (
      destination.droppableId === source.droppableId &&
      destination.index !== source.index
    ) {
      let data: any;
      if (source.droppableId === DROPPABLE_ID_START) {
        data = [...taskData.taskStarted];
      } else if (source.droppableId === DROPPABLE_ID_PROGRESS) {
        data = [...taskData.taskInProgress];
      } else if (source.droppableId === DROPPABLE_ID_DONE) {
        data = [...taskData.taskDone];
      }
      data = [...data];
      const updatedData = moveObject(data, source.index, destination.index);

      if (source.droppableId === DROPPABLE_ID_START) {
        dispatch(setTobeStartData(updatedData));
      } else if (source.droppableId === DROPPABLE_ID_PROGRESS) {
        dispatch(setInProgressData(updatedData));
      } else if (source.droppableId === DROPPABLE_ID_DONE) {
        dispatch(setTaskDoneData(updatedData));
      }
      return;
    }
    if (
      destination.droppableId === DROPPABLE_ID_DONE &&
      source.droppableId === DROPPABLE_ID_START
    )
      return;

    // Placeholder variable to store the task being moved

    let add;

    // Copying the task arrays for each status

    let tobeStart = [...taskData.taskStarted];
    let inProgress = [...taskData.taskInProgress];
    let completed = [...taskData.taskDone];

    // Removing the task from the source status array
    if (source.droppableId === DROPPABLE_ID_START) {
      add = tobeStart[source.index];
      tobeStart?.splice((source.index, 1));
    } else if (source.droppableId === DROPPABLE_ID_PROGRESS) {
      add = inProgress[source.index];
      inProgress.splice(source.index, 1);
    } else if (source.droppableId === DROPPABLE_ID_DONE) {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    // Updating the destination status array and sending an API request to update the task status

    if (destination.droppableId === DROPPABLE_ID_START) {
      const newTodo = { ...add, currentStateId: TASK_STATUS_TO_BE_START };
      ApiUtils.editTask(newTodo, newTodo._id as string)
        .then((res) => {
          if (res.status === 200) {
            getTaskData(TASK_STATUS_TO_BE_START, setTobeStartData);
            getTaskData(TASK_STATUS_IN_PROGRESS, setInProgressData);
            getTaskData(TASK_STATUS_COMPLETED, setTaskDoneData);
          }
        })
        .catch((err) => {});
      // Inserting the task at the new position in the array
      tobeStart.splice(destination.index, 0, add as TodoType);
    } else if (destination.droppableId === DROPPABLE_ID_PROGRESS) {
      // Inserting the task at the new position in the array
      inProgress.splice(destination.index, 0, add as TodoType);
      const newTodo = { ...add, currentStateId: TASK_STATUS_IN_PROGRESS };
      ApiUtils.editTask(newTodo, newTodo._id as string)
        .then((res) => {
          if (res.status === 200) {
            getTaskData(TASK_STATUS_TO_BE_START, setTobeStartData);
            getTaskData(TASK_STATUS_IN_PROGRESS, setInProgressData);
            getTaskData(TASK_STATUS_COMPLETED, setTaskDoneData);
          }
        })
        .catch((err) => {});
    } else if (destination.droppableId === DROPPABLE_ID_DONE) {
      completed.splice(destination.index, 0, add as TodoType);
      const newTodo = { ...add, currentStateId: TASK_STATUS_COMPLETED };
      ApiUtils.editTask(newTodo, newTodo._id as string)
        .then((res) => {
          if (res.status === 200) {
            getTaskData(TASK_STATUS_TO_BE_START, setTobeStartData);
            getTaskData(TASK_STATUS_IN_PROGRESS, setInProgressData);
            getTaskData(TASK_STATUS_COMPLETED, setTaskDoneData);
          }
        })
        .catch((err) => {});
    }
    dispatch(setInProgressData(inProgress));
    dispatch(setTobeStartData(tobeStart));
    dispatch(setTaskDoneData(completed));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <Container>
          <Stack direction="horizontal" gap={3}>
            <h4 className="p-2">Dashboard</h4>
            <div className="p-2 ms-auto">
              <Button
                variant=""
                className="btn-app"
                onClick={handleTaskModalShow}
              >
                + <span>Create Task</span>
              </Button>
            </div>
          </Stack>
          <TodoListsContainer />
        </Container>
        <ModalHelper
          show={showModal}
          onHide={handleTaskModalNotShow}
          titleText={MODAL_TITLE_CREATE}
          buttonText={CREATE_TASK}
          modalData={data ?? undefined}
        />
      </div>
      <ToastContainer />
    </DragDropContext>
  );
}
export default App;
