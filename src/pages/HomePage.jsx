import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'
import { useAuth } from '../context/AuthContext'

const HomePage = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div style={styles.container}>
      <Header />
      
      <main style={styles.main}>
        {/* Hero Section */}
        <section style={styles.hero}>
          <div className="container">
            <div style={styles.heroContent}>
              <h1 style={styles.heroTitle}>
                Turn Your Scrap Into
                <span style={styles.highlight}> Cash</span>
              </h1>
              <p style={styles.heroSubtitle}>
                Connect with nearby scrap collectors instantly. Get the best price for your recyclable materials.
              </p>
              <div style={styles.heroButtons}>
                {!isAuthenticated ? (
                  <>
                    <Link to="/register" style={styles.primaryButton}>
                      Start Selling Scrap
                    </Link>
                    <Link to="/register?role=collector" style={styles.secondaryButton}>
                      Become a Collector
                    </Link>
                  </>
                ) : (
                  <Link to="/scrap/request" style={styles.primaryButton}>
                    Request Pickup Now
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section style={styles.section}>
          <div className="container">
            <h2 style={styles.sectionTitle}>How It Works</h2>
            <div style={styles.steps}>
              <div style={styles.step}>
                <div style={styles.stepNumber}>1</div>
                <h3 style={styles.stepTitle}>Select Scrap Type</h3>
                <p style={styles.stepDescription}>
                  Choose from various scrap categories like newspaper, plastic, metal, etc.
                </p>
              </div>
              <div style={styles.step}>
                <div style={styles.stepNumber}>2</div>
                <h3 style={styles.stepTitle}>Enter Details</h3>
                <p style={styles.stepDescription}>
                  Provide weight, location, and preferred pickup time.
                </p>
              </div>
              <div style={styles.step}>
                <div style={styles.stepNumber}>3</div>
                <h3 style={styles.stepTitle}>Get Bids</h3>
                <p style={styles.stepDescription}>
                  Nearby collectors bid on your scrap. Choose the best offer.
                </p>
              </div>
              <div style={styles.step}>
                <div style={styles.stepNumber}>4</div>
                <h3 style={styles.stepTitle}>Pickup & Payment</h3>
                <p style={styles.stepDescription}>
                  Collector picks up scrap and you get paid instantly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section style={styles.section}>
          <div className="container">
            <h2 style={styles.sectionTitle}>Popular Scrap Categories</h2>
            <div style={styles.categories}>
              {[
                { name: 'Newspaper', price: '₹12/kg', icon: '📰' },
                { name: 'Plastic', price: '₹18/kg', icon: '♻️' },
                { name: 'Metal', price: '₹35/kg', icon: '⚙️' },
                { name: 'Copper', price: '₹250/kg', icon: '🔌' },
                { name: 'E-Waste', price: '₹45/kg', icon: '💻' },
                { name: 'Cardboard', price: '₹8/kg', icon: '📦' },
              ].map((category, index) => (
                <div key={index} style={styles.categoryCard}>
                  <div style={styles.categoryIcon}>{category.icon}</div>
                  <h3 style={styles.categoryName}>{category.name}</h3>
                  <p style={styles.categoryPrice}>{category.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={styles.ctaSection}>
          <div className="container">
            <div style={styles.ctaContent}>
              <h2 style={styles.ctaTitle}>Ready to Clear Your Scrap?</h2>
              <p style={styles.ctaSubtitle}>
                Join thousands of satisfied users who got the best value for their scrap materials.
              </p>
              <Link to="/scrap/request" style={styles.ctaButton}>
                Request Pickup Now →
              </Link>
            </div>
          </div>
        </section>
      </main>

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
  main: {
    flex: 1,
  },
  hero: {
    background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
    color: 'white',
    padding: '5rem 0',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: '800',
    marginBottom: '1.5rem',
    lineHeight: 1.2,
    '@media (max-width: 768px)': {
      fontSize: '2.5rem',
    },
  },
  highlight: {
    background: 'linear-gradient(135deg, #fde047 0%, #f97316 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    marginBottom: '2.5rem',
    opacity: 0.9,
    maxWidth: '600px',
    margin: '0 auto 2.5rem',
    '@media (max-width: 768px)': {
      fontSize: '1rem',
    },
  },
  heroButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  primaryButton: {
    padding: '1rem 2rem',
    backgroundColor: 'white',
    color: '#10b981',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.2s',
  },
  secondaryButton: {
    padding: '1rem 2rem',
    backgroundColor: 'transparent',
    color: 'white',
    border: '2px solid white',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.2s',
  },
  section: {
    padding: '5rem 0',
    '@media (max-width: 768px)': {
      padding: '3rem 0',
    },
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '3rem',
  },
  steps: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginTop: '3rem',
  },
  step: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    transition: 'transform 0.2s',
  },
  stepNumber: {
    width: '3rem',
    height: '3rem',
    backgroundColor: '#10b981',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
    fontWeight: '700',
    margin: '0 auto 1.5rem',
  },
  stepTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '1rem',
  },
  stepDescription: {
    color: '#6b7280',
    lineHeight: 1.6,
  },
  categories: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginTop: '3rem',
  },
  categoryCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '0.75rem',
    textAlign: 'center',
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    transition: 'all 0.2s',
  },
  categoryIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  categoryName: {
    fontSize: '1.125rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  categoryPrice: {
    color: '#10b981',
    fontSize: '1.25rem',
    fontWeight: '700',
  },
  ctaSection: {
    backgroundColor: '#111827',
    color: 'white',
    padding: '5rem 0',
    textAlign: 'center',
  },
  ctaContent: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  ctaTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    '@media (max-width: 768px)': {
      fontSize: '2rem',
    },
  },
  ctaSubtitle: {
    fontSize: '1.125rem',
    color: '#9ca3af',
    marginBottom: '2.5rem',
    lineHeight: 1.6,
  },
  ctaButton: {
    display: 'inline-block',
    padding: '1rem 2rem',
    backgroundColor: '#10b981',
    color: 'white',
    borderRadius: '0.5rem',
    fontSize: '1.125rem',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.2s',
  },
}

export default HomePage