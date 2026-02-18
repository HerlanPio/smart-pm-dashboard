import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/sidebar.css';

export default function Sidebar() {
  const { logout, user } = useContext(AuthContext);
  const n = useNavigate();
  return (
    <aside className="sidebar">
      <div className="brand">SmartPM</div>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/dashboard/projects">Projects</Link>
        <Link to="/dashboard/settings">Settings</Link>
      </nav>
      <div className="sidebar-footer">
        <div className="user">{user?.username}</div>
        <button onClick={() => { logout(); n('/login'); }}>Sign out</button>
      </div>
    </aside>
  );
}