import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { useToast } from '../components/ToastProvider'
import '../styles/auth.css'

export default function Register() {
  const { register } = useContext(AuthContext)
  const { show } = useToast()
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validation
      if (!form.username || !form.password || !form.confirmPassword) {
        throw new Error('Please fill in all fields')
      }
      
      if (form.username.trim().length < 3) {
        throw new Error('Username must be at least 3 characters')
      }
      
      if (form.password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }
      
      if (form.password !== form.confirmPassword) {
        throw new Error('Passwords do not match')
      }

      register(form.username.trim(), form.password)
      show('Account created successfully!', 'success')
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join SmartPM to manage your projects</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="Choose a username"
            autoComplete="username"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Choose a password (min 6 chars)"
            autoComplete="new-password"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            placeholder="Confirm your password"
            autoComplete="new-password"
          />
        </div>
        
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </button>
        
        <div className="auth-footer">
          <span>Already have an account?</span>
          <Link to="/login" className="link">Sign In</Link>
        </div>
      </form>
    </div>
  )
}
