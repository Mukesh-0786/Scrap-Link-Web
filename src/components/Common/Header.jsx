import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/prices', label: 'Price List' },
    { path: '/how-it-works', label: 'How It Works' },
  ]

  return (
    <header style={styles.header}>
      <div className="container" style={styles.container}>
        <div style={styles.headerContent}>
          {/* Logo */}
          <Link to="/" style={styles.logo}>
            <span style={styles.logoIcon}>♻️</span>
            <span style={styles.logoText}>ScrapLink</span>
          </Link>

          {/* Desktop Navigation */}
          <nav style={styles.desktopNav}>
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} style={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div style={styles.userActions}>
            {isAuthenticated ? (
              <div style={styles.userMenu}>
                <div style={styles.userInfo}>
                  <span style={styles.userName}>
                    {user?.name || user?.phone}
                  </span>
                  <span style={styles.userRole}>
                    ({user?.role})
                  </span>
                </div>
                <div style={styles.dropdown}>
                  {user?.role === 'customer' && (
                    <>
                      <Link to="/dashboard/customer" style={styles.dropdownLink}>
                        Dashboard
                      </Link>
                      <Link to="/scrap/request" style={styles.dropdownLink}>
                        Request Pickup
                      </Link>
                    </>
                  )}
                  {user?.role === 'collector' && (
                    <Link to="/dashboard/collector" style={styles.dropdownLink}>
                      Dashboard
                    </Link>
                  )}
                  <Link to="/profile" style={styles.dropdownLink}>
                    Profile
                  </Link>
                  <button onClick={handleLogout} style={styles.dropdownLink}>
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div style={styles.authButtons}>
                <Link to="/login" style={styles.btnOutline}>
                  Login
                </Link>
                <Link to="/register" style={styles.btnPrimary}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            style={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={styles.mobileMenu}>
            <nav style={styles.mobileNav}>
              {navLinks.map(link => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  style={styles.mobileNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <>
                  {user?.role === 'customer' && (
                    <>
                      <Link 
                        to="/dashboard/customer" 
                        style={styles.mobileNavLink}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link 
                        to="/scrap/request" 
                        style={styles.mobileNavLink}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Request Pickup
                      </Link>
                    </>
                  )}
                  {user?.role === 'collector' && (
                    <Link 
                      to="/dashboard/collector" 
                      style={styles.mobileNavLink}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link 
                    to="/profile" 
                    style={styles.mobileNavLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    style={{ ...styles.mobileNavLink, color: '#ef4444' }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    style={styles.mobileNavLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    style={{ ...styles.mobileNavLink, ...styles.btnPrimary }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

const styles = {
  header: {
    backgroundColor: 'white',
    boxShadow: 'var(--shadow-sm)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '4rem',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--text-dark)',
  },
  logoIcon: {
    fontSize: '1.5rem',
  },
  logoText: {
    background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  desktopNav: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  navLink: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'var(--text-light)',
    transition: 'color 0.2s',
    ':hover': {
      color: 'var(--primary-color)',
    },
  },
  userActions: {
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  userMenu: {
    position: 'relative',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    padding: '0.5rem 0.75rem',
    borderRadius: 'var(--radius-md)',
    ':hover': {
      backgroundColor: 'var(--bg-light)',
    },
  },
  userName: {
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  userRole: {
    fontSize: '0.75rem',
    color: 'var(--text-light)',
    textTransform: 'capitalize',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    width: '200px',
    backgroundColor: 'white',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-lg)',
    marginTop: '0.5rem',
    overflow: 'hidden',
    display: 'none',
    ':hover': {
      display: 'block',
    },
  },
  dropdownLink: {
    display: 'block',
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    color: 'var(--text-dark)',
    textDecoration: 'none',
    border: 'none',
    background: 'none',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'var(--bg-light)',
    },
  },
  authButtons: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
  },
  btnOutline: {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'var(--text-dark)',
    border: '1px solid var(--border-color)',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: 'var(--bg-light)',
      borderColor: 'var(--text-light)',
    },
  },
  btnPrimary: {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'white',
    backgroundColor: 'var(--primary-color)',
    border: '1px solid var(--primary-color)',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: 'var(--primary-dark)',
      borderColor: 'var(--primary-dark)',
    },
  },
  mobileMenuButton: {
    display: 'none',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    color: 'var(--text-dark)',
    cursor: 'pointer',
    '@media (max-width: 768px)': {
      display: 'block',
    },
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTop: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-md)',
  },
  mobileNav: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
  },
  mobileNavLink: {
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    color: 'var(--text-dark)',
    textDecoration: 'none',
    border: 'none',
    background: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'var(--bg-light)',
    },
  },
}

export default Header