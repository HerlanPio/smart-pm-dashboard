import React, { useContext, useMemo, useState, useCallback } from 'react';
import { ProjectContext } from '../context/ProjectContext';
import ProjectCard from './ProjectCard';
import '../styles/kanban.css';

/*
  Simple HTML5 drag and drop:
  - draggable items set dataTransfer with id
  - drop zones handle onDrop, update project status via context.updateProject
*/
export default function KanbanBoard() {
  const { projects, statuses, updateProject, deleteProject, addProject } = useContext(ProjectContext);
  const [showNew, setShowNew] = useState(false);

  const onDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', String(id));
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDropTo = (e, status) => {
    e.preventDefault();
    const id = Number(e.dataTransfer.getData('text/plain'));
    updateProject(id, { status });
  };

  const allowDrop = e => e.preventDefault();

  return (
    <div className="kanban">
      {statuses.map(status => (
        <section
          key={status}
          className="kanban-column"
          onDragOver={allowDrop}
          onDrop={e => onDropTo(e, status)}
        >
          <div className="column-header">{status}</div>
          <div className="column-body">
            {projects.filter(p => p.status === status).map(p => (
              <div key={p.id} draggable onDragStart={e => onDragStart(e, p.id)}>
                <ProjectCard project={p} onDelete={() => deleteProject(p.id)} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}