import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 

const ResetPassword = () => {
  const { token } = useParams()
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/user/forgot-password', { token, password });
      setMessage(response.data.message); 
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter new password"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
