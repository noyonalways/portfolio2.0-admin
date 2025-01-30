import { RouterProvider } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./context/theme-provider";
import router from "./routes";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
