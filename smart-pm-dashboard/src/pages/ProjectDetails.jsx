import React, { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ProjectContext } from '../context/ProjectContext'
import { useToast } from '../components/ToastProvider'
import EditProjectModal from '../components/EditProjectModal'
import ConfirmModal from '../components/ConfirmModal'
import '../styles/project-details.css'

export default function ProjectDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { projects, updateProject, deleteProject, statuses } = useContext(ProjectContext)
  const { show } = useToast()
  
  const [project, setProject] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const found = projects.find(p => p.id === Number(id))
    if (found) {
      setProject(found)
    }
  }, [id, projects])

  if (!project) {
    return (
      <div className="project-details-page">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  const handleStatusChange = (newStatus) => {
    updateProject(project.id, { status: newStatus })
    show('Status updated successfully!', 'success')
    setProject(prev => ({ ...prev, status: newStatus }))
  }

  const handleDelete = () => {
    deleteProject(project.id)
    show('Project deleted successfully!', 'success')
    navigate('/dashboard')
  }

  const handleEditSave = (updatedData) => {
    setProject(prev => ({ ...prev, ...updatedData }))
    setIsEditModalOpen(false)
  }

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(' ', '-')
  }

  return (
    <div className="project-details-page">
      <div className="details-header">
        <button className="btn-back" onClick={() => navigate('/dashboard')}>
          ← Back
        </button>
        <div className="header-actions">
          <button className="btn-edit" onClick={() => setIsEditModalOpen(true)}>
            Edit Project
          </button>
          <button className="btn-delete" onClick={() => setIsDeleteModalOpen(true)}>
            Delete
          </button>
        </div>
      </div>

      <div className="details-content">
        <div className="details-card">
          <div className="card-main">
            <h1 className="project-title">{project.title}</h1>
            
            <div className="status-section">
              <label>Status:</label>
              <div className="status-options">
                {statuses.map(status => (
                  <button
                    key={status}
                    className={`status-btn ${getStatusClass(status)} ${project.status === status ? 'active' : ''}`}
                    onClick={() => handleStatusChange(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="description-section">
              <label>Description:</label>
              <p className="description">
                {project.description || 'No description provided.'}
              </p>
            </div>

            <div className="meta-section">
              <div className="meta-item">
                <span className="meta-label">Created:</span>
                <span className="meta-value">
                  {new Date(project.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Project ID:</span>
                <span className="meta-value">#{project.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <EditProjectModal 
          project={project} 
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditSave}
        />
      )}

      {isDeleteModalOpen && (
        <ConfirmModal
          title="Delete Project"
          message={`Are you sure you want to delete "${project.title}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          type="danger"
          onConfirm={handleDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  )
}
