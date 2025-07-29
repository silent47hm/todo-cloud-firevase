// src/components/TaskItem.jsx
const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
      <div
        onClick={() => onToggle(task)}
        className={`cursor-pointer flex-1 ${task.isCompleted ? "line-through text-gray-500" : ""}`}
      >
        {task.title}
      </div>
      <button
        onClick={() => onDelete(task)}
        className="ml-2 text-red-500 hover:text-red-700"
      >
        ✕
      </button>
    </div>
  );
};

export default TaskItem;
