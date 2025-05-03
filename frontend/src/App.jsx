import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App