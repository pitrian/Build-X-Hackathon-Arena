'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [walletAddress, setWalletAddress] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [alerts, setAlerts] = useState([])
  const [protectedAssets, setProtectedAssets] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  const mockAlerts = [
    {
      id: 1,
      type: 'RISK_DETECTED',
      token: 'SHIBX Token',
      riskScore: 85,
      action: 'AUTO_SWAPPED',
      timestamp: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      type: 'RUG_PULL_WARNING',
      token: 'MOONLIFT Token',
      riskScore: 92,
      action: 'FUNDS_RESCUED',
      timestamp: '2024-01-15T09:15:00Z'
    },
    {
      id: 3,
      type: 'SUSPICIOUS_CONTRACT',
      token: 'DEADLOCK',
      riskScore: 78,
      action: 'FLAGGED',
      timestamp: '2024-01-15T08:00:00Z'
    }
  ]

  const mockAssets = [
    { name: 'OKB', amount: '10.5', usdValue: '$220.50', status: 'SECURE', icon: '💰' },
    { name: 'USDT', amount: '500.0', usdValue: '$500.00', status: 'SECURE', icon: '💵' },
    { name: 'WETH', amount: '0.25', usdValue: '$450.00', status: 'MONITORING', icon: 'Ξ' },
    { name: 'BTC', amount: '0.01', usdValue: '$420.00', status: 'SECURE', icon: '₿' }
  ]

  const mockTransactions = [
    { id: 1, type: 'PROTECTION', amount: '$50', token: 'USDT', time: '2 min ago', status: 'SUCCESS' },
    { id: 2, type: 'SWAP', amount: '0.1 ETH → 160 USDT', token: 'WETH', time: '15 min ago', status: 'SUCCESS' },
    { id: 3, type: 'ALERT', amount: 'Risk: 85%', token: 'SHIBX', time: '1 hr ago', status: 'BLOCKED' }
  ]

  useEffect(() => {
    if (isConnected) {
      setIsLoading(true)
      setTimeout(() => {
        setAlerts(mockAlerts)
        setProtectedAssets(mockAssets)
        setIsLoading(false)
      }, 1000)
    }
  }, [isConnected])

  const connectWallet = () => {
    setIsLoading(true)
    setTimeout(() => {
      setWalletAddress('0x742d35Cc6634C0532925a3b844Bc454e4438f44e')
      setIsConnected(true)
      setIsLoading(false)
    }, 1500)
  }

  const disconnectWallet = () => {
    setWalletAddress('')
    setIsConnected(false)
    setAlerts([])
    setProtectedAssets([])
  }

  return (
    <div className="dashboard">
      {/* Animated Background */}
      <div className="bg-effects">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">
              <span className="logo-icon">🛡️</span>
              <span className="logo-text">Sentinel X</span>
            </div>
            <span className="logo-badge">PROTECTION ACTIVE</span>
          </div>
          
          <nav className="nav-menu">
            {['dashboard', 'wallet', 'alerts', 'settings'].map(tab => (
              <button
                key={tab}
                className={`nav-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>

          {isConnected ? (
            <div className="wallet-section connected">
              <div className="wallet-info">
                <span className="wallet-label">Connected</span>
                <span className="wallet-address">
                  {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
                </span>
              </div>
              <button onClick={disconnectWallet} className="disconnect-btn">
                Disconnect
              </button>
            </div>
          ) : (
            <button onClick={connectWallet} className="connect-btn" disabled={isLoading}>
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : (
                'Connect Wallet'
              )}
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {!isConnected ? (
          <div className="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">
                <span className="title-accent">AI-Powered</span>
                <br />
                Security for X Layer
              </h1>
              <p className="hero-desc">
                Protect your crypto assets with intelligent threat detection and automated protection mechanisms.
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-value">50K+</span>
                  <span className="stat-label">Wallets Protected</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">$120M</span>
                  <span className="stat-label">Assets Secured</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">99.9%</span>
                  <span className="stat-label">Threat Detection</span>
                </div>
              </div>
              <button onClick={connectWallet} className="cta-btn">
                <span>🚀</span> Start Protecting Now
              </button>
            </div>
            <div className="hero-visual">
              <div className="shield-animation">
                <div className="shield-icon">🛡️</div>
                <div className="shield-ring ring-1"></div>
                <div className="shield-ring ring-2"></div>
                <div className="shield-ring ring-3"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="dashboard-grid">
            {/* Stats Row */}
            <div className="stats-row">
              <div className="stat-card stat-primary">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <span className="stat-title">Total Protected</span>
                  <span className="stat-value">$1,590.50</span>
                  <span className="stat-change positive">+12.5%</span>
                </div>
              </div>
              <div className="stat-card stat-blue">
                <div className="stat-icon">🛡️</div>
                <div className="stat-info">
                  <span className="stat-title">Active Guards</span>
                  <span className="stat-value">4</span>
                  <span className="stat-label">Wallets</span>
                </div>
              </div>
              <div className="stat-card stat-danger">
                <div className="stat-icon">🚨</div>
                <div className="stat-info">
                  <span className="stat-title">Threats Blocked</span>
                  <span className="stat-value">7</span>
                  <span className="stat-label">This week</span>
                </div>
              </div>
              <div className="stat-card stat-success">
                <div className="stat-icon">⚡</div>
                <div className="stat-info">
                  <span className="stat-title">Auto-Swaps</span>
                  <span className="stat-value">3</span>
                  <span className="stat-label">Executed</span>
                </div>
              </div>
            </div>

            {/* Main Panels */}
            <div className="panels-row">
              {/* Assets Panel */}
              <div className="panel assets-panel">
                <div className="panel-header">
                  <h3>🪙 Protected Assets</h3>
                  <button className="panel-action">+ Add Asset</button>
                </div>
                <div className="assets-list">
                  {protectedAssets.map((asset, index) => (
                    <div key={index} className="asset-item">
                      <div className="asset-icon">{asset.icon}</div>
                      <div className="asset-info">
                        <span className="asset-name">{asset.name}</span>
                        <span className="asset-amount">{asset.amount}</span>
                      </div>
                      <div className="asset-value">
                        <span className="usd-value">{asset.usdValue}</span>
                        <span className={`status-badge ${asset.status.toLowerCase()}`}>
                          {asset.status === 'SECURE' ? '✓ Secured' : '◐ Monitoring'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alerts Panel */}
              <div className="panel alerts-panel">
                <div className="panel-header">
                  <h3>🚨 Security Alerts</h3>
                  <span className="alert-count">{alerts.length}</span>
                </div>
                <div className="alerts-list">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="alert-item">
                      <div className="alert-icon">
                        {alert.riskScore > 90 ? '💀' : alert.riskScore > 70 ? '⚠️' : '🔔'}
                      </div>
                      <div className="alert-content">
                        <span className="alert-type">{alert.type.replace('_', ' ')}</span>
                        <span className="alert-token">{alert.token}</span>
                        <div className="alert-meta">
                          <span className="risk-score">Risk: {alert.riskScore}/100</span>
                          <span className="alert-time">
                            {new Date(alert.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                      <span className={`action-badge ${alert.action.toLowerCase().replace('_', '-')}`}>
                        {alert.action}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="activity-panel">
              <div className="panel-header">
                <h3>📊 Recent Activity</h3>
              </div>
              <div className="activity-list">
                {mockTransactions.map((tx) => (
                  <div key={tx.id} className="activity-item">
                    <div className={`activity-icon ${tx.type.toLowerCase()}`}>
                      {tx.type === 'PROTECTION' ? '🛡️' : tx.type === 'SWAP' ? '🔄' : '🚨'}
                    </div>
                    <div className="activity-info">
                      <span className="activity-type">{tx.type}</span>
                      <span className="activity-details">{tx.amount}</span>
                    </div>
                    <span className={`status-dot ${tx.status.toLowerCase()}`}></span>
                    <span className="activity-time">{tx.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <span>🛡️ Sentinel X</span>
          <span className="footer-sep">|</span>
          <span>Powered by AI on X Layer</span>
          <span className="footer-sep">|</span>
          <span className="status-indicator">● System Online</span>
        </div>
      </footer>

      <style jsx>{`
        .dashboard {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* Animated Background */
        .bg-effects {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
          overflow: hidden;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0d0d1a 100%);
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.5;
          animation: float 20s infinite ease-in-out;
        }

        .orb-1 {
          width: 600px;
          height: 600px;
          background: linear-gradient(180deg, #3b82f6 0%, #8b5cf6 100%);
          top: -200px;
          right: -100px;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 500px;
          height: 500px;
          background: linear-gradient(180deg, #10b981 0%, #06b6d4 100%);
          bottom: -150px;
          left: -100px;
          animation-delay: -7s;
        }

        .orb-3 {
          width: 400px;
          height: 400px;
          background: linear-gradient(180deg, #f59e0b 0%, #ef4444 100%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -14s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(50px, -30px) scale(1.1); }
          50% { transform: translate(-30px, 50px) scale(0.9); }
          75% { transform: translate(-50px, -20px) scale(1.05); }
        }

        /* Header */
        .header {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo-icon {
          font-size: 2rem;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .logo-badge {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 600;
          animation: glow 2s infinite;
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px #10b981; }
          50% { box-shadow: 0 0 20px #10b981; }
        }

        .nav-menu {
          display: flex;
          gap: 0.5rem;
        }

        .nav-btn {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
        }

        .nav-btn:hover, .nav-btn.active {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .connect-btn {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border: none;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .connect-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
        }

        .connect-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .wallet-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .wallet-info {
          display: flex;
          flex-direction: column;
        }

        .wallet-label {
          font-size: 0.7rem;
          color: #10b981;
        }

        .wallet-address {
          color: white;
          font-family: monospace;
          font-size: 0.9rem;
        }

        .disconnect-btn {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid #ef4444;
          color: #ef4444;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .disconnect-btn:hover {
          background: #ef4444;
          color: white;
        }

        /* Main Content */
        .main-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        /* Hero Section */
        .hero-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          min-height: 70vh;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          color: white;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }

        .title-accent {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-desc {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 2rem;
        }

        .hero-stats {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #3b82f6;
        }

        .stat-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .cta-btn {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border: none;
          color: white;
          padding: 1rem 2rem;
          border-radius: 16px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.4);
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .shield-animation {
          position: relative;
          width: 300px;
          height: 300px;
        }

        .shield-icon {
          font-size: 8rem;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: shield-pulse 3s infinite;
        }

        @keyframes shield-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }

        .shield-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgba(59, 130, 246, 0.3);
          animation: ring-pulse 3s infinite;
        }

        .ring-1 {
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        .ring-2 {
          width: 120%;
          height: 120%;
          top: -10%;
          left: -10%;
          animation-delay: -1s;
        }

        .ring-3 {
          width: 140%;
          height: 140%;
          top: -20%;
          left: -20%;
          animation-delay: -2s;
        }

        @keyframes ring-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.05); }
        }

        /* Dashboard Grid */
        .dashboard-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          gap: 1rem;
          transition: all 0.3s;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .stat-icon {
          font-size: 2rem;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-title {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .stat-card .stat-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: white;
        }

        .stat-change {
          font-size: 0.8rem;
        }

        .stat-change.positive {
          color: #10b981;
        }

        .stat-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .panels-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .panel {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .panel-header h3 {
          color: white;
          font-size: 1.1rem;
        }

        .panel-action {
          background: rgba(59, 130, 246, 0.2);
          border: none;
          color: #3b82f6;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.8rem;
        }

        .alert-count {
          background: #ef4444;
          color: white;
          padding: 0.2rem 0.6rem;
          border-radius: 10px;
          font-size: 0.8rem;
        }

        .assets-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .asset-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          transition: all 0.3s;
        }

        .asset-item:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .asset-icon {
          width: 40px;
          height: 40px;
          background: rgba(59, 130, 246, 0.2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }

        .asset-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .asset-name {
          color: white;
          font-weight: 600;
        }

        .asset-amount {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.85rem;
        }

        .asset-value {
          text-align: right;
          display: flex;
          flex-direction: column;
        }

        .usd-value {
          color: white;
          font-weight: 600;
        }

        .status-badge {
          font-size: 0.7rem;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }

        .status-badge.secured {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        .status-badge.monitoring {
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
        }

        .alerts-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .alert-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          border-left: 3px solid #ef4444;
        }

        .alert-icon {
          font-size: 1.5rem;
        }

        .alert-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .alert-type {
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .alert-token {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.8rem;
        }

        .alert-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .risk-score {
          color: #ef4444;
        }

        .action-badge {
          padding: 0.3rem 0.6rem;
          border-radius: 6px;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .action-badge.auto-swapped {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        .action-badge.funds-rescued {
          background: rgba(59, 130, 246, 0.2);
          color: #3b82f6;
        }

        .action-badge.flagged {
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
        }

        .activity-panel {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
        }

        .activity-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }

        .activity-icon.protection { background: rgba(16, 185, 129, 0.2); }
        .activity-icon.swap { background: rgba(59, 130, 246, 0.2); }
        .activity-icon.alert { background: rgba(239, 68, 68, 0.2); }

        .activity-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .activity-type {
          color: white;
          font-weight: 500;
          font-size: 0.9rem;
        }

        .activity-details {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.8rem;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .status-dot.success { background: #10b981; }
        .status-dot.blocked { background: #ef4444; }

        .activity-time {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.8rem;
        }

        /* Footer */
        .footer {
          background: rgba(255, 255, 255, 0.03);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1rem;
          margin-top: 2rem;
        }

        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.85rem;
        }

        .footer-sep {
          color: rgba(255, 255, 255, 0.2);
        }

        .status-indicator {
          color: #10b981;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .stats-row {
            grid-template-columns: repeat(2, 1fr);
          }
          .panels-row {
            grid-template-columns: 1fr;
          }
          .hero-section {
            grid-template-columns: 1fr;
          }
          .hero-visual {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 1rem;
          }
          .nav-menu {
            display: none;
          }
          .stats-row {
            grid-template-columns: 1fr;
          }
          .hero-title {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  )
}