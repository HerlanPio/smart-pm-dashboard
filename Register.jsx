import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

export default function Register() {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ username: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = e => {
    e.preventDefault();
    setError('');
    try {
      if (!form.username || !form.password || !form.confirm) throw new Error('Fill all fields');
      if (form.password.length < 6) throw new Error('Password must be >= 6 chars');
      if (form.password !== form.confirm) throw new Error('Passwords do not match');
      register(form.username.trim(), form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <h2>Create account</h2>
        {error && <div className="error">{error}</div>}
        <label>Username
          <input value={form.username} onChange={e => setForm({...form, username: e.target.value})} />
        </label>
        <label>Password
          <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        </label>
        <label>Confirm
          <input type="password" value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})} />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}