import { createContext, useState } from 'react'

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {}
})

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [userId, setUserId] = useState(localStorage.getItem('userId'))

  const login = (uid, receivedToken) => {
    setToken(receivedToken)
    setUserId(uid)
    localStorage.setItem('token', receivedToken)
    localStorage.setItem('userId', uid)
  }

  const logout = () => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn: !!token,
      userId,
      token,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}