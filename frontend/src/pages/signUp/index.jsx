import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Ensure you have react-toastify installed

function Signup() { // <--- Changed name from Login to Signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const result = await axios.post("http://localhost:4000/auth/signup", {
        email,
        password,
        firstName,
        lastName,
        countryCode,
        phoneNumber,
      });
      toast.success(result.data.message);
      navigate("/login");
    } catch (error) {
      console.error("🚀 ~ handleSubmit ~ error:", error.response?.data);
      const errorMessage = error.response?.data?.message || "Une erreur est survenue lors de l'inscription.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleLoginClick = (event) => {
    event.preventDefault();
    navigate('/login');
  };

  return (
    <div className='bg-blue-400 h-screen flex items-center justify-center'>
      <div className='flex flex-row items-center justify-center w-[780px] h-[600px] bg-white border border-white rounded-xl'>

        <div className="w-1/2 h-full flex items-center justify-center overflow-hidden">
          <img src="/images/logo.jpg" alt="MSITLogo" className="rounded-full p-14 animate-jump" />
        </div>

        <div className='w-1/2 h-full flex flex-col  mr-4 py-2'>
          <label className='text-3xl font-bold text-gray-800 mb-2 mt-4'>Join Us</label>
          <label className='text-xl font-thin text-gray-600 mb-4'>Welcome to MSIT Conseil</label>
          <div className="w-72 border-b-2 border-gray-200 mb-2"></div>

          <div className="flex flex-col space-y-2 mr-5 ">
            <div>
              <label className='text-base font-extralight text-gray-950 ml-1'>First Name</label>
              <input
                type="text"
                className='border-2 border-gray-700 rounded-xl p-1 w-full text-sm'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className='text-base font-extralight text-gray-950 ml-1'>Last Name</label>
              <input
                type="text"
                className='border-2 border-gray-700 rounded-xl p-1 w-full text-sm'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label className='text-base font-extralight text-gray-950 ml-1'>Country Code</label>
              <input
                type="text"
                className='border-2 border-gray-700 rounded-xl p-1 w-full text-sm'
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                placeholder="+216"
              />
            </div>
            <div>
              <label className='text-base font-extralight text-gray-950 ml-1'>Phone Number</label>
              <input
                type="text"
                className='border-2 border-gray-700 rounded-xl p-1 w-full text-sm'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <label className='text-base font-extralight text-gray-950 ml-1'>Email</label>
              <input
                type="email"
                className='border-2 border-gray-700 rounded-xl p-1 w-full text-sm'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className='text-base font-extralight text-gray-950 ml-1'>Password</label>
              <input
                type="password"
                className='border-2 border-gray-700 rounded-xl p-1 w-full text-sm'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button onClick={handleSubmit} className='bg-blue-600 text-white rounded-xl p-2  mt-3 hover:bg-blue-900  mr-5'>
            Sign Up
          </button>

          {error && <p className="text-red-500 mt-3 text-xs">{error}</p>}

          <label className='font-thin text-gray-950 mt-1 text-sm'>Already have an account? 
            <a href="#" onClick={handleLoginClick} className='text-blue-700 hover:text-blue-500'> Log In</a>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Signup;
