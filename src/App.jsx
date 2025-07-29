import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TodoDashboard from "./pages/TodoDashboard";
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <TodoDashboard />
            </PrivateRoute>
          }
        />

        {/* Fallback 404 */}
        <Route path="*" element={<div className="text-center mt-20">404 - Page not found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
