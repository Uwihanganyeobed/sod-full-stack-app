import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {

    const {id}= useParams();
    const navigate= useNavigate();


    const [formData,setFormData]= useState({
        name: '',
        email: '',
        age: '',
    })

    
    useEffect(()=>{
        getUser();
    },[])


    //get User
    const getUser= async ()=>{
        try{
        const res= await axios.get(`http://localhost:3000/users/${id}`)
        setFormData(res.data)
        }catch(err){
            console.log(err);
        }
    }

    const handleChange= (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
        await axios.put(`http://localhost:3000/users/${id}`,formData)
        .then(alert('Data Updated successfully'))
        navigate('/')

        }catch(err){
            console.log(err);
        }
    }

  return (
    <div>
      <th> Edit User</th>
      <form action=""onSubmit={handleSubmit}>
        Name: <input type="text"name='name' placeholder='Name'onChange={handleChange} value={formData.name} />
        Email: <input type="email"name='email' placeholder='Email'onChange={handleChange} value={formData.email} />
        Age: <input type="number"name='age' placeholder='Age'onChange={handleChange} value={formData.age} />
        <button type='submit'>Update</button>
      </form>
    </div>
  )
}
