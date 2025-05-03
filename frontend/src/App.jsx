import React from 'react'
import Navbar from './components/Navbar.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Settings from './pages/Settings.jsx'
import Profile from './pages/Profile.jsx'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      App
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      
      </Routes>
    </div>
  )
}

export default App