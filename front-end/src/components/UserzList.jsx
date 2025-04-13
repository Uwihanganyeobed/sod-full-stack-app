import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function UserzList() {
  // useState is a React Hook that lets us add state to our component
  // Here we're creating a state variable 'users' initialized as an empty array
  // setUsers is the function we'll use to update this state
  const [users, setUsers] = useState([]);

  // useEffect is another React Hook that runs after the component renders
  // The empty array [] means this effect runs only once when the component mounts
  // This is where we fetch our initial data
  useEffect(() => {
    getUsers();
  }, []);

  // This is an async function to fetch users from our API
  // async/await is a modern way to handle promises in JavaScript
  // It makes our code look synchronous even though it's asynchronous
  const getUsers = async () => {
    try {
      // axios.get makes a GET request to our API endpoint
      // We store the response in a variable
      const response = await axios.get('http://localhost:3000/users');
      // We update our state with the data from the response
      setUsers(response.data);
    } catch (error) {
      // If something goes wrong, we log the error
      console.log('Error getting users:', error);
    }
  };

  // Function to delete a user
  // It takes the user's ID as a parameter
  const deleteUser = async (id) => {
    try {
      // axios.delete makes a DELETE request to our API
      // We use template literals (`) to include the ID in the URL
      await axios.delete(`http://localhost:3000/users/${id}`);
      // Show a success message to the user
      alert('User deleted successfully!');
      // Refresh the list by calling getUsers again
      getUsers();
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  };

  return (
    // Container with some basic styling
    <div className="container mx-auto p-4">
      {/* Header section with title and add button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-600">Users List</h1>
        {/* Link component from react-router-dom for navigation */}
        <Link 
          to="/add-user" 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add New User
        </Link>
      </div>

      {/* Conditional rendering: if no users, show a message */}
      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users found</p>
      ) : (
        // Table to display user data
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Age</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* map function to iterate through users array */}
              {/* Each user needs a unique key prop (we're using _id) */}
              {users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.age}</td>
                  <td className="px-4 py-2">
                    {/* Link to edit page with user ID in the URL */}
                    <Link
                      to={`/edit-user/${user._id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                    >
                      Edit
                    </Link>
                    {/* Delete button with onClick handler */}
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
