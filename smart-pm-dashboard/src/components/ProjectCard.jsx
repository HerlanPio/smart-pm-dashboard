import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/project-card.css'

function ProjectCard({ project, onDelete }) {
  const navigate = useNavigate()

  const handleClick = (e) => {
    // Don't navigate if clicking on delete button
    if (e.target.tagName === 'BUTTON') return
    navigate(`/projects/${project.id}`)
  }

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(' ', '-')
  }

  return (
    <div className="project-card" onClick={handleClick}>
      <div className="card-header">
        <h4 className="card-title">{project.title}</h4>
        <span className={`status-badge ${getStatusClass(project.status)}`}>
          {project.status}
        </span>
      </div>
      
      <p className="card-description">
        {project.description || 'No description'}
      </p>
      
      <div className="card-footer">
        <span className="card-date">
          {new Date(project.createdAt).toLocaleDateString()}
        </span>
        <div className="card-actions">
          <button 
            className="btn-icon" 
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/projects/${project.id}`)
            }}
            title="View details"
          >
            👁
          </button>
          <button 
            className="btn-icon danger" 
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            title="Delete"
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(ProjectCard)
