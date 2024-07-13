import React from "react";
import Home from "./components/Pages/Home";
import Courses from "./components/Pages/Courses";
import SignUp from "./components/ui/SignUp";
import Login from "./components/ui/Login";
import OtpInput from "./components/Pages/Otp";
import { Toaster } from "react-hot-toast";
import ContactUs from "./components/Pages/ContactUs";
import { AuthContextProvider, useAuthContext } from "./context/Auth";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

function AppRoutes() {
  // Get the user context inside the route setup
  const { user } = useAuthContext();

  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/courses",
      element: user.user ? <Courses /> : <Navigate to="/login" />,
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
    {
      path: "/contact",
      element: <ContactUs />,
    },
  ]);

  return <RouterProvider router={browserRouter} />;
}

export default function App() {
  return (
    <AuthContextProvider>
      <AppRoutes />
      <Toaster />
    </AuthContextProvider>
  );
}
