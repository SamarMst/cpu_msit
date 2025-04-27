import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignupClick = (event) => {
    event.preventDefault(); 
    navigate('/signup');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:4000/auth/login', {
        email,
        password,
      });
  
      const token = response.data.data.token; 
      if (token) {
        localStorage.setItem('authToken', token);
        navigate('/userInfo'); 
      } else {
        setError('Token not received');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };
  
  
  

  return (
    <div className='bg-blue-400 h-screen flex items-center justify-center'>
      <div className='flex flex-row items-center justify-center w-[800px] h-[500px] bg-white border border-white rounded-xl'>
        <div className='w-1/2 h-full flex items-center justify-center overflow-hidden'>
          <img src='/images/logo.jpg' alt='MSITLogo' className='rounded-full p-14' />
        </div>
        <div className='w-1/2 h-full flex flex-col mt-20 ml-5'>
          <label className='text-3xl font-bold text-gray-800 mb-3 mt-3'>Welcome Back!</label>
          <label className='text-xl font-thin text-gray-600 mb-5'>We are glad to see you again</label>
          <div className='w-72 border-b-2 border-gray-200 mb-6 mr-1'></div>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <label className='text-base font-extralight text-gray-950 ml-1'>Email</label>
            <input
              type='text'
              className='border-2 border-gray-700 rounded-xl p-1 mr-10 text-sm mb-3'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className='flex justify-between items-center mr-8 ml-1'>
              <label className='text-base font-extralight text-gray-950'>Password</label>
              <Link to='/forgot-password' className='text-sm text-black-500 hover:text-blue-600 mr-2'>
                Forgot?
              </Link>
            </div>
            <input
              type='password'
              className='border-2 border-gray-700 rounded-xl p-1 mr-10 text-sm mb-3'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className='bg-blue-600 text-white rounded-xl p-1 mt-5 hover:bg-blue-900 mr-8'> {/* Type is submit */}
              Login
            </button>
          </form>

          {error && <p className="text-red-500 mt-3">{error}</p>}

          <label className='text-base font-thin text-gray-950 mt-5'>
            Don't have an account?{' '}
            <a
              href='#'
              className='text-blue-700 hover:text-blue-500'
              onClick={handleSignupClick}
            >
              Sigup
            </a>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Login;