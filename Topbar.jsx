import React, { useContext } from 'react';
import { ProjectContext } from '../context/ProjectContext';
import '../styles/topbar.css';

export default function Topbar() {
  const { theme, setTheme } = useContext(ProjectContext);
  const toggle = () => setTheme(theme === 'light' ? 'dark' : 'light');
  return (
    <header className="topbar">
      <div>Search / Filters (placeholder)</div>
      <div className="topbar-actions">
        <button onClick={toggle}>{theme === 'light' ? 'Dark' : 'Light'}</button>
      </div>
    </header>
  );
}