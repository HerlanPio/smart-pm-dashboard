import React, { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import KanbanBoard from '../components/KanbanBoard'
import SearchBar from '../components/SearchBar'
import AddProjectModal from '../components/AddProjectModal'
import { ProjectContext } from '../context/ProjectContext'
import '../styles/dashboard.css'

export default function Dashboard() {
  const { loading } = useContext(ProjectContext)
  const [showAddModal, setShowAddModal] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="app-layout">
      <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      <div className="main">
        <Topbar onMenuClick={() => setMobileMenuOpen(true)} />
        
        <main className="content">
          <div className="content-header">
            <h1>My Projects</h1>
            <button 
              className="btn-primary" 
              onClick={() => setShowAddModal(true)}
            >
              + Add Project
            </button>
          </div>
          
          <SearchBar />
          
          {loading ? (
            <div className="loading-skeleton">
              <div className="skeleton-grid">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="skeleton-card">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-text"></div>
                    <div className="skeleton-text short"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <KanbanBoard />
          )}
        </main>
      </div>

      {showAddModal && (
        <AddProjectModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  )
}
