import React, { useContext } from 'react'
import { ProjectContext } from '../context/ProjectContext'
import '../styles/topbar.css'

export default function Topbar({ onMenuClick }) {
  const { theme, setTheme } = useContext(ProjectContext)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-btn" onClick={onMenuClick}>
          ☰
        </button>
        <h2 className="page-title">Project Dashboard</h2>
      </div>
      
      <div className="topbar-right">
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  )
}
