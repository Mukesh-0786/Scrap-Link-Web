import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Common/Header'
import Footer from '../../components/Common/Footer'
import RegisterForm from '../../components/Auth/RegisterForm'
import './RegisterPage.css'

const RegisterPage = () => {
  return (
    <div className="register-page">
      <Header />
      
      <div className="register-container">
        <div className="register-wrapper">
          <div className="register-left">
            <div className="brand-section">
              <Link to="/" className="brand-logo">
                <span className="logo-icon">♻️</span>
                <span className="logo-text">ScrapLink</span>
              </Link>
              
              <h1 className="register-title">
                Join ScrapLink Today
              </h1>
              
              <p className="register-subtitle">
                Become part of India's fastest growing scrap recycling community
              </p>
              
              <div className="benefits">
                <div className="benefit-card">
                  <div className="benefit-icon">💰</div>
                  <div className="benefit-content">
                    <h3>Best Prices</h3>
                    <p>Get competitive rates for your scrap materials</p>
                  </div>
                </div>
                
                <div className="benefit-card">
                  <div className="benefit-icon">🚚</div>
                  <div className="benefit-content">
                    <h3>Free Pickup</h3>
                    <p>Collectors come to your location at your convenience</p>
                  </div>
                </div>
                
                <div className="benefit-card">
                  <div className="benefit-icon">⚡</div>
                  <div className="benefit-content">
                    <h3>Instant Payment</h3>
                    <p>Get paid immediately upon scrap collection</p>
                  </div>
                </div>
                
                <div className="benefit-card">
                  <div className="benefit-icon">🛡️</div>
                  <div className="benefit-content">
                    <h3>Verified Collectors</h3>
                    <p>All collectors are verified and rated by users</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="register-right">
            <div className="form-container">
              <RegisterForm />
              
              <div className="divider">
                <span>or</span>
              </div>
              
              <div className="social-register">
                <p className="social-text">Register with</p>
                <div className="social-buttons">
                  <button className="social-btn google-btn">
                    <span className="social-icon">G</span>
                    Google
                  </button>
                  <button className="social-btn phone-btn">
                    <span className="social-icon">📱</span>
                    Phone
                  </button>
                </div>
              </div>
              
              <div className="legal-links">
                <p className="legal-text">
                  By registering, you agree to our{' '}
                  <Link to="/terms" className="legal-link">Terms of Service</Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="legal-link">Privacy Policy</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default RegisterPage