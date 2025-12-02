import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { scrapAPI } from '../../services/api'
import './ScrapRequestForm.css'

const ScrapRequestForm = ({ category, onBack }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    weight: '',
    description: '',
    images: [],
    scheduledDate: '',
    address: '',
    specialInstructions: '',
    location: { lat: 0, lng: 0 }
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [estimatedPrice, setEstimatedPrice] = useState(0)

  // Calculate estimated price
  useEffect(() => {
    if (formData.weight && category?.price_per_kg) {
      const weight = parseFloat(formData.weight)
      if (!isNaN(weight) && weight > 0) {
        const price = weight * category.price_per_kg
        setEstimatedPrice(price)
      } else {
        setEstimatedPrice(0)
      }
    } else {
      setEstimatedPrice(0)
    }
  }, [formData.weight, category])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleWeightChange = (value) => {
    // Allow only numbers and one decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setFormData(prev => ({ ...prev, weight: value }))
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    // Limit to 5 images
    const newImages = files.slice(0, 5 - formData.images.length)
    
    // Validate file types and sizes
    const validImages = newImages.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg']
      const maxSize = 5 * 1024 * 1024 // 5MB
      
      if (!validTypes.includes(file.type)) {
        setError('Only JPEG and PNG images are allowed')
        return false
      }
      if (file.size > maxSize) {
        setError('Image size should be less than 5MB')
        return false
      }
      return true
    })
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...validImages]
    }))
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setFormData(prev => ({ ...prev, location }))
        },
        (error) => {
          setError('Failed to get location: ' + error.message)
        }
      )
    } else {
      setError('Geolocation is not supported by your browser')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.weight || !formData.description || !formData.address) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('weight', formData.weight)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('category_id', category.id)
      formDataToSend.append('scheduled_date', formData.scheduledDate)
      formDataToSend.append('address', formData.address)
      formDataToSend.append('special_instructions', formData.specialInstructions)
      formDataToSend.append('location', JSON.stringify(formData.location))
      
      formData.images.forEach((image, index) => {
        formDataToSend.append(`images[${index}]`, image)
      })

      const response = await scrapAPI.post('/scrap-requests', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create scrap request')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="scrap-request-form">
      <button onClick={onBack} className="back-btn">← Back</button>
      <h2>Request {category?.name} Scrap Collection</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Weight (kg) *</label>
          <input
            type="text"
            value={formData.weight}
            onChange={(e) => handleWeightChange(e.target.value)}
            placeholder="Enter weight"
            required
          />
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the scrap items"
            required
          />
        </div>

        <div className="form-group">
          <label>Address *</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter pickup address"
            required
          />
        </div>

        <div className="form-group">
          <label>Scheduled Date</label>
          <input
            type="date"
            name="scheduledDate"
            value={formData.scheduledDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Special Instructions</label>
          <textarea
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleChange}
            placeholder="Any special instructions for pickup"
          />
        </div>

        <div className="form-group">
          <label>Upload Images (up to 5)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            disabled={formData.images.length >= 5}
          />
          <div className="image-preview">
            {formData.images.map((image, index) => (
              <div key={index} className="image-item">
                <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="remove-btn"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <button
            type="button"
            onClick={getCurrentLocation}
            className="location-btn"
          >
            📍 Get My Location
          </button>
        </div>

        <div className="estimated-price">
          Estimated Price: ₹{estimatedPrice.toFixed(2)}
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Submitting...' : 'Submit Scrap Request'}
        </button>
      </form>
    </div>
  )
}

export default ScrapRequestForm