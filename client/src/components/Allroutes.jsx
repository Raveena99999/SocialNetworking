import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Posts from '../pages/Posts'
import Userprofile from '../pages/Userprofile'

export default function Allroutes() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Dashboard/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/posts' element={<Posts/>}></Route>
           <Route path='/userprofile' element={<Userprofile/>}></Route>
        </Routes>
    </div>
  )
}
