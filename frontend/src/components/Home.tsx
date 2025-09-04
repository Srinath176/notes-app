import { Loader } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-around items-center px-6 py-4 bg-white shadow">
        <div className="flex items-center">
          <div className="h-6 w-6 rounded-full text-blue-500 mr-2"><Loader /></div>
          <span className="text-xl font-semibold">HD</span>
        </div>
        <div className="space-x-4">
          <Link to="/signin" className="text-blue-600 font-medium">Sign in</Link>
          <Link to="/signup" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            Sign up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-bold mb-4">Take Notes Anywhere</h1>
        <p className="text-gray-600 mb-6 max-w-md">
          A simple and secure notes app. Login to get started.
        </p>
        <Link
          to="/signin"
          className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Get Started
        </Link>
      </main>
    </div>
  );
};

export default Home;
