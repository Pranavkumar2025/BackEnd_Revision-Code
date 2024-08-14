import React, { useState } from 'react';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/adminSignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful:', data);
        setMessage('Signup successful!');
      } else {
        const errorData = await response.json();
        console.error('Signup failed:', errorData);
        setMessage('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Sign Up
      </button>
      {message && <p className="text-red-500 mt-4">{message}</p>}
    </form>
  );
};

export default SignUp;
