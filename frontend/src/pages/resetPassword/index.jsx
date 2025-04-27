import { useParams } from 'react-router-dom';
import { useState } from 'react';

const ResetPassword = () => {
  const { token } = useParams();  
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleResetPassword = async () => {
    try {
      const response = await fetch('https://cpu-msit-samar-mestiris-projects.vercel.app/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage('Password reset successfully!');
      } else {
        setError(result.message || 'Something went wrong!');
      }
    } catch (err) {
      setError('Something went wrong!');
    }
  };

  return (
    <div className="reset-password-container">
      <h1>Reset Your Password</h1>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default ResetPassword;
