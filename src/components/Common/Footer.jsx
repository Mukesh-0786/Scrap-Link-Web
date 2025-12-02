import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={styles.footer}>
      <div className="container">
        <div style={styles.footerContent}>
          {/* Company Info */}
          <div style={styles.footerSection}>
            <div style={styles.footerLogo}>
              <span style={styles.logoIcon}>♻️</span>
              <span style={styles.logoText}>ScrapLink</span>
            </div>
            <p style={styles.footerDescription}>
              Connecting scrap generators with collectors for a cleaner environment.
            </p>
          </div>

          {/* Quick Links */}
          <div style={styles.footerSection}>
            <h3 style={styles.sectionTitle}>Quick Links</h3>
            <ul style={styles.linkList}>
              <li><Link to="/about" style={styles.footerLink}>About Us</Link></li>
              <li><Link to="/how-it-works" style={styles.footerLink}>How It Works</Link></li>
              <li><Link to="/prices" style={styles.footerLink}>Price List</Link></li>
              <li><Link to="/contact" style={styles.footerLink}>Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div style={styles.footerSection}>
            <h3 style={styles.sectionTitle}>Services</h3>
            <ul style={styles.linkList}>
              <li><Link to="/scrap/request" style={styles.footerLink}>Scrap Pickup</Link></li>
              <li><Link to="/collector/register" style={styles.footerLink}>Become Collector</Link></li>
              <li><Link to="/business" style={styles.footerLink}>Business Solutions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div style={styles.footerSection}>
            <h3 style={styles.sectionTitle}>Contact Us</h3>
            <ul style={styles.contactList}>
              <li style={styles.contactItem}>
                <span>📞</span>
                <span>+91 98765 43210</span>
              </li>
              <li style={styles.contactItem}>
                <span>✉️</span>
                <span>support@scraplink.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={styles.bottomBar}>
          <p style={styles.copyright}>
            © {currentYear} ScrapLink. All rights reserved.
          </p>
          <div style={styles.bottomLinks}>
            <Link to="/privacy" style={styles.bottomLink}>Privacy Policy</Link>
            <Link to="/terms" style={styles.bottomLink}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    backgroundColor: 'var(--bg-dark)',
    color: 'white',
    padding: '3rem 0 1.5rem',
    marginTop: 'auto',
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '1.5rem',
    },
  },
  footerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  footerLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.5rem',
    fontWeight: '700',
  },
  logoIcon: {
    fontSize: '2rem',
  },
  logoText: {
    background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  footerDescription: {
    fontSize: '0.875rem',
    color: '#9ca3af',
    lineHeight: 1.6,
  },
  sectionTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '0.75rem',
  },
  linkList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  footerLink: {
    fontSize: '0.875rem',
    color: '#9ca3af',
    textDecoration: 'none',
    transition: 'color 0.2s',
    ':hover': {
      color: 'white',
    },
  },
  contactList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '0.875rem',
    color: '#9ca3af',
  },
  bottomBar: {
    paddingTop: '1.5rem',
    borderTop: '1px solid #374151',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      textAlign: 'center',
    },
  },
  copyright: {
    fontSize: '0.875rem',
    color: '#9ca3af',
  },
  bottomLinks: {
    display: 'flex',
    gap: '1.5rem',
  },
  bottomLink: {
    fontSize: '0.875rem',
    color: '#9ca3af',
    textDecoration: 'none',
    ':hover': {
      color: 'white',
    },
  },
}

export default Footer