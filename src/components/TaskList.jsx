import { useState } from "react";
import { useTasks } from "../TaskContext";
import TaskItem from "./TaskItem";

function TaskList({ search }) {
  const { tasks } = useTasks();
  const [filter, setFilter] = useState("All");

  const filteredTasks = tasks
    .filter((t) => {
      if (filter === "All") return true;
      if (filter === "Completed") return t.completed;
      if (filter === "Pending") return !t.completed;
      return true;
    })
    .filter((t) =>
      t.text.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const priorityOrder = { High: 0, Medium: 1, Low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div>
      {/* Progress bar */}
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <p>{completedCount} of {tasks.length} tasks completed</p>

      {/* Filter buttons */}
      <div className="filters">
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
        <button onClick={() => setFilter("Pending")}>Pending</button>
      </div>

      <ul>
        {filteredTasks.map((t, index) => (
          <TaskItem key={index} task={t} index={index} />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
