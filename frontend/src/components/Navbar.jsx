import React from 'react'
import { Link } from 'react-router-dom'

import { LogOut, Settings, Sparkles, User } from 'lucide-react'

import { useAuthStore } from '../store/useAuthStore'

const navLinks = [
  {
    path: '/settings',
    icon: Settings,
    label: 'Settings',
    showAlways: true
  },
  {
    path: '/profile',
    icon: User,
    label: 'Profile',
    showAlways: false
  }
]

const Navbar = () => {
  const { logout, authUser } = useAuthStore()

  const NavLink = ({ path, icon: Icon, label, showAlways }) => {
    if (!showAlways && !authUser) return null
    
    return (
      <Link
        to={path}
        className="btn btn-sm gap-2 transition-colors"
      >
        <Icon className="w-4 h-4" />
        <span className="hidden sm:inline">{label}</span>
      </Link>
    )
  }

  return (
    <header className='bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-md bg-base-100/80'>
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className='flex items-center gap-2.5 hover:opacity-60 transition-all'>
              <Sparkles className='w-5 h-5 text-primary' />
              <h1 className='text-lg font-bold'>Sparks</h1>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLink key={link.path} {...link} />
            ))}

            {authUser && (
              <button 
                className="flex gap-2 items-center" 
                onClick={logout}
              >
                <LogOut className="size-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar