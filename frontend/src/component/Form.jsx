import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Form() {

    const navigate = useNavigate();

    const [formData, setformData] = useState({
        name: '',
        age: '',
        email: '',
    });

    const handleChange = (e) => {
        setformData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            axios.post('http://localhost:3000/users', formData)
            .then(alert('User Added Successfully'))
            navigate('/')
            
        } catch (error) {
            console.log(error);
        }
        
    }

  return (
    <div>
      <h1>Users Form</h1>
      <form action="" onSubmit={handleSubmit}>
        Name: <input type="text" name="name"value={formData.name} onChange={handleChange} />  <br />
        Email: <input type="email" name="email"value={formData.email} onChange={handleChange} />  <br />
        Age: <input type="number" name="age"value={formData.age} onChange={handleChange} />  <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
