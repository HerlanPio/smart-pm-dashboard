import React, { useContext, useMemo, useState, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import KanbanBoard from '../components/KanbanBoard';
import { ProjectContext } from '../context/ProjectContext';
import '../styles/dashboard.css';

export default function Dashboard() {
  const { projects, loading, searchTerm, setSearchTerm } = useContext(ProjectContext) || {};
  // For starter: simple layout with sidebar + topbar + kanban
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main">
        <Topbar />
        <main className="content">
          {loading ? (
            <div className="skeleton-grid">
              <div className="skeleton-card" />
              <div className="skeleton-card" />
              <div className="skeleton-card" />
            </div>
          ) : (
            <KanbanBoard />
          )}
        </main>
      </div>
    </div>
  );
}