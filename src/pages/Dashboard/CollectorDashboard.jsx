import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { scrapAPI, bidAPI } from '../../services/api'
import Header from '../../components/Common/Header'
import Footer from '../../components/Common/Footer'
import './Dashboard.css'

const CustomerDashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    completedRequests: 0,
    totalEarnings: 0
  })
  
  const [activeRequests, setActiveRequests] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch customer stats
      const statsResponse = await scrapAPI.getCustomerStats()
      setStats(statsResponse.data)
      
      // Fetch active requests
      const requestsResponse = await scrapAPI.getActiveRequests()
      setActiveRequests(requestsResponse.data)
      
      // Fetch recent activity
      const activityResponse = await scrapAPI.getRecentActivity()
      setRecentActivity(activityResponse.data)
      
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRequestPickup = () => {
    navigate('/scrap/request')
  }

  const handleViewRequest = (requestId) => {
    navigate(`/requests/${requestId}`)
  }

  const handleAcceptBid = async (bidId, requestId) => {
    try {
      await bidAPI.acceptBid(bidId)
      alert('Bid accepted successfully!')
      fetchDashboardData()
    } catch (error) {
      alert('Failed to accept bid: ' + error.message)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount)
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
    <div className="dashboard customer-dashboard">
      <Header />
      
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="user-profile">
            <div className="profile-avatar">
              {user?.name?.charAt(0) || 'C'}
            </div>
            <div className="profile-info">
              <h3 className="profile-name">{user?.name || 'Customer'}</h3>
              <p className="profile-email">{user?.email || user?.phone}</p>
              <span className="profile-badge customer-badge">Customer</span>
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
              className={`nav-item ${activeTab === 'requests' ? 'active' : ''}`}
              onClick={() => setActiveTab('requests')}
            >
              <span className="nav-icon">📦</span>
              <span className="nav-label">My Requests</span>
              {stats.pendingRequests > 0 && (
                <span className="nav-badge">{stats.pendingRequests}</span>
              )}
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'bids' ? 'active' : ''}`}
              onClick={() => setActiveTab('bids')}
            >
              <span className="nav-icon">💰</span>
              <span className="nav-label">Bids & Offers</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <span className="nav-icon">📝</span>
              <span className="nav-label">History</span>
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
            <h1 className="dashboard-title">Welcome back, {user?.name?.split(' ')[0] || 'Customer'}!</h1>
            <button className="btn btn-primary" onClick={handleRequestPickup}>
              <span className="btn-icon">+</span>
              New Pickup Request
            </button>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <h3 className="stat-title">Total Requests</h3>
                <span className="stat-icon">📦</span>
              </div>
              <div className="stat-value">{stats.totalRequests}</div>
              <div className="stat-trend">+12% from last month</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-header">
                <h3 className="stat-title">Pending</h3>
                <span className="stat-icon">⏳</span>
              </div>
              <div className="stat-value">{stats.pendingRequests}</div>
              <div className="stat-trend">Awaiting pickup</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-header">
                <h3 className="stat-title">Completed</h3>
                <span className="stat-icon">✅</span>
              </div>
              <div className="stat-value">{stats.completedRequests}</div>
              <div className="stat-trend">Successfully processed</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-header">
                <h3 className="stat-title">Total Earnings</h3>
                <span className="stat-icon">💰</span>
              </div>
              <div className="stat-value">{formatCurrency(stats.totalEarnings)}</div>
              <div className="stat-trend">From scrap sales</div>
            </div>
          </div>

          {/* Active Requests */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title">Active Pickup Requests</h2>
              <Link to="/requests" className="view-all">View All →</Link>
            </div>
            
            {activeRequests.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <h3>No Active Requests</h3>
                <p>You haven't created any pickup requests yet.</p>
                <button className="btn btn-primary" onClick={handleRequestPickup}>
                  Create Your First Request
                </button>
              </div>
            ) : (
              <div className="requests-grid">
                {activeRequests.map(request => (
                  <div key={request.id} className="request-card">
                    <div className="request-header">
                      <span className="request-category">{request.category}</span>
                      <span className={`request-status ${request.status}`}>
                        {request.status}
                      </span>
                    </div>
                    
                    <div className="request-body">
                      <h3 className="request-title">{request.title}</h3>
                      <p className="request-description">{request.description}</p>
                      
                      <div className="request-details">
                        <div className="detail-item">
                          <span className="detail-label">Weight:</span>
                          <span className="detail-value">{request.weight} kg</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Est. Value:</span>
                          <span className="detail-value">{formatCurrency(request.estimatedValue)}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Created:</span>
                          <span className="detail-value">{formatDate(request.createdAt)}</span>
                        </div>
                      </div>
                      
                      {request.bids && request.bids.length > 0 && (
                        <div className="bids-section">
                          <h4 className="bids-title">
                            Bids Received: {request.bids.length}
                          </h4>
                          <div className="bids-list">
                            {request.bids.slice(0, 2).map(bid => (
                              <div key={bid.id} className="bid-item">
                                <div className="bid-info">
                                  <span className="bid-collector">{bid.collectorName}</span>
                                  <span className="bid-amount">{formatCurrency(bid.amount)}</span>
                                </div>
                                {request.status === 'pending' && (
                                  <button 
                                    className="btn btn-sm btn-success"
                                    onClick={() => handleAcceptBid(bid.id, request.id)}
                                  >
                                    Accept
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                          {request.bids.length > 2 && (
                            <button className="view-more-bids">
                              + {request.bids.length - 2} more bids
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="request-footer">
                      <button 
                        className="btn btn-outline"
                        onClick={() => handleViewRequest(request.id)}
                      >
                        View Details
                      </button>
                      {request.status === 'pending' && (
                        <button className="btn btn-danger btn-sm">
                          Cancel Request
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title">Recent Activity</h2>
            </div>
            
            <div className="activity-list">
              {recentActivity.length === 0 ? (
                <div className="empty-activity">
                  <p>No recent activity</p>
                </div>
              ) : (
                recentActivity.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      {activity.type === 'bid' ? '💰' : 
                       activity.type === 'pickup' ? '🚚' : 
                       activity.type === 'payment' ? '💳' : '📝'}
                    </div>
                    <div className="activity-content">
                      <p className="activity-text">{activity.description}</p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                    {activity.amount && (
                      <div className="activity-amount">
                        {formatCurrency(activity.amount)}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h2 className="section-title">Quick Actions</h2>
            <div className="actions-grid">
              <button className="action-card" onClick={handleRequestPickup}>
                <span className="action-icon">📦</span>
                <span className="action-label">New Pickup Request</span>
                <span className="action-desc">Schedule scrap collection</span>
              </button>
              
              <Link to="/price-list" className="action-card">
                <span className="action-icon">💰</span>
                <span className="action-label">View Price List</span>
                <span className="action-desc">Current scrap prices</span>
              </Link>
              
              <Link to="/collectors" className="action-card">
                <span className="action-icon">👥</span>
                <span className="action-label">Find Collectors</span>
                <span className="action-desc">Browse nearby collectors</span>
              </Link>
              
              <Link to="/profile" className="action-card">
                <span className="action-icon">⚙️</span>
                <span className="action-label">Account Settings</span>
                <span className="action-desc">Update your profile</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  )
}

export default CustomerDashboard