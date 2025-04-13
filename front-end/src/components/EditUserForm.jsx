import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditUserForm() {
  // useParams hook gives us access to URL parameters
  // Here we're getting the 'id' parameter from the URL
  const { id } = useParams();
  // useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // State to store the user data we're editing
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: ''
  });

  // useEffect hook runs when the component mounts
  // We use it to fetch the user data we want to edit
  useEffect(() => {
    getUser();
  }, []);

  // Function to fetch a single user's data
  const getUser = async () => {
    try {
      // Make a GET request to get the user's data
      const response = await axios.get(`http://localhost:3000/users/${id}`);
      // Update our state with the user's data
      setUser(response.data);
    } catch (error) {
      console.log('Error getting user:', error);
    }
  };

  // Function to handle input changes
  // Similar to the AddUserForm component
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a PUT request to update the user
      await axios.put(`http://localhost:3000/users/${id}`, user);
      // Show success message
      alert('User updated successfully!');
      // Navigate back to the home page
      navigate('/');
    } catch (error) {
      console.log('Error updating user:', error);
    }
  };

  return (
    // Main container with styling
    <div className="container mx-auto p-4">
      {/* Form title */}
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Edit User</h1>
      {/* Form element */}
      <form onSubmit={handleSubmit} className="max-w-md">
        {/* Name input field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        {/* Email input field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        {/* Age input field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Age</label>
          <input
            type="number"
            name="age"
            value={user.age}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update User
        </button>
      </form>
    </div>
  );
}
