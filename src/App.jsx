import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import AWeather from "./template/Weather";

/*
  The app has just two pages:

    /         Home    - the landing page with the "Check My Weather" button
    /weather  Weather - shows the weather and the suggestion
*/
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/weather", element: <AWeather /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
