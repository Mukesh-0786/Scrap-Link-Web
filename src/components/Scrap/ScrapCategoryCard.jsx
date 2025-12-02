import React from 'react'

const ScrapCategoryCard = ({ category, onSelect, isSelected }) => {
  const {
    name,
    price_per_kg,
    icon,
    description,
    unit = 'kg'
  } = category

  return (
    <div 
      style={{
        ...styles.card,
        ...(isSelected ? styles.selectedCard : {})
      }}
      onClick={() => onSelect(category)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(category)
        }
      }}
    >
      <div style={styles.cardHeader}>
        <div style={styles.icon}>
          {icon}
        </div>
        <div style={styles.info}>
          <h3 style={styles.name}>{name}</h3>
          <p style={styles.description}>{description}</p>
        </div>
      </div>
      
      <div style={styles.cardFooter}>
        <div style={styles.priceSection}>
          <span style={styles.priceLabel}>Price per {unit}:</span>
          <span style={styles.price}>₹{price_per_kg}</span>
        </div>
        
        <div style={styles.actionSection}>
          <button style={styles.selectButton}>
            {isSelected ? 'Selected ✓' : 'Select'}
          </button>
        </div>
      </div>
      
      {isSelected && (
        <div style={styles.selectedIndicator}>
          <div style={styles.checkmark}>✓</div>
        </div>
      )}
    </div>
  )
}

const styles = {
  card: {
    backgroundColor: 'white',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-lg)',
    padding: '1.5rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    position: 'relative',
    overflow: 'hidden',
    ':hover': {
      borderColor: 'var(--primary-color)',
      transform: 'translateY(-2px)',
      boxShadow: 'var(--shadow-md)',
    },
  },
  selectedCard: {
    borderColor: 'var(--primary-color)',
    backgroundColor: '#f0fdf4',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  },
  icon: {
    fontSize: '2rem',
    minWidth: '3rem',
    height: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 'var(--radius-md)',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '0.25rem',
  },
  description: {
    fontSize: '0.875rem',
    color: 'var(--text-light)',
    lineHeight: 1.5,
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '1rem',
    borderTop: '1px solid var(--border-color)',
  },
  priceSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  priceLabel: {
    fontSize: '0.75rem',
    color: 'var(--text-light)',
  },
  price: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--primary-color)',
  },
  actionSection: {
    display: 'flex',
    alignItems: 'center',
  },
  selectButton: {
    padding: '0.5rem 1rem',
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
  },
  selectedIndicator: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    width: '1.5rem',
    height: '1.5rem',
    backgroundColor: 'var(--primary-color)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: 'white',
    fontSize: '0.875rem',
    fontWeight: 'bold',
  },
}

export default ScrapCategoryCard