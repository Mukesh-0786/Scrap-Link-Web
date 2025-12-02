import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Common/Header'
import Footer from '../../components/Common/Footer'
import LoginForm from '../../components/Auth/LoginForm'

const LoginPage = () => {
  return (
    <div style={styles.container}>
      <Header />
      
      <div style={styles.content}>
        <div style={styles.leftPanel}>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>
            Sign in to manage your scrap requests and connect with collectors.
          </p>
          
          <div style={styles.features}>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>💰</span>
              <div>
                <h3 style={styles.featureTitle}>Best Prices</h3>
                <p style={styles.featureDescription}>
                  Get competitive bids from nearby collectors
                </p>
              </div>
            </div>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>🚚</span>
              <div>
                <h3 style={styles.featureTitle}>Free Pickup</h3>
                <p style={styles.featureDescription}>
                  Collectors come to your location
                </p>
              </div>
            </div>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>⚡</span>
              <div>
                <h3 style={styles.featureTitle}>Instant Payment</h3>
                <p style={styles.featureDescription}>
                  Get paid immediately upon pickup
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div style={styles.rightPanel}>
          <LoginForm />
          
          <div style={styles.footerLinks}>
            <p style={styles.footerText}>
              Don't have an account?{' '}
              <Link to="/register" style={styles.link}>
                Sign up
              </Link>
            </p>
            <p style={styles.footerText}>
              Are you a scrap collector?{' '}
              <Link to="/register?role=collector" style={styles.link}>
                Register as collector
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: '1fr',
    },
  },
  leftPanel: {
    backgroundColor: '#f0fdf4',
    padding: '4rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '@media (max-width: 1024px)': {
      padding: '2rem',
      textAlign: 'center',
    },
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: 'var(--text-dark)',
  },
  subtitle: {
    fontSize: '1.125rem',
    color: 'var(--text-light)',
    marginBottom: '3rem',
    lineHeight: 1.6,
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  feature: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  featureIcon: {
    fontSize: '2rem',
    minWidth: '3rem',
  },
  featureTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    marginBottom: '0.25rem',
  },
  featureDescription: {
    fontSize: '0.875rem',
    color: 'var(--text-light)',
    lineHeight: 1.5,
  },
  rightPanel: {
    padding: '4rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '@media (max-width: 1024px)': {
      padding: '2rem',
    },
  },
  footerLinks: {
    marginTop: '2rem',
    textAlign: 'center',
  },
  footerText: {
    fontSize: '0.875rem',
    color: 'var(--text-light)',
    marginBottom: '0.5rem',
  },
  link: {
    color: 'var(--primary-color)',
    fontWeight: '500',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
}

export default LoginPage