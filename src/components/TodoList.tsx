import TaskCard from "../utils/TaskCard";
import { TodoProps } from "../helper/ResponseType";

// TodoList component renders a list of tasks with their corresponding TaskCard components
function TodoList({ tasks, todoStatusTitle }: Readonly<TodoProps>) {
  return (
    <>
      {/* Display the title for the current todos status */}
      <h5 data-testid="todo" className="p-2">{todoStatusTitle}</h5>

      {/* Map through the tasks array and render a TaskCard component for each task */}
      {tasks.map((task, index) => (
        <TaskCard
          index={index}
          key={`${task?.title}-${task?.type}`}
          title={task?.title}
          type={task?.type}
          assignee={task?.assignee}
          id={task?._id}
          description={task.description}
        />
      ))}
    </>
  );
}

export default TodoList;
