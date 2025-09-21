import { useTasks } from "../TaskContext";

function TaskItem({ task, index }) {
  const { dispatch } = useTasks();

  // Convert normal YouTube link to embed URL
  const getEmbedUrl = (url) => {
    if (!url) return null;
    const videoIdMatch = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
  };

  const embedUrl = getEmbedUrl(task.videoLink);

  return (
    <li className={`task ${task.completed ? "completed" : ""} ${task.priority.toLowerCase()}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => dispatch({ type: "TOGGLE_TASK", index })}
      />

      <span
        contentEditable={!task.completed}
        suppressContentEditableWarning={true}
        onBlur={(e) =>
          dispatch({
            type: "EDIT_TASK",
            index,
            newText: e.target.textContent,
            newPriority: task.priority,
            newVideoLink: task.videoLink
          })
        }
      >
        {task.text}
      </span>

      <span className="priority">[{task.priority}]</span>

      <button onClick={() => dispatch({ type: "DELETE_TASK", index })}>
        ❌
      </button>

      {embedUrl && (
        <div className="video-container">
          <iframe
            width="320"
            height="180"
            src={embedUrl}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </li>
  );
}

export default TaskItem;
