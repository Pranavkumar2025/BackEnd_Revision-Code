

import React, { useState } from 'react';
import Login from '../components/AdminLogin';
import SignUp from '../components/AdminSignUp';

const AdminPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">{isLogin ? 'Admin Login' : 'Admin Sign Up'}</h1>
        {isLogin ? <Login /> : <SignUp />}
        <button
          onClick={toggleForm}
          className="mt-4 text-blue-500 hover:text-blue-700 underline"
        >
          {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
        </button>
      </div>
    </div>
  );
};

export default AdminPage;

