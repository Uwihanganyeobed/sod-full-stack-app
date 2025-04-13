import React from 'react'
import Index from './component/Index'
import Form from './component/Form'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Edit from './component/Edit'
export default function App(){
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/create' element={<Form />} />
          <Route path='/edit/:id' element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}