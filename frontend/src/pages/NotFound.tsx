import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center flex-col">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <Link to="/signin" className="text-blue-600">
        Go back to Signin
      </Link>
    </div>
  );
}
