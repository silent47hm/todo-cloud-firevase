import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm.jsx";
import TaskItem from "../components/Taskitem.jsx";
import { auth } from "../firebase/firebaseConfig";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { initTasks, getTasks, addTask, toggleTask, deleteTask } from "../pages/methodsTasks.js";

const TodoDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  // Initialize tasks listener when user changes
  useEffect(() => {
    if (!user) {
      setTasks([]);
      return;
    }

    const cleanup = initTasks(user.uid, (updatedTasks) => {
      setTasks(updatedTasks);
    });

    return cleanup; // Cleanup on unmount
  }, [user]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally show error to user
    }
  };

  const handleAddTask = async (title) => {
    try {
      await addTask(title, user.uid);
    } catch (error) {
      console.error("Failed to add task:", error);
      // Optionally show error to user
    }
  };

  const handleToggleTask = async (task) => {
    try {
      await toggleTask(task.id, task.isCompleted);
    } catch (error) {
      console.error("Failed to toggle task:", error);
    }
  };

  const handleDeleteTask = async (task) => {
    try {
      await deleteTask(task.id);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white shadow rounded">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hello, {user?.email}</h1>
        <button
          onClick={handleLogout}
          className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
        >
          Logout
        </button>
      </div>

      <TaskForm onAdd={handleAddTask} />

      <div className="mt-6 space-y-2">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No tasks yet. Add one!</p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={() => handleToggleTask(task)}
              onDelete={() => handleDeleteTask(task)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoDashboard;