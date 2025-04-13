import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserzList from './components/UserzList';
import AddUserForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserzList />} />
          <Route path="/add-user" element={<AddUserForm />} />
          <Route path="/edit-user/:id" element={<EditUserForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
