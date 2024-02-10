import React, { useReducer, useRef, useEffect } from "react";
import "./App.css";

const initialState = {
  tasks: [],
  showTasks: false, // Added state to control visibility
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { id: Date.now(), text: action.payload, hidden: false },
        ],
        showTasks: true, // Show tasks when a task is added
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, hidden: !task.hidden } : task
        ),
      };
    default:
      return state;
  }
}

const TaskList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const tasksEndRef = useRef(null); // Ref to the end of tasks list
  const inputRef = useRef(null); // Ref to the input field

  useEffect(() => {
    if (tasksEndRef.current) {
      tasksEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [state.tasks]);

  const addTask = (taskText) => {
    dispatch({ type: "ADD_TASK", payload: taskText });
  };

  const toggleTask = (taskId) => {
    dispatch({ type: "TOGGLE_TASK", payload: taskId });
  };

  const scrollToInput = () => {
    inputRef.current.scrollIntoView({ behavior: "smooth" });
    inputRef.current.focus();
  };

  return (
    <div className="task-list-container">
      <input
        type="text"
        ref={inputRef}
        placeholder="Add a task..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask(e.target.value);
            e.target.value = "";
          }
        }}
      />
      {state.showTasks && (
        <div className="tasks-container">
          {state.tasks.map((task) => (
            <div key={task.id} className="task-item">
              <div className="task-text">
                {task.hidden ? "Content Hidden" : task.text}
              </div>
              <button onClick={() => toggleTask(task.id)}>Toggle</button>
            </div>
          ))}
          <div ref={tasksEndRef} className="end-of-tasks" />{" "}
          {/* Ref to the end of tasks list */}
          <button className="back-to-input" onClick={scrollToInput}>
            Get Back Writing
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;