import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Assurez-vous d'avoir react-toastify installé

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Réinitialiser l'erreur à chaque soumission
    try {
      const result = await axios.post("http://localhost:4000/auth/signup", {
        email,
        password,
      });
      toast.success(result.data.message);
      navigate("/login");
    } catch (error) {
      console.error("🚀 ~ handleSubmit ~ error:", error.response?.data);
      const errorMessage = error.response?.data?.message || "Une erreur est survenue lors de l'inscription.";
      setError(errorMessage); // Mettre à jour l'état de l'erreur
      toast.error(errorMessage); // Afficher l'erreur via react-toastify
    }
  };

  const handleLoginClick = (event) => {
    event.preventDefault();
    navigate('/login');
  };

  return (
    <div className='bg-gray-200 h-screen flex items-center justify-center'>
      <div className='flex flex-row items-center justify-center w-[800px] h-[500px] bg-white border border-white rounded-xl'>

        {/* Second div */}
        <div className="w-1/2 h-full flex items-center justify-center overflow-hidden">
          <img src="/images/logo.jpg" alt="MSITLogo" className="rounded-full p-14" />
        </div>

        {/* First div */}
        <div className='w-1/2 h-full flex flex-col mt-20 ml-5'>
          <label className='text-3xl font-bold text-gray-800 mb-3 mt-3'>Join Us</label>
          <label className='text-xl font-thin text-gray-600 mb-5'>Welcome to MSIT Conseil</label>
          <div className="w-72 border-b-2 border-gray-200 mb-6 mr-1"></div>
          <label className='text-base font-extralight text-gray-950 ml-1'>Email</label>
          <input
            type="text"
            className='border-2 border-gray-700 rounded-xl p-1 mr-10 text-sm mb-3'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className='text-base font-extralight text-gray-950'>Password</label>
          <input
            type="password"
            className='border-2 border-gray-700 rounded-xl p-1 mr-10 text-sm mb-3'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleSubmit} className='bg-blue-600 text-white rounded-xl p-1 mt-5 hover:bg-blue-900 mr-8'>Sign Up</button>

          {error && <p className="text-red-500 mt-3">{error}</p>} {/* Affichage de l'erreur */}

          <label className='text-base font-thin text-gray-950 mt-5'>Already have an account? <a href="#" onClick={handleLoginClick} className='text-blue-700 hover:text-blue-500'>Log In</a></label>

        </div>


      </div>
    </div>
  );
}

export default Login;