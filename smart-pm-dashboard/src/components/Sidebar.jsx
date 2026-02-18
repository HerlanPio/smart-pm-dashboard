import React, { useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import '../styles/sidebar.css'

export default function Sidebar({ isOpen, onClose }) {
  const { logout, user } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
    if (onClose) onClose()
  }

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="brand">SmartPM</div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <nav className="sidebar-nav">
          <Link 
            to="/dashboard" 
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
            onClick={onClose}
          >
            <span className="nav-icon">📊</span>
            Dashboard
          </Link>
          <Link 
            to="/dashboard/projects" 
            className={`nav-link ${isActive('/dashboard/projects') ? 'active' : ''}`}
            onClick={onClose}
          >
            <span className="nav-icon">📁</span>
            Projects
          </Link>
          <Link 
            to="/dashboard/settings" 
            className={`nav-link ${isActive('/dashboard/settings') ? 'active' : ''}`}
            onClick={onClose}
          >
            <span className="nav-icon">⚙️</span>
            Settings
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <span className="user-name">{user?.username}</span>
              <span className="user-role">User</span>
            </div>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </aside>
    </>
  )
}
