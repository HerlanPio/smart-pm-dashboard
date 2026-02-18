/**
 * Storage utility functions for localStorage operations
 */

const isClient = typeof window !== 'undefined'

/**
 * Save data to localStorage
 * @param {string} key - The storage key
 * @param {any} value - The value to store (will be JSON stringified)
 */
export function saveToStorage(key, value) {
  if (!isClient) return
  
  try {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error)
  }
}

/**
 * Read data from localStorage
 * @param {string} key - The storage key
 * @returns {any} The parsed value or null if not found
 */
export function readFromStorage(key) {
  if (!isClient) return null
  
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error)
    return null
  }
}

/**
 * Remove data from localStorage
 * @param {string} key - The storage key to remove
 */
export function removeFromStorage(key) {
  if (!isClient) return
  
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error)
  }
}

/**
 * Clear all application data from localStorage
 * @param {string[]} keys - Optional array of keys to clear (clears all if not provided)
 */
export function clearStorage(keys) {
  if (!isClient) return
  
  try {
    if (keys && keys.length > 0) {
      keys.forEach(key => localStorage.removeItem(key))
    } else {
      localStorage.clear()
    }
  } catch (error) {
    console.error('Error clearing localStorage:', error)
  }
}

export default {
  saveToStorage,
  readFromStorage,
  removeFromStorage,
  clearStorage
}
