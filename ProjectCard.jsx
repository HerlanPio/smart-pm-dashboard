import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/project-card.css';

function ProjectCard({ project, onDelete }) {
  const navigate = useNavigate();
  return (
    <div className="project-card">
      <h4 onClick={() => navigate(`/projects/${project.id}`)}>{project.title}</h4>
      <div className="meta">
        <small>{new Date(project.createdAt).toLocaleDateString()}</small>
        <span className="status">{project.status}</span>
      </div>
      <div className="card-actions">
        <button onClick={() => navigate(`/projects/${project.id}`)}>Open</button>
        <button className="danger" onClick={() => onDelete()}>Delete</button>
      </div>
    </div>
  );
}

export default memo(ProjectCard);