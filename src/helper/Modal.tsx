import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { useDispatch } from "react-redux";
import ApiUtils from "../api/ApiUtils";
import {
  setInProgressData,
  setTaskDoneData,
  setTobeStartData,
} from "../store/reducers/tasksSlice";
import { MyModalProps } from "./ResponseType";
import {
  TASK_STATUS_COMPLETED,
  TASK_STATUS_IN_PROGRESS,
  TASK_STATUS_TO_BE_START,
} from "../config/Constants";
import { ToasterMessage } from "./ToasterHelper";
import { fetchTaskDataByStatus } from "./fetchData";

// Props for the ModalHelper component

function ModalHelper({
  show,
  onHide,
  titleText,
  modalData,
}: Readonly<MyModalProps>) {
  // State to manage form data
  const [taskObj, setTaskObj] = useState({
    title: modalData?.title ?? "",
    type: modalData?.type ?? "",
    description: modalData?.description ?? "",
    assignee: modalData?.assignee ?? "",
    currentStateId: TASK_STATUS_TO_BE_START,
  });
  const dispatch = useDispatch();

  // Fetch and update the To Be Start task list

  const getTaskData = (status: string, action: any) => {
    fetchTaskDataByStatus(status, action, dispatch);
  };
  // Handle input changes in the form
  const handleTask = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskObj((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  // Update form data when modalData changes
  useEffect(() => {
    if (show && modalData) {
      setTaskObj({
        title: modalData?.title || "",
        type: modalData?.type || "",
        description: modalData?.description || "",
        assignee: modalData?.assignee || "",
        currentStateId: TASK_STATUS_TO_BE_START,
      });
    }
  }, [show, modalData]);

  // Handle form submission
  const handleSubmitChange = () => {
    // Validate form data
    if (Object.values(taskObj).some((value) => !value)) {
      ToasterMessage("warning", "Please fill all the details");
      return;
    }
    const newTodo = {
      title: taskObj.title,
      type: taskObj.type,
      description: taskObj.description,
      assignee: taskObj.assignee,
      currentStateId: modalData?.currentStateId ?? TASK_STATUS_TO_BE_START,
    };
    if (modalData?._id) {
      // Edit existing task

      ApiUtils.editTask(newTodo, modalData?._id)
        .then((res) => {
          if (res.status === 200) {
            getTaskData(TASK_STATUS_TO_BE_START, setTobeStartData);
            getTaskData(TASK_STATUS_IN_PROGRESS, setInProgressData);
            getTaskData(TASK_STATUS_COMPLETED, setTaskDoneData);
            ToasterMessage("success", "Task Updated Successfully");
          }
        })
        .catch((err) => {});
    } else {
      // Add new task

      ApiUtils.addTask(newTodo)
        .then((res) => {
          if (res.status === 200) {
            getTaskData(TASK_STATUS_TO_BE_START, setTobeStartData);
            getTaskData(TASK_STATUS_IN_PROGRESS, setInProgressData);
            getTaskData(TASK_STATUS_COMPLETED, setTaskDoneData);
            ToasterMessage("success", "Task Created Successfully");
          }
        })
        .catch((err) => {});
    }
    onHide();
    setTaskObj({
      title: "",
      type: "",
      description: "",
      assignee: "",
      currentStateId: TASK_STATUS_TO_BE_START,
    });
  };

  return (
    <Modal
      data-testid="close-button"
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      centered
    >
      {/* Modal Header */}

      <Modal.Header closeButton>
        <span className="d-flex flex-column">
          <Modal.Title as="h5">{titleText}</Modal.Title>
          <span className="modal-head-text">
            Make changes to your tasks here. Click save when you're done.
          </span>
        </span>
      </Modal.Header>
      {/* Modal Body */}

      <Modal.Body>
        <Form>
          <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Task Name"
              name="title"
              onChange={handleTask}
              value={taskObj?.title}
            />
          </Form.Group>
          <Form.Label>Type</Form.Label>
          <Row>
            <Form.Group className="mb-3" as={Col} sm="6">
              <Form.Check
                required
                name="type"
                label="Design"
                id="Design"
                type="radio"
                onChange={handleTask}
                value="design"
                checked={taskObj?.type === "design"}
              />
            </Form.Group>
            <Form.Group className="mb-3" as={Col} sm="6">
              <Form.Check
                required
                name="type"
                label="Frontend"
                id="Frontend"
                type="radio"
                value="frontend"
                onChange={handleTask}
                checked={taskObj?.type === "frontend"}
              />
            </Form.Group>{" "}
          </Row>
          <Row>
            <Form.Group className="mb-3" as={Col} sm="6">
              <Form.Check
                required
                name="type"
                label="Backend"
                id="Backend"
                type="radio"
                onChange={handleTask}
                value="backend"
                checked={taskObj?.type === "backend"}
              />
            </Form.Group>
            <Form.Group className="mb-3" as={Col} sm="6">
              <Form.Check
                required
                name="type"
                label="Devops"
                id="Devops"
                type="radio"
                onChange={handleTask}
                value="devops"
                checked={taskObj?.type === "devops"}
              />
            </Form.Group>{" "}
          </Row>
          <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              onChange={handleTask}
              name="description"
              rows={2}
              value={taskObj?.description}
              placeholder="Write description about the task..."
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
            <Form.Label>Assginee</Form.Label>
            <Form.Control
              type="text"
              onChange={handleTask}
              name="assignee"
              placeholder="Assginee Name"
              value={taskObj?.assignee}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      {/* Modal Footer with submission button */}

      <Modal.Footer>
        <Button
          variant=""
          className="btn-app"
          type="button"
          onClick={handleSubmitChange}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalHelper;
