import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { scrapAPI, bidAPI } from '../../services/api'
import Header from '../../components/Common/Header'
import Footer from '../../components/Common/Footer'
import './Dashboard.css'

const CollectorDashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  
  const [stats, setStats] = useState({
    totalPickups: 0,
    pendingRequests: 0,
    completedPickups: 0,
    totalEarnings: 0,
    rating: 0,
    activeBids: 0
  })
  
  const [availableJobs, setAvailableJobs] = useState([])
  const [myBids, setMyBids] = useState([])
  const [upcomingPickups, setUpcomingPickups] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch collector stats
      const statsResponse = await scrapAPI.getCollectorStats()
      setStats(statsResponse.data)
      
      // Fetch available jobs
      const jobsResponse = await scrapAPI.getAvailableJobs()
      setAvailableJobs(jobsResponse.data)
      
      // Fetch my bids
      const bidsResponse = await bidAPI.getMyBids()
      setMyBids(bidsResponse.data)
      
      // Fetch upcoming pickups
      const pickupsResponse = await scrapAPI.getUpcomingPickups()
      setUpcomingPickups(pickupsResponse.data)
      
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePlaceBid = (requestId) => {
    navigate(`/bid/${requestId}`)
  }

  const handleViewJob = (requestId) => {
    navigate(`/jobs/${requestId}`)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return (R * c).toFixed(1)
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="dashboard collector-dashboard">
      <Header />
      
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="user-profile">
            <div className="profile-avatar collector-avatar">
              {user?.businessName?.charAt(0) || 'C'}
            </div>
            <div className="profile-info">
              <h3 className="profile-name">{user?.businessName || 'Collector'}</h3>
              <p className="profile-email">{user?.phone}</p>
              <div className="rating">
                {'★'.repeat(Math.floor(stats.rating))}
                {'☆'.repeat(5 - Math.floor(stats.rating))}
                <span className="rating-value">{stats.rating.toFixed(1)}</span>
              </div>
              <span className="profile-badge collector-badge">Collector</span>
            </div>
          </div>
          
          <nav className="sidebar-nav">
            <button 
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <span className="nav-icon">📊</span>
              <span className="nav-label">Overview</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'jobs' ? 'active' : ''}`}
              onClick={() => setActiveTab('jobs')}
            >
              <span className="nav-icon">🔍</span>
              <span className="nav-label">Available Jobs</span>
              {availableJobs.length > 0 && (
                <span className="nav-badge">{availableJobs.length}</span>
              )}
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'bids' ? 'active' : ''}`}
              onClick={() => setActiveTab('bids')}
            >
              <span className="nav-icon">💰</span>
              <span className="nav-label">My Bids</span>
              {stats.activeBids > 0 && (
                <span className="nav-badge">{stats.activeBids}</span>
              )}
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'pickups' ? 'active' : ''}`}
              onClick={() => setActiveTab('pickups')}
            >
              <span className="nav-icon">🚚</span>
              <span className="nav-label">Upcoming Pickups</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'earnings' ? 'active' : ''}`}
              onClick={() => setActiveTab('earnings')}
            >
              <span className="nav-icon">💳</span>
              <span className="nav-label">Earnings</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <span className="nav-icon">👤</span>
              <span className="nav-label">Profile</span>
            </button>
          </nav>
          
          <div className="sidebar-footer">
            <div className="wallet-balance">
              <span className="wallet-label">Wallet Balance</span>
              <span className="wallet-amount">{formatCurrency(stats.totalEarnings)}</span>
            </div>
            <button className="logout-btn" onClick={logout}>
              <span className="logout-icon">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          {/* Header */}
          <div className="dashboard-header">
            <h1 className="dashboard-title">
              Welcome back, {user?.businessName?.split(' ')[0] || 'Collector'}!
            </h1>
            <div className="status-indicator">
              <div className="status-dot online"></div>
              <span>Online</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <h3 className="stat-title">Total Pickups</h3>
                <span className="stat-icon">📦</span>
              </div>
              <div className="stat-value">{stats.totalPickups}</div>
              <div className="stat-trend">+8% from last month</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-header">
                <h3 className="stat-title">Available Jobs</h3>
                <span className="stat-icon">🔍</span>
              </div>
              <div className="stat-value">{availableJobs.length}</div>
              <div className="stat-trend">Near your location</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-header">
                <h3 className="stat-title">Active Bids</h3>
                <span className="stat-icon">💰</span>
              </div>
              <div className="stat-value">{stats.activeBids}</div>
              <div className="stat-trend">Awaiting response</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-header">
                <h3 className="stat-title">Total Earnings</h3>
                <span className="stat-icon">💳</span>
              </div>
              <div className="stat-value">{formatCurrency(stats.totalEarnings)}</div>
              <div className="stat-trend">This month: {formatCurrency(stats.totalEarnings * 0.3)}</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-header">
                <h3 className="stat-title">Customer Rating</h3>
                <span className="stat-icon">⭐</span>
              </div>
              <div className="stat-value">{stats.rating.toFixed(1)}/5</div>
              <div className="stat-trend">Based on {stats.totalPickups} pickups</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-header">
                <h3 className="stat-title">Completion Rate</h3>
                <span className="stat-icon">✅</span>
              </div>
              <div className="stat-value">98%</div>
              <div className="stat-trend">Excellent performance</div>
            </div>
          </div>

          {/* Available Jobs */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title">Available Jobs Near You</h2>
              <button className="btn btn-outline" onClick={fetchDashboardData}>
                <span className="btn-icon">🔄</span>
                Refresh
              </button>
            </div>
            
            {availableJobs.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h3>No Jobs Available</h3>
                <p>Check back later for new pickup requests in your area.</p>
              </div>
            ) : (
              <div className="jobs-list">
                {availableJobs.map(job => (
                  <div key={job.id} className="job-card">
                    <div className="job-header">
                      <div className="job-category">
                        <span className="category-icon">{job.categoryIcon}</span>
                        <span className="category-name">{job.category}</span>
                      </div>
                      <span className="job-distance">
                        📍 {calculateDistance(
                          user.location?.lat || 0,
                          user.location?.lng || 0,
                          job.location.lat,
                          job.location.lng
                        )} km away
                      </span>
                    </div>
                    
                    <div className="job-body">
                      <h3 className="job-title">{job.title}</h3>
                      <p className="job-description">{job.description}</p>
                      
                      <div className="job-details">
                        <div className="detail-item">
                          <span className="detail-label">Weight:</span>
                          <span className="detail-value">{job.weight} kg</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Est. Value:</span>
                          <span className="detail-value">{formatCurrency(job.estimatedValue)}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Pickup By:</span>
                          <span className="detail-value">{formatDate(job.pickupBy)}</span>
                        </div>
                      </div>
                      
                      <div className="job-bids">
                        <div className="bids-count">
                          <span className="bids-icon">💰</span>
                          <span>{job.bidCount} bids placed</span>
                        </div>
                        <div className="current-bid">
                          Highest bid: <strong>{formatCurrency(job.highestBid)}</strong>
                        </div>
                      </div>
                    </div>
                    
                    <div className="job-footer">
                      <button 
                        className="btn btn-outline"
                        onClick={() => handleViewJob(job.id)}
                      >
                        View Details
                      </button>
                      <button 
                        className="btn btn-primary"
                        onClick={() => handlePlaceBid(job.id)}
                      >
                        Place Bid
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* My Bids & Upcoming Pickups */}
          <div className="dashboard-columns">
            {/* My Bids */}
            <div className="column">
              <div className="section-header">
                <h2 className="section-title">My Active Bids</h2>
                <Link to="/bids" className="view-all">View All →</Link>
              </div>
              
              {myBids.length === 0 ? (
                <div className="empty-bids">
                  <p>You haven't placed any bids yet.</p>
                </div>
              ) : (
                <div className="bids-list">
                  {myBids.map(bid => (
                    <div key={bid.id} className="bid-card">
                      <div className="bid-header">
                        <span className="bid-job">{bid.jobTitle}</span>
                        <span className={`bid-status ${bid.status}`}>
                          {bid.status}
                        </span>
                      </div>
                      <div className="bid-amount">{formatCurrency(bid.amount)}</div>
                      <div className="bid-time">Placed {formatDate(bid.createdAt)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upcoming Pickups */}
            <div className="column">
              <div className="section-header">
                <h2 className="section-title">Upcoming Pickups</h2>
                <Link to="/pickups" className="view-all">View All →</Link>
              </div>
              
              {upcomingPickups.length === 0 ? (
                <div className="empty-pickups">
                  <p>No upcoming pickups scheduled.</p>
                </div>
              ) : (
                <div className="pickups-list">
                  {upcomingPickups.map(pickup => (
                    <div key={pickup.id} className="pickup-card">
                      <div className="pickup-header">
                        <span className="pickup-customer">{pickup.customerName}</span>
                        <span className="pickup-time">{formatDate(pickup.scheduledTime)}</span>
                      </div>
                      <div className="pickup-address">{pickup.address}</div>
                      <div className="pickup-actions">
                        <button className="btn btn-sm btn-outline">Navigate</button>
                        <button className="btn btn-sm btn-primary">Start Pickup</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h2 className="section-title">Quick Actions</h2>
            <div className="actions-grid">
              <Link to="/jobs" className="action-card">
                <span className="action-icon">🔍</span>
                <span className="action-label">Browse Jobs</span>
                <span className="action-desc">Find new pickup requests</span>
              </Link>
              
              <Link to="/earnings" className="action-card">
                <span className="action-icon">💳</span>
                <span className="action-label">View Earnings</span>
                <span className="action-desc">Check your income</span>
              </Link>
              
              <Link to="/profile" className="action-card">
                <span className="action-icon">⚙️</span>
                <span className="action-label">Update Profile</span>
                <span className="action-desc">Edit business details</span>
              </Link>
              
              <Link to="/support" className="action-card">
                <span className="action-icon">🆘</span>
                <span className="action-label">Support</span>
                <span className="action-desc">Get help & guidance</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  )
}

export default CollectorDashboard