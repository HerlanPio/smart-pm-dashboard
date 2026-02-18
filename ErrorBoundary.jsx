import React from 'react';

/*
  Error boundaries must be class components in React.
  This is the single exception to your functional-components requirement.
*/
export default class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasErr: false, err: null }; }
  static getDerivedStateFromError(err) { return { hasErr: true, err }; }
  componentDidCatch(err, info) { console.error('ErrorBoundary', err, info); }
  render() {
    if (this.state.hasErr) {
      return (
        <div style={{ padding: 40 }}>
          <h2>Something went wrong</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{String(this.state.err)}</pre>
          <button onClick={() => this.setState({ hasErr: false, err: null })}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}