import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const LoginForm = () => {
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('customer')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('phone') // 'phone' or 'otp'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { login, verifyOTP } = useAuth()
  const navigate = useNavigate()

  const handleSendOTP = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!phone.match(/^[6-9]\d{9}$/)) {
      setError('Please enter a valid 10-digit mobile number')
      return
    }

    setLoading(true)
    try {
      await login(phone, role)
      setStep('otp')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    setError('')
    
    if (otp.length !== 6) {
      setError('Please enter 6-digit OTP')
      return
    }

    setLoading(true)
    try {
      await verifyOTP(phone, otp)
      
      // Redirect based on role
      if (role === 'customer') {
        navigate('/dashboard/customer')
      } else if (role === 'collector') {
        navigate('/dashboard/collector')
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleOtpChange = (value, index) => {
    const newOtp = otp.split('')
    newOtp[index] = value
    setOtp(newOtp.join(''))
    
    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Sign in to your account</p>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        {step === 'phone' ? (
          <form onSubmit={handleSendOTP} style={styles.form}>
            {/* Role Selection */}
            <div style={styles.roleSelection}>
              <button
                type="button"
                style={{
                  ...styles.roleButton,
                  ...(role === 'customer' ? styles.roleButtonActive : {})
                }}
                onClick={() => setRole('customer')}
              >
                <span style={styles.roleIcon}>👤</span>
                <span style={styles.roleLabel}>Customer</span>
                <span style={styles.roleDescription}>I want to sell scrap</span>
              </button>
              <button
                type="button"
                style={{
                  ...styles.roleButton,
                  ...(role === 'collector' ? styles.roleButtonActive : {})
                }}
                onClick={() => setRole('collector')}
              >
                <span style={styles.roleIcon}>🚚</span>
                <span style={styles.roleLabel}>Collector</span>
                <span style={styles.roleDescription}>I collect scrap</span>
              </button>
            </div>

            {/* Phone Input */}
            <div style={styles.formGroup}>
              <label htmlFor="phone" style={styles.label}>
                Mobile Number
              </label>
              <div style={styles.phoneInput}>
                <span style={styles.countryCode}>+91</span>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="9876543210"
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              style={styles.submitButton}
              disabled={loading || phone.length !== 10}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} style={styles.form}>
            <div style={styles.otpHeader}>
              <h3 style={styles.otpTitle}>Enter OTP</h3>
              <p style={styles.otpSubtitle}>
                Enter the 6-digit OTP sent to +91 {phone}
              </p>
              <button
                type="button"
                style={styles.resendButton}
                onClick={() => {
                  handleSendOTP({ preventDefault: () => {} })
                  setError('OTP resent successfully')
                }}
              >
                Resend OTP
              </button>
            </div>

            <div style={styles.otpInputs}>
              {[0, 1, 2, 3, 4, 5].map(index => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={otp[index] || ''}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  style={styles.otpInput}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !otp[index] && index > 0) {
                      const prevInput = document.getElementById(`otp-${index - 1}`)
                      if (prevInput) prevInput.focus()
                    }
                  }}
                />
              ))}
            </div>

            <button
              type="submit"
              style={styles.submitButton}
              disabled={loading || otp.length !== 6}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <button
              type="button"
              style={styles.backButton}
              onClick={() => setStep('phone')}
            >
              Change Number
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: 'calc(100vh - 4rem)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1rem',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: 'white',
    borderRadius: 'var(--radius-lg)',
    padding: '2rem',
    boxShadow: 'var(--shadow-lg)',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '0.875rem',
    color: 'var(--text-light)',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  error: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    padding: '0.75rem',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.875rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  roleSelection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.75rem',
  },
  roleButton: {
    padding: '1rem',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'white',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s',
  },
  roleButtonActive: {
    borderColor: 'var(--primary-color)',
    backgroundColor: '#f0fdf4',
  },
  roleIcon: {
    fontSize: '1.5rem',
  },
  roleLabel: {
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  roleDescription: {
    fontSize: '0.75rem',
    color: 'var(--text-light)',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'var(--text-dark)',
  },
  phoneInput: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
  },
  countryCode: {
    padding: '0.625rem 0.75rem',
    backgroundColor: 'var(--bg-light)',
    fontSize: '0.875rem',
    color: 'var(--text-light)',
    borderRight: '1px solid var(--border-color)',
  },
  input: {
    flex: 1,
    padding: '0.625rem 0.75rem',
    border: 'none',
    fontSize: '0.875rem',
    outline: 'none',
  },
  submitButton: {
    padding: '0.75rem',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: 'var(--primary-dark)',
    },
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  otpHeader: {
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  otpTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  otpSubtitle: {
    fontSize: '0.875rem',
    color: 'var(--text-light)',
    marginBottom: '0.75rem',
  },
  resendButton: {
    background: 'none',
    border: 'none',
    color: 'var(--primary-color)',
    fontSize: '0.875rem',
    cursor: 'pointer',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  otpInputs: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  otpInput: {
    width: '3rem',
    height: '3rem',
    textAlign: 'center',
    fontSize: '1.25rem',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
    outline: 'none',
    transition: 'border-color 0.2s',
    ':focus': {
      borderColor: 'var(--primary-color)',
      boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)',
    },
  },
  backButton: {
    padding: '0.75rem',
    backgroundColor: 'transparent',
    color: 'var(--text-dark)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'var(--bg-light)',
    },
  },
}

export default LoginForm