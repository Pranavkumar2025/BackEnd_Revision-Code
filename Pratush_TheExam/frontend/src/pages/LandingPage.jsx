import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/admin');
  };

  const handleStudentClick = () => {
    navigate('/student');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Trustless Examination System</h1>
        <div className="space-x-4">
          <button
            onClick={handleAdminClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Admin
          </button>
          <button
            onClick={handleStudentClick}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
