import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function UserForm() {

    const navigate= useNavigate();

    const [formData,setFormData]= useState({
        name: '',
        email: '',
        age: '',
    })

    const handleChange= (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit= (e)=>{
        e.preventDefault();
        try{
        axios.post('http://localhost:3000/users',formData)
        .then(alert('Data was sent successfully'))
        navigate('/')

        }catch(err){
            console.log(err);
        }
    }

  return (
    <div>
      <th> My Form Of Users</th>
      <form action=""onSubmit={handleSubmit}>
        Name: <input type="text"name='name' placeholder='Name'onChange={handleChange} />
        Email: <input type="email"name='email' placeholder='Email'onChange={handleChange} />
        Age: <input type="number"name='age' placeholder='Age'onChange={handleChange} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
