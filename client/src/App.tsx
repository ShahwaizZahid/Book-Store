import Home from "./components/Pages/Home";
import Courses from "./components/Pages/Courses";
import SignUp from "./components/Pages/SignUp";
import Login from "./components/Pages/Login";
import OtpInput from "./components/Pages/Otp";
import { Toaster } from "react-hot-toast";
import ContactUs from "./components/Pages/ContactUs";
import About from "./components/Pages/AboutUs";
import { AuthContextProvider, useAuthContext } from "./context/Auth";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import BookDetail from "./components/Pages/BookDetails";

function AppRoutes() {
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
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/detail/:id",
      element: <BookDetail />,
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
