import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/SignUp";
import Signin from "../pages/SignIn";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import Home from "../components/Home";
import ProtectedRoute from "../components/ProtectedRoute";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default appRoutes;
