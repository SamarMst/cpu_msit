import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import './App.css';
import './index.css';
import SignUp from './pages/signUp';
import Login from './pages/logIn';
import Loggedin from './pages/logIn/loggedIn';
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from './pages/ResetPassword'; 

function App() {
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/userInfo", element: <Loggedin /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/reset-password/:token", element: <ResetPassword /> },
    { path: "*", element: <Navigate to="/login" replace /> },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
