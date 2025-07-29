import TaskForm from "../components/TaskForm.jsx"
import TaskItem from "../components/Taskitem.jsx";
import { useTasks } from "../hooks/useTasks";
import { auth } from "../firebase/firebaseConfig";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const TodoDashboard = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white shadow rounded">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hello, {user?.email}</h1>
        <button
          onClick={handleLogout}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <TaskForm onAdd={addTask} />

      <div className="mt-6 space-y-2">
        {tasks.length === 0 && <p>No tasks yet. Add one!</p>}
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={() => toggleTask(task)}
            onDelete={() => deleteTask(task)}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoDashboard;
