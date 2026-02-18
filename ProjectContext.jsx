import React, { createContext, useEffect, useMemo, useState, useCallback } from 'react';
import { readFromStorage, saveToStorage } from '../utils/storage';

export const ProjectContext = createContext();
const PROJECTS_KEY = 'spm_projects';
const THEME_KEY = 'spm_theme';

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(() => readFromStorage(PROJECTS_KEY) || []);
  const [theme, setTheme] = useState(() => readFromStorage(THEME_KEY) || 'light');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate fetch delay
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    saveToStorage(PROJECTS_KEY, projects);
  }, [projects]);

  useEffect(() => {
    saveToStorage(THEME_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const addProject = project => {
    setProjects(prev => [{ ...project, id: Date.now(), createdAt: new Date().toISOString() }, ...prev]);
  };

  const updateProject = (id, patch) => {
    setProjects(prev => prev.map(p => (p.id === id ? { ...p, ...patch } : p)));
  };

  const deleteProject = id => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Derived collections and helpers (memoized)
  const statuses = useMemo(() => ['Pending', 'In Progress', 'Completed'], []);
  const getByStatus = useCallback(status => projects.filter(p => p.status === status), [projects]);

  // client-side pagination helper
  const paginate = (items, page = 1, perPage = 6) => {
    const start = (page - 1) * perPage;
    return items.slice(start, start + perPage);
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      addProject,
      updateProject,
      deleteProject,
      loading,
      statuses,
      getByStatus,
      theme, setTheme,
      paginate
    }}>
      {children}
    </ProjectContext.Provider>
  );
}