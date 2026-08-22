import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Weather from "./pages/Weather";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/weather", element: <Weather /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}