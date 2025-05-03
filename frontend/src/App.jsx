import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Settings from './pages/Settings.jsx'
import Profile from './pages/Profile.jsx'
import { Navigate, Route, Routes } from 'react-router-dom'
import { axiosInstance } from './lib/axios.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import { Loader } from 'lucide-react'
const App = () => {
  const {authUser,checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log({authUser});
  if (isCheckingAuth && !authUser){
    return (<div className='flex items-center justify-center h-screen'> <Loader className='size-20 animate-spin'/></div>)
  }

  return (
    <div>
      App
      <Routes>
      
        <Route path="/" element={authUser ? <Home /> : <Navigate to={<Login />}></Navigate>} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to={<Login />}></Navigate>} />
      
      </Routes>
    </div>
  )
}

export default App