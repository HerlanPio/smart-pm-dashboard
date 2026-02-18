import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you're looking for doesn't exist.</p>
        <Link to="/dashboard" className="btn-home">
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
