import { useState } from "react";
import { useTasks } from "../TaskContext";

function TaskInput({ setSearch }) {
  const { dispatch } = useTasks();
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [videoLink, setVideoLink] = useState("");

  const addTask = () => {
    if (task.trim() !== "") {
      dispatch({
        type: "ADD_TASK",
        payload: { 
          text: task, 
          completed: false, 
          priority, 
          videoLink 
        },
      });
      setTask("");
      setPriority("Medium");
      setVideoLink("");
    }
  };

  return (
    <div className="input-section">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">🔥 High</option>
        <option value="Medium">⚡ Medium</option>
        <option value="Low">🌱 Low</option>
      </select>

      <input
        type="text"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
        placeholder="YouTube video link (optional)"
      />

      <button onClick={addTask}>Add</button>

      <input
        type="text"
        placeholder="Search tasks..."
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
    </div>
  );
}

export default TaskInput;
