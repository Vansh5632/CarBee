import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const SignUpPage = ({ isOpen, onClose }) => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    dob: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const { username, dob, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log('Submitting form data:', formData);
    
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        { withCredentials: true }
      );

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      console.log('Response data:', response.data);

      if (response.status === 200) {
        console.log('Registration successful, token:', response.data.token);
        register(response.data.token);
        onClose();
      } else {
        console.error('Error registering:', response.data.msg || 'Unknown error');
        setError(response.data.msg || 'An error occurred during registration');
      }
    } catch (error) {
      console.error('Error details:', error);
      setError(`An unexpected error occurred: ${error.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-lg w-full shadow-lg">
        <h2 className="text-2xl mb-4">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username:</label>
            <input 
              type="text" 
              name="username" 
              value={username}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Date of Birth:</label>
            <input 
              type="date" 
              name="dob" 
              value={dob}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email:</label>
            <input 
              type="email" 
              name="email" 
              value={email}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password:</label>
            <input 
              type="password" 
              name="password" 
              value={password}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button 
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
            >
              Sign Up
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
