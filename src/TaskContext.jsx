import { createContext, useReducer, useContext, useEffect } from "react";

const TaskContext = createContext();

const initialState = JSON.parse(localStorage.getItem("tasks")) || [];

function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];

    case "TOGGLE_TASK":
      return state.map((task, i) =>
        i === action.index ? { ...task, completed: !task.completed } : task
      );

    case "DELETE_TASK":
      return state.filter((_, i) => i !== action.index);

    case "EDIT_TASK":
      return state.map((task, i) =>
        i === action.index ? { ...task, text: action.newText } : task
      );

    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, initialState);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
