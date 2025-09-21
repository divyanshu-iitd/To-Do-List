import { useState, useEffect } from "react";
import "./App.css";
import { TaskProvider } from "./TaskContext";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

// Initial background image
import defaultBg from "./s.jpg";

function App() {
  const storedBg = localStorage.getItem("bgImage");
  const [bgImage, setBgImage] = useState(storedBg || defaultBg);
  const [search, setSearch] = useState("");

  // Save uploaded background to localStorage
  useEffect(() => {
    if (bgImage !== defaultBg) {
      localStorage.setItem("bgImage", bgImage);
    }
  }, [bgImage]);

  // Apply background to body
  useEffect(() => {
    if (bgImage) {
      document.body.style.backgroundImage = `url(${bgImage})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
    } else {
      document.body.style.backgroundImage = "none";
    }
  }, [bgImage]);

  // Handle user upload
  const handleBackgroundChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setBgImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <TaskProvider>
      <div className="container">
        <h1>📝 To-Do List</h1>

        <div className="bg-upload-wrapper">
          <label htmlFor="bg-upload" className="bg-label">
            📸 Upload a photo for background:
          </label>
          <input
            type="file"
            id="bg-upload"
            accept="image/*"
            onChange={handleBackgroundChange}
            className="file-input"
          />
        </div>

        <TaskInput setSearch={setSearch} />
        <TaskList search={search} />
      </div>
    </TaskProvider>
  );
}

export default App;
