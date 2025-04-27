import { useState } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import './App.css'
import './index.css'
import SignUp from './pages/signUp'
import Login from './pages/logIn'

function App() {
  const router = createBrowserRouter([
    { path: "/login", element: <Login />},
    { path: "*", element: <Navigate to="/login" replace /> },
    { path: "/signup", element: <SignUp />}])
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
