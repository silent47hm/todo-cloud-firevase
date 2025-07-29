import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="text-center mt-24">
      <h1 className="text-3xl font-bold mb-4">Welcome to TodoSync</h1>
      {user ? (
        <Link to="/dashboard" className="text-blue-600 underline">
          Go to Dashboard
        </Link>
      ) : (
        <>
          <Link to="/login" className="text-blue-600 underline mr-4">Login</Link>
          <Link to="/register" className="text-blue-600 underline">Register</Link>
        </>
      )}
    </div>
  );
};

export default Home;
