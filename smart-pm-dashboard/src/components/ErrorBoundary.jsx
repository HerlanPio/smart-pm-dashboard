import React from 'react'

/*
  Error boundaries must be class components in React.
  This is the single exception to the functional-components requirement.
*/
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <h1>Something went wrong</h1>
            <p>We're sorry, but something unexpected happened.</p>
            {this.state.error && (
              <div className="error-details">
                <pre>{this.state.error.toString()}</pre>
              </div>
            )}
            <button className="btn-primary" onClick={this.handleRetry}>
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
