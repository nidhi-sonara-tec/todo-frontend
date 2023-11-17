import React, { useState } from "react";
import { OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import {
  FaCalendarAlt,
  FaUserTie,
  FaEdit,
  FaTrashAlt,
  FaInfoCircle,
} from "react-icons/fa";
import ModalHelper from "../helper/Modal";
import { Draggable } from "react-beautiful-dnd";
import {
  BACKEND_BADGE_TEXT,
  BACKEND_TEXT,
  DESIGN_BADGE_TEXT,
  DESIGN_TEXT,
  DEVOPS_BADGE_TEXT,
  DEVOPS_TEXT,
  FRONTEND_BADGE_TEXT,
  FRONTEND_TEXT,
  MODAL_TITLE_EDIT,
  TASK_STATUS_COMPLETED,
  TASK_STATUS_IN_PROGRESS,
  TASK_STATUS_TO_BE_START,
  UPDATE_CHANGES,
} from "../config/Constants";
import ApiUtils from "../api/ApiUtils";
import {
  setInProgressData,
  setTaskDoneData,
  setTobeStartData,
} from "../store/reducers/tasksSlice";
import { useDispatch } from "react-redux";
import { ToasterMessage } from "../helper/ToasterHelper";
import { TodoType } from "../helper/ResponseType";

interface TaskType {
  readonly title: string;
  readonly type: string;
  readonly assignee: string;
  readonly index: number;
  readonly id: string;
  readonly description: string;
}
function TaskCard({ id, index, title, type, assignee, description }: TaskType) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<TodoType | undefined>(undefined);
  const handleTaskModalShow = (id: string) => {
    setShowModal(true);
    ApiUtils.getTask(id).then((res) => {
      if (res.status === 200) {
        setData(res.data);
      }
    });
  };
  const tooltip = <Tooltip id="tooltip">{description}</Tooltip>;
  const handleTaskModalNotShow = () => setShowModal(false);
  const getBadgeClass = () => {
    switch (type.toLowerCase()) {
      case DESIGN_TEXT:
        return DESIGN_BADGE_TEXT;
      case FRONTEND_TEXT:
        return FRONTEND_BADGE_TEXT;
      case BACKEND_TEXT:
        return BACKEND_BADGE_TEXT;
      case DEVOPS_TEXT:
        return DEVOPS_BADGE_TEXT;
      default:
        return "";
    }
  };
  const getToBeStartList = (id: string) => {
    ApiUtils.getTasksList(id)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setTobeStartData(res.data));
        }
      })
      .catch((err) => {});
  };
  const getInProgressTaskList = (id: string) => {
    ApiUtils.getTasksList(id)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setInProgressData(res.data));
        }
      })
      .catch((err) => {});
  };
  const getTaskDoneList = (id: string) => {
    ApiUtils.getTasksList(id)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setTaskDoneData(res.data));
        }
      })
      .catch((err) => {});
  };
  const handleDeleteTask = (id: string) => {
    ApiUtils.deleteTask(id)
      .then((res) => {
        if (res.status === 200) {
          getToBeStartList(TASK_STATUS_TO_BE_START);
          getInProgressTaskList(TASK_STATUS_IN_PROGRESS);
          getTaskDoneList(TASK_STATUS_COMPLETED);
          ToasterMessage("success", "Task Deleted Successfully");
        }
      })
      .catch((err) => {});
  };
  return (
    <>
      <Draggable draggableId={id} key={id} index={index}>
        {(provided) => (
          <Stack
            as="div"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card className="task-card mt-3 mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <Badge pill bg="" className={`task-type ${getBadgeClass()}`}>
                    {type}
                  </Badge>
                  <OverlayTrigger placement="right" overlay={tooltip}>
                  <span>
                    <FaEdit
                      className="edit-task"
                      data-testid="edit-icon"
                      onClick={() => handleTaskModalShow(id)}
                    />
                    <FaTrashAlt
                      className="delete-task"
                      onClick={() => handleDeleteTask(id)}
                    />
                      <FaInfoCircle />
                  </span>
                    </OverlayTrigger>
                </div>
                <Card.Title as="p" className="mt-2 mb-2">
                  {title}
                </Card.Title>
                <Stack as="div">
                <Card.Subtitle className="mb-2 mt-1 text-muted d-flex gap-2">
                    <FaUserTie />
                    <span>Assignee: {assignee}</span>
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 mt-1 text-muted d-flex gap-2">
                    <FaCalendarAlt />
                    <span>December 12, 2023</span>
                  </Card.Subtitle>
                
                </Stack>
              </Card.Body>
            </Card>
          </Stack>
        )}
      </Draggable>
      <ModalHelper
        show={showModal}
        onHide={handleTaskModalNotShow}
        titleText={MODAL_TITLE_EDIT}
        buttonText={UPDATE_CHANGES}
        modalData={data}
      />
    </>
  );
}

export default TaskCard;
