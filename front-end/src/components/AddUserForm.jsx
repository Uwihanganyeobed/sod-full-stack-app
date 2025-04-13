import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AddUserForm() {
    // useNavigate is a hook from react-router-dom that gives us a function to navigate programmatically
    const navigate = useNavigate()

    // We create a state object to store our form data
    // Each field (name, email, age) is initialized as an empty string
    const [user, setUser] = useState({
        name: '',
        email: '',
        age: ''
    })

    // This function handles changes in our form inputs
    // e.target.name gives us the name of the input field that changed
    // e.target.value gives us the new value
    // We use the spread operator (...) to keep the other fields unchanged
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    // This function handles the form submission
    const handleSubmit = async (e) => {
        // Prevent the default form submission behavior
        e.preventDefault()
        try {
            // Send a POST request to our API with the user data
            await axios.post('http://localhost:3000/users', user)
            // Show a success message
            alert('User added successfully!')
            // Navigate back to the home page
            navigate('/')
        } catch (error) {
            // If something goes wrong, log the error
            console.log('Error adding user:', error)
        }
    }

    return (
        // Main container with some basic styling
        <div className="container mx-auto p-4">
            {/* Form title */}
            <h1 className="text-2xl font-bold text-blue-600 mb-4">Add New User</h1>
            {/* Form element with onSubmit handler */}
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
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Add User
                </button>
            </form>
        </div>
    )
}
