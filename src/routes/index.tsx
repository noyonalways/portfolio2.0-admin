import App from "@/App";
import { AuthLayout } from "@/layouts";
import ProtectedRoute from "@/layouts/protected";
import { AddCategory, AddProject, Dashboard, Login, WriteBlog } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        index: true,
      },
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/add-project",
        element: <AddProject />,
      },
      {
        path: "/write-blog",
        element: <WriteBlog />,
      },
      {
        path: "/add-category",
        element: <AddCategory />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
