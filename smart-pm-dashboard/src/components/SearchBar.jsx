import React, { useContext } from 'react'
import { ProjectContext } from '../context/ProjectContext'
import '../styles/search-bar.css'

export default function SearchBar() {
  const { 
    searchTerm, 
    setSearchTerm, 
    sortBy, 
    setSortBy,
    filterStatus,
    setFilterStatus,
    statuses 
  } = useContext(ProjectContext)

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button 
            className="clear-btn" 
            onClick={() => setSearchTerm('')}
          >
            ×
          </button>
        )}
      </div>

      <div className="filter-controls">
        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Status</option>
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="date">Sort by Date</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>
    </div>
  )
}
