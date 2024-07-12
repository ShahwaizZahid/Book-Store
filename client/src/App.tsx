import Home from "./components/Pages/Home";
import Courses from "./components/Pages/Courses";
import SignUp from "./components/ui/SignUp";
import Login from "./components/ui/Login";
import OtpInput from "./components/Pages/Otp";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/Auth";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const browserRouter = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/otp",
        element: <OtpInput />,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={browserRouter} />
        <Toaster />
      </AuthContextProvider>
    </>
  );
}
