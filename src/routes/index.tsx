import App from "@/App";
import { Dashboard } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

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
    ],
  },
]);

export default router;
