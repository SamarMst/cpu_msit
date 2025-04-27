import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginClick = (event) => {
    event.preventDefault(); 
    navigate('/login');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:4000/user/forgot-password', { email });
      setMessage('Password reset instructions sent to your email!');
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className='bg-blue-400 h-screen flex items-center justify-center'>
      <div className='flex flex-row items-center justify-center w-[800px] h-[500px] bg-white border border-white rounded-xl'>
        <div className='w-1/2 h-full flex items-center justify-center overflow-hidden'>
          <img src='/images/logo.jpg' alt='MSITLogo' className='rounded-full p-14' />
        </div>
        <div className='w-1/2 h-full flex flex-col mt-20 ml-5'>
          <label className='text-3xl font-bold text-gray-800 mb-3 mt-3'>Forgot Password?</label>
          <label className='text-xl font-thin text-gray-600 mb-5'>Please enter your email address</label>
          <div className='w-72 border-b-2 border-gray-200 mb-6 mr-1'></div>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <label className='text-base font-extralight text-gray-950 ml-1'>Email</label>
            <input
              type='email'
              className='border-2 border-gray-700 rounded-xl p-1 mr-10 text-sm mb-3'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className='bg-blue-600 text-white rounded-xl p-1 mt-5 hover:bg-blue-900 mr-8'>
              Reset Password
            </button>
          </form>

          {error && <p className="text-red-500 mt-3">{error}</p>}
          {message && <p className="text-green-500 mt-3">{message}</p>}

          <label className='text-base font-thin text-gray-950 mt-5'>
            Remember your password?{' '}
            <a
              href='#'
              className='text-blue-700 hover:text-blue-500'
              onClick={handleLoginClick}
            >
              Login
            </a>
          </label>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
