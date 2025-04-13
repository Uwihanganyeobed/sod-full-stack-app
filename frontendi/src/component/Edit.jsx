import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Edit() {

    const navigate = useNavigate();
    const {id} = useParams();
    const [formData, setformData] = useState({
        name: '',
        age: '',
        email: '',
    });
    useEffect(()=>{
        getUser();
    },[])

    const handleChange = (e) => {
        setformData({...formData, [e.target.name]: e.target.value})
    }

    const getUser = async()=>{
        axios.get(`http://localhost:3000/users/${id}`)
        .then((res)=>setformData(res.data))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            axios.put(`http://localhost:3000/users/${id}`, formData)
            .then(alert('User Updated Successfully'))
            navigate('/')
            
        } catch (error) {
            console.log(error);
        }
        
    }

  return (
    <div>
      <h1>Edit User</h1>
      <form action="" onSubmit={handleSubmit}>
        Name: <input type="text" name="name"value={formData.name} onChange={handleChange} />  <br />
        Email: <input type="email" name="email"value={formData.email} onChange={handleChange} />  <br />
        Age: <input type="number" name="age"value={formData.age} onChange={handleChange} />  <br />
        <button type="submit">Update</button>
      </form>
    </div>
  )
}
