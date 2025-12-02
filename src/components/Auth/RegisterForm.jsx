import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './RegisterForm.css'

const RegisterForm = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { registerCustomer, registerCollector } = useAuth()
  
  const [step, setStep] = useState(1)
  const [role, setRole] = useState('customer')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Get role from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const roleParam = params.get('role')
    if (roleParam && ['customer', 'collector'].includes(roleParam)) {
      setRole(roleParam)
    }
  }, [location])

  // Customer form state
  const [customerData, setCustomerData] = useState({
    phone: '',
    name: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    location: { lat: 0, lng: 0 }
  })

  // Collector form state
  const [collectorData, setCollectorData] = useState({
    phone: '',
    name: '',
    email: '',
    businessName: '',
    address: '',
    city: '',
    pincode: '',
    vehicleType: '',
    vehicleNumber: '',
    idProof: null,
    experience: '',
    serviceArea: '',
    location: { lat: 0, lng: 0 }
  })

  const handleCustomerChange = (e) => {
    const { name, value } = e.target
    setCustomerData(prev => ({ ...prev, [name]: value }))
  }

  const handleCollectorChange = (e) => {
    const { name, value } = e.target
    setCollectorData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      setCollectorData(prev => ({ ...prev, idProof: file }))
    } else {
      setError('File size should be less than 5MB')
    }
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          if (role === 'customer') {
            setCustomerData(prev => ({ ...prev, location }))
          } else {
            setCollectorData(prev => ({ ...prev, location }))
          }
        },
        (error) => {
          setError('Unable to get location. Please enable location services.')
        }
      )
    }
  }

  const validateStep1 = () => {
    const phoneRegex = /^[6-9]\d{9}$/
    
    if (role === 'customer') {
      if (!phoneRegex.test(customerData.phone)) {
        setError('Please enter a valid 10-digit mobile number')
        return false
      }
      if (!customerData.name.trim()) {
        setError('Please enter your name')
        return false
      }
    } else {
      if (!phoneRegex.test(collectorData.phone)) {
        setError('Please enter a valid 10-digit mobile number')
        return false
      }
      if (!collectorData.name.trim()) {
        setError('Please enter your name')
        return false
      }
      if (!collectorData.businessName.trim()) {
        setError('Please enter your business name')
        return false
      }
    }
    return true
  }

  const validateStep2 = () => {
    if (role === 'customer') {
      if (!customerData.address.trim()) {
        setError('Please enter your address')
        return false
      }
      if (!customerData.city.trim()) {
        setError('Please enter your city')
        return false
      }
      if (!customerData.pincode.match(/^\d{6}$/)) {
        setError('Please enter a valid 6-digit pincode')
        return false
      }
    } else {
      if (!collectorData.address.trim()) {
        setError('Please enter your business address')
        return false
      }
      if (!collectorData.city.trim()) {
        setError('Please enter your city')
        return false
      }
      if (!collectorData.pincode.match(/^\d{6}$/)) {
        setError('Please enter a valid 6-digit pincode')
        return false
      }
      if (!collectorData.vehicleType) {
        setError('Please select your vehicle type')
        return false
      }
      if (!collectorData.serviceArea.trim()) {
        setError('Please enter your service area')
        return false
      }
    }
    return true
  }

  const handleNextStep = () => {
    setError('')
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      handleSubmit()
    }
  }

  const handlePreviousStep = () => {
    setStep(step - 1)
    setError('')
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    
    try {
      if (role === 'customer') {
        await registerCustomer(customerData)
      } else {
        await registerCollector(collectorData)
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const vehicleTypes = [
    'Bicycle',
    'Motorcycle',
    'Auto Rickshaw',
    'Pickup Truck',
    'Mini Truck',
    'Truck',
    'Other'
  ]

  return (
    <div className="register-form-container">
      <div className="register-header">
        <h2>Create Your Account</h2>
        <p>Join ScrapLink as a {role === 'customer' ? 'Customer' : 'Collector'}</p>
      </div>

      {/* Progress Steps */}
      <div className="progress-steps">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>
          <div className="step-number">1</div>
          <div className="step-label">Basic Info</div>
        </div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>
          <div className="step-number">2</div>
          <div className="step-label">{role === 'customer' ? 'Address' : 'Business Details'}</div>
        </div>
        <div className={`step ${step === 3 ? 'active' : ''}`}>
          <div className="step-number">3</div>
          <div className="step-label">Complete</div>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {step === 1 && (
        <div className="form-step">
          <div className="role-selection">
            <div className="role-options">
              <button
                type="button"
                className={`role-option ${role === 'customer' ? 'active' : ''}`}
                onClick={() => setRole('customer')}
              >
                <div className="role-icon">👤</div>
                <div className="role-info">
                  <h4>Customer</h4>
                  <p>Sell your scrap materials</p>
                </div>
              </button>
              <button
                type="button"
                className={`role-option ${role === 'collector' ? 'active' : ''}`}
                onClick={() => setRole('collector')}
              >
                <div className="role-icon">🚚</div>
                <div className="role-info">
                  <h4>Collector</h4>
                  <p>Collect scrap from customers</p>
                </div>
              </button>
            </div>
          </div>

          <div className="form-fields">
            <div className="form-group">
              <label htmlFor="phone">Mobile Number *</label>
              <div className="phone-input">
                <span className="country-code">+91</span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={role === 'customer' ? customerData.phone : collectorData.phone}
                  onChange={role === 'customer' ? handleCustomerChange : handleCollectorChange}
                  placeholder="9876543210"
                  maxLength="10"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={role === 'customer' ? customerData.name : collectorData.name}
                onChange={role === 'customer' ? handleCustomerChange : handleCollectorChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={role === 'customer' ? customerData.email : collectorData.email}
                onChange={role === 'customer' ? handleCustomerChange : handleCollectorChange}
                placeholder="you@example.com"
              />
            </div>

            {role === 'collector' && (
              <div className="form-group">
                <label htmlFor="businessName">Business Name *</label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={collectorData.businessName}
                  onChange={handleCollectorChange}
                  placeholder="Enter your business name"
                  required
                />
              </div>
            )}
          </div>
        </div>
      )}

      {step === 2 && role === 'customer' && (
        <div className="form-step">
          <h3>Address Details</h3>
          
          <div className="form-fields">
            <div className="form-group">
              <label htmlFor="address">Complete Address *</label>
              <textarea
                id="address"
                name="address"
                value={customerData.address}
                onChange={handleCustomerChange}
                placeholder="House no, Building, Street, Area"
                rows="3"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={customerData.city}
                  onChange={handleCustomerChange}
                  placeholder="Enter your city"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="pincode">Pincode *</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={customerData.pincode}
                  onChange={handleCustomerChange}
                  placeholder="6-digit pincode"
                  maxLength="6"
                  required
                />
              </div>
            </div>

            <div className="location-section">
              <label>Location for Pickup</label>
              <button
                type="button"
                className="location-btn"
                onClick={getCurrentLocation}
              >
                📍 Use Current Location
              </button>
              {customerData.location.lat !== 0 && (
                <div className="location-confirmed">
                  <span>✓ Location saved</span>
                  <small>Lat: {customerData.location.lat.toFixed(4)}, Lng: {customerData.location.lng.toFixed(4)}</small>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {step === 2 && role === 'collector' && (
        <div className="form-step">
          <h3>Business Details</h3>
          
          <div className="form-fields">
            <div className="form-group">
              <label htmlFor="address">Business Address *</label>
              <textarea
                id="address"
                name="address"
                value={collectorData.address}
                onChange={handleCollectorChange}
                placeholder="Complete business address"
                rows="3"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={collectorData.city}
                  onChange={handleCollectorChange}
                  placeholder="City"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="pincode">Pincode *</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={collectorData.pincode}
                  onChange={handleCollectorChange}
                  placeholder="6-digit pincode"
                  maxLength="6"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="vehicleType">Vehicle Type *</label>
              <select
                id="vehicleType"
                name="vehicleType"
                value={collectorData.vehicleType}
                onChange={handleCollectorChange}
                required
              >
                <option value="">Select vehicle type</option>
                {vehicleTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="vehicleNumber">Vehicle Number</label>
              <input
                type="text"
                id="vehicleNumber"
                name="vehicleNumber"
                value={collectorData.vehicleNumber}
                onChange={handleCollectorChange}
                placeholder="e.g., KA01AB1234"
              />
            </div>

            <div className="form-group">
              <label htmlFor="serviceArea">Service Area (in km) *</label>
              <input
                type="number"
                id="serviceArea"
                name="serviceArea"
                value={collectorData.serviceArea}
                onChange={handleCollectorChange}
                placeholder="e.g., 10"
                min="1"
                max="50"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="experience">Experience (years)</label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={collectorData.experience}
                onChange={handleCollectorChange}
                placeholder="e.g., 3"
                min="0"
                max="50"
              />
            </div>

            <div className="form-group">
              <label htmlFor="idProof">ID Proof (Optional)</label>
              <div className="file-upload">
                <input
                  type="file"
                  id="idProof"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileUpload}
                />
                <label htmlFor="idProof" className="upload-label">
                  {collectorData.idProof ? '✓ File uploaded' : 'Choose file (Max 5MB)'}
                </label>
              </div>
            </div>

            <div className="location-section">
              <label>Your Location</label>
              <button
                type="button"
                className="location-btn"
                onClick={getCurrentLocation}
              >
                📍 Use Current Location
              </button>
              {collectorData.location.lat !== 0 && (
                <div className="location-confirmed">
                  <span>✓ Location saved</span>
                  <small>Lat: {collectorData.location.lat.toFixed(4)}, Lng: {collectorData.location.lng.toFixed(4)}</small>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="form-actions">
        {step > 1 && (
          <button
            type="button"
            className="btn btn-outline"
            onClick={handlePreviousStep}
            disabled={loading}
          >
            ← Previous
          </button>
        )}
        
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleNextStep}
          disabled={loading}
        >
          {loading ? 'Processing...' : step === 2 ? 'Create Account' : 'Next →'}
        </button>
      </div>

      <div className="login-link">
        Already have an account? <a href="/login">Sign in</a>
      </div>
    </div>
  )
}

export default RegisterForm