import ProtectedRoute from "@/components/ProtectedRoute";
import MainLayout from "@/layouts";
import { AddProjectPage, LoginPage, OverviewPage, ProjectsPage } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute children={<MainLayout />} />,
    children: [
      {
        index: true,
        element: <OverviewPage />,
      },
      {
        path: "overview",
        element: <OverviewPage />,
      },
      {
        path: "projects",
        element: <ProjectsPage />,
      },
      {
        path: "add-project",
        element: <AddProjectPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
