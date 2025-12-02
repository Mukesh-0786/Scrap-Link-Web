import React, { createContext, useState, useContext, useEffect } from 'react'
import { api } from '../services/api'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } catch (error) {
        console.error('Failed to parse user data:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
  }, [])

  const login = async (phone, role) => {
    try {
      const response = await api.post('/auth/login', { phone, role })
      return response.data // Returns OTP details
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  }

  const verifyOTP = async (phone, otp) => {
    try {
      const response = await api.post('/auth/verify-otp', { phone, otp })
      const { token, user } = response.data
      
      // Store in localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      
      // Set axios header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      setUser(user)
      return { token, user }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'OTP verification failed')
    }
  }

  const registerCustomer = async (userData) => {
    try {
      const response = await api.post('/auth/register/customer', userData)
      const { token, user } = response.data
      
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      setUser(user)
      return { token, user }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    verifyOTP,
    registerCustomer,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}