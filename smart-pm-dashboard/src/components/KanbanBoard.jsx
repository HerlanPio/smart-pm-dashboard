import React, { useContext, useState, useCallback } from 'react'
import { ProjectContext } from '../context/ProjectContext'
import ProjectCard from './ProjectCard'
import '../styles/kanban.css'

export default function KanbanBoard() {
  const { filteredProjects, statuses, updateProject, deleteProject, getByStatus } = useContext(ProjectContext)
  const [draggedId, setDraggedId] = useState(null)

  const handleDragStart = (e, id) => {
    setDraggedId(id)
    e.dataTransfer.setData('text/plain', String(id))
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragEnd = () => {
    setDraggedId(null)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = useCallback((e, status) => {
    e.preventDefault()
    const id = Number(e.dataTransfer.getData('text/plain'))
    if (id && draggedId) {
      updateProject(id, { status })
    }
    setDraggedId(null)
  }, [draggedId, updateProject])

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProject(id)
    }
  }

  return (
    <div className="kanban-container">
      {statuses.map(status => (
        <div 
          key={status} 
          className="kanban-column"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, status)}
        >
          <div className="column-header">
            <span className="status-dot" data-status={status.toLowerCase().replace(' ', '-')}></span>
            <h3>{status}</h3>
            <span className="count">{getByStatus(status).length}</span>
          </div>
          
          <div className="column-body">
            {getByStatus(status).map(project => (
              <div
                key={project.id}
                draggable
                onDragStart={(e) => handleDragStart(e, project.id)}
                onDragEnd={handleDragEnd}
                className={`draggable-item ${draggedId === project.id ? 'dragging' : ''}`}
              >
                <ProjectCard 
                  project={project} 
                  onDelete={() => handleDelete(project.id, project.title)}
                />
              </div>
            ))}
            
            {getByStatus(status).length === 0 && (
              <div className="empty-column">
                <p>No projects</p>
                <p className="hint">Drag projects here</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
