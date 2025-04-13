import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Index() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async(id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`)
           .then(alert('User Deleted Successfully'))
      window.location.reload();
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>List of Users</h1>
      <Link to='/create'className="text-green-500">Create User</Link>
      <table style={{ 
        borderCollapse: 'collapse',
        width: '100%',
        border: '1px solid black'
      }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Id</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Age</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
            {users.map((user)=>(
                <tr key={user._id}>
                <td style={{ border: '1px solid black', padding: '8px' }}>{user._id}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{user.name}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{user.email}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{user.age}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                    <Link to={`/edit/${user._id}`} className="text-blue-500">Edit</Link>
                </td>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                    <button  className="text-red-500" onClick={()=>handleDelete(user._id)}>Delete</button>
                </td>
                </tr>
            ))}
        
        </tbody>
      </table>
    </div>
  );
}