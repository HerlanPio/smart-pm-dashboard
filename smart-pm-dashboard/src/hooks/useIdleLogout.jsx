import { useEffect, useRef } from 'react'

/**
 * Custom hook to handle idle logout
 * @param {Function} logout - The logout function to call after idle timeout
 * @param {number} idleTime - Idle time in milliseconds (default: 10 minutes = 600000ms)
 */
export function useIdleLogout(logout, idleTime = 600000) {
  const timeoutRef = useRef(null)

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      logout()
    }, idleTime)
  }

  useEffect(() => {
    // Events that indicate user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, resetTimer)
    })

    // Initialize the timer
    resetTimer()

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetTimer)
      })
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [logout, idleTime])
}

export default useIdleLogout
