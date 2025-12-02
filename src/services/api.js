import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API functions
export const authAPI = {
  login: (phone, role) => api.post('/auth/login', { phone, role }),
  verifyOTP: (phone, otp) => api.post('/auth/verify-otp', { phone, otp }),
  registerCustomer: (data) => api.post('/auth/register/customer', data),
  registerCollector: (data) => api.post('/auth/register/collector', data),
}

export const scrapAPI = {
  getCategories: () => api.get('/scrap/categories'),
  createRequest: (data) => api.post('/scrap/request', data),
  getRequests: () => api.get('/scrap/requests'),
  getNearbyCollectors: (location) => api.post('/scrap/nearby-collectors', location),
}

export const bidAPI = {
  placeBid: (data) => api.post('/bids', data),
  getBids: (requestId) => api.get(`/bids/${requestId}`),
  acceptBid: (bidId) => api.put(`/bids/${bidId}/accept`),
}