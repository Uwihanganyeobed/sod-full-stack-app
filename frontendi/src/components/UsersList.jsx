import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function UsersList(){
    const navigate= useNavigate();
    const [users,setUsers]= useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3000/users')
        .then((res)=>setUsers(res.data))
        .catch((err)=>console.log(err))

    },[])

    //delete user
    const handleDelete= async(id)=>{
        try{
            await axios.delete(`http://localhost:3000/users/${id}`)
            .then(alert('User Deleted Successfully'))
            .catch((err)=>console.log(err))
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className="p-4 max-w-4xl mx-auto">

        <Link to='/create'>Create User</Link>

      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">👧🧒 Userz Table</h1>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200 text-sm">
          <thead className="bg-blue-100 text-blue-700">
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Age</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
        {users.map((user)=>(
            <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <button className='text-blue-500' onClick={()=>navigate(`/edit/${user._id}`)}>Edit</button>
                <button className='text-red-500' onClick={()=>handleDelete(user._id)}>Delete</button>
            </tr>
        ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


