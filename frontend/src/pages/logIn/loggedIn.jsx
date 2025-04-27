import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import Navbar from '../navbar';
import '../../App.css';

function Loggedin() {
  const [userInfo, setUserInfo] = useState(null);  
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const handleSignupClick = (event) => {
    event.preventDefault(); 
    navigate('/signup');
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error("Token is missing from localStorage");
        return;
      }
      
      const response = await axios.get('http://localhost:4000/user/userInfo', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.data.success) {
        console.log('User Data:', response.data.data); 
        setUserInfo(response.data.data); 
      } else {
        console.error(response.data.message);
        setError(response.data.message); 
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Error fetching user data"); 
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);  

  return (
    <>
      <Navbar />
      <div className="h-[591px] flex">
        <div className="w-1/2 flex flex-col items-center justify-center">
          <img src='/images/robot.gif' alt='WelcomeRobot' className='mt-[-20px]' />
        </div>
        <div className="w-1/2 flex flex-col justify-center items-start pl-10">
          <h1 className="text-5xl font-bold text-green-600">Welcome !!!</h1>

          {userInfo ? (
            <div className="bg-white text-black border-2 border-black p-6 mt-4 rounded-md shadow-lg">
              <h2 className="text-2xl font-extrabold text-blue-700 mb-4">User Information</h2>
              <p className="text-lg mb-2">Email: <span className="font-medium text-black">{userInfo.email}</span></p>
              <p className="text-lg mb-2">Full Name: <span className="font-medium text-black">{userInfo.fullName || "N/A"}</span></p>
              <p className="text-lg mb-2">Phone: <span className="font-medium text-black">{userInfo.formattedPhoneNumber || "N/A"}</span></p>
              <p className="text-lg mb-4">Account Created: <span className="font-medium text-black">{new Date(userInfo.createdAt).toLocaleDateString()}</span></p>
            </div>
          ) : (
            <p className="text-lg text-gray-500">Loading user data...</p>
          )}

          {error && <div className="text-red-500 mt-4 text-xl">{error}</div>}
        </div>
      </div>
    </>
  );
}

export default Loggedin;
