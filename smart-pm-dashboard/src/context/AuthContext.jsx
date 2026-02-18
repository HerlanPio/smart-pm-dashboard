import React, { createContext, useEffect, useState, useCallback } from 'react'
import { useIdleLogout } from '../hooks/useIdleLogout'
import { saveToStorage, readFromStorage } from '../utils/storage'

export const AuthContext = createContext()

const USERS_KEY = 'spm_users'
const AUTH_KEY = 'spm_auth'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readFromStorage(AUTH_KEY) || null)

  // Idle logout setup (10 minutes = 600000 ms)
  const logout = useCallback(() => {
    setUser(null)
    saveToStorage(AUTH_KEY, null)
  }, [])
  useIdleLogout(logout, 600000) // 10 minutes

  useEffect(() => {
    saveToStorage(AUTH_KEY, user)
  }, [user])

  const register = (username, password) => {
    const users = readFromStorage(USERS_KEY) || []
    if (users.find(u => u.username === username)) {
      throw new Error('User already exists')
    }
    const newUser = { id: Date.now(), username, password }
    users.push(newUser)
    saveToStorage(USERS_KEY, users)
    setUser({ id: newUser.id, username: newUser.username })
  }

  const login = (username, password) => {
    const users = readFromStorage(USERS_KEY) || []
    const found = users.find(u => u.username === username && u.password === password)
    if (!found) throw new Error('Invalid credentials')
    setUser({ id: found.id, username: found.username })
  }

  const logoutUser = () => logout()

  return (
    <AuthContext.Provider value={{ user, register, login, logout: logoutUser }}>
      {children}
    </AuthContext.Provider>
  )
}
