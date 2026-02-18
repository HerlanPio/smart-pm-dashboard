import React, { createContext, useEffect, useMemo, useState, useCallback } from 'react'
import { readFromStorage, saveToStorage } from '../utils/storage'

export const ProjectContext = createContext()

const PROJECTS_KEY = 'spm_projects'
const THEME_KEY = 'spm_theme'

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(() => readFromStorage(PROJECTS_KEY) || [])
  const [theme, setTheme] = useState(() => readFromStorage(THEME_KEY) || 'light')
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date') // 'date' or 'title'
  const [filterStatus, setFilterStatus] = useState('all') // 'all' or status

  // Simulate fetch delay
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    saveToStorage(PROJECTS_KEY, projects)
  }, [projects])

  useEffect(() => {
    saveToStorage(THEME_KEY, theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const addProject = useCallback((project) => {
    const newProject = {
      ...project,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: project.status || 'Pending'
    }
    setProjects(prev => [newProject, ...prev])
  }, [])

  const updateProject = useCallback((id, patch) => {
    setProjects(prev => prev.map(p => (p.id === id ? { ...p, ...patch } : p)))
  }, [])

  const deleteProject = useCallback((id) => {
    setProjects(prev => prev.filter(p => p.id !== id))
  }, [])

  const getProjectById = useCallback((id) => {
    return projects.find(p => p.id === Number(id))
  }, [projects])

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let result = [...projects]
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(p => 
        p.title?.toLowerCase().includes(term) || 
        p.description?.toLowerCase().includes(term)
      )
    }
    
    // Filter by status
    if (filterStatus !== 'all') {
      result = result.filter(p => p.status === filterStatus)
    }
    
    // Sort
    if (sortBy === 'title') {
      result.sort((a, b) => (a.title || '').localeCompare(b.title || ''))
    } else {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
    
    return result
  }, [projects, searchTerm, filterStatus, sortBy])

  // Statuses
  const statuses = useMemo(() => ['Pending', 'In Progress', 'Completed'], [])

  const getByStatus = useCallback((status) => {
    return filteredProjects.filter(p => p.status === status)
  }, [filteredProjects])

  // Client-side pagination helper
  const paginate = useCallback((items, page = 1, perPage = 6) => {
    const start = (page - 1) * perPage
    return {
      items: items.slice(start, start + perPage),
      total: items.length,
      totalPages: Math.ceil(items.length / perPage),
      currentPage: page,
      perPage
    }
  }, [])

  return (
    <ProjectContext.Provider value={{
      projects,
      filteredProjects,
      addProject,
      updateProject,
      deleteProject,
      getProjectById,
      loading,
      statuses,
      getByStatus,
      theme, 
      setTheme,
      searchTerm, 
      setSearchTerm,
      sortBy,
      setSortBy,
      filterStatus,
      setFilterStatus,
      paginate
    }}>
      {children}
    </ProjectContext.Provider>
  )
}
