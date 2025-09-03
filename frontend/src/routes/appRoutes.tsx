import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/SignUp";
import Signin from "../pages/SignIn";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

const appRoutes = createBrowserRouter([
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
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default appRoutes;
