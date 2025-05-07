import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/useAuthStore.js'
import { useThemeStore } from './store/useTheme.js'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Settings from './pages/Settings.jsx'
import Profile from './pages/Profile.jsx'
import Navbar from './components/Navbar.jsx'

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()
  const { theme } = useThemeStore()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-20 animate-spin' />
      </div>
    )
  }

  const ProtectedRoute = ({ children }) => {
    return authUser ? children : <Navigate to="/login" />
  }

  const PublicRoute = ({ children }) => {
    return !authUser ? children : <Navigate to="/" />
  }

  return (
    <div data-theme="aqua">
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
