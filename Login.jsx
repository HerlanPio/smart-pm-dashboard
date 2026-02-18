import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/auth.css';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = e => {
    e.preventDefault();
    setError('');
    try {
      if (!form.username || !form.password) throw new Error('Fill all fields');
      login(form.username.trim(), form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <h2>Welcome back</h2>
        {error && <div className="error">{error}</div>}
        <label>Username
          <input value={form.username} onChange={e => setForm({...form, username: e.target.value})} />
        </label>
        <label>Password
          <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        </label>
        <button type="submit">Login</button>
        <div className="muted">No account? <Link to="/register">Register</Link></div>
      </form>
    </div>
  );
}