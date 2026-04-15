import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function Home() {
  const [walletAddress, setWalletAddress] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [alerts, setAlerts] = useState([])
  const [protectedAssets, setProtectedAssets] = useState([])

  // Mock data for demo
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
    }
  ]

  const mockAssets = [
    { name: 'OKB', amount: '10.5', usdValue: '$220.50', status: 'SECURE' },
    { name: 'USDT', amount: '500.0', usdValue: '$500.00', status: 'SECURE' },
    { name: 'WETH', amount: '0.25', usdValue: '$450.00', status: 'MONITORING' }
  ]

  useEffect(() => {
    if (isConnected) {
      setAlerts(mockAlerts)
      setProtectedAssets(mockAssets)
    }
  }, [isConnected])

  const connectWallet = () => {
    // Mock wallet connection
    setWalletAddress('0x742d35Cc6634C0532925a3b844Bc454e4438f44e')
    setIsConnected(true)
  }

  const disconnectWallet = () => {
    setWalletAddress('')
    setIsConnected(false)
    setAlerts([])
    setProtectedAssets([])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Sentinel X Dashboard</title>
        <meta name="description" content="Protect your crypto assets on X Layer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Sentinel X</h1>
          {isConnected ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
              <button
                onClick={disconnectWallet}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {!isConnected ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Sentinel X</h2>
            <p className="text-lg text-gray-600 mb-8">
              Protect your crypto assets on X Layer with automated security monitoring
            </p>
            <button
              onClick={connectWallet}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
            >
              Connect Wallet to Get Started
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Dashboard Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">Total Protected Value</h3>
                <p className="text-3xl font-bold text-green-600">$1,170.50</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">Active Protections</h3>
                <p className="text-3xl font-bold text-blue-600">12</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">Threats Blocked</h3>
                <p className="text-3xl font-bold text-red-600">3</p>
              </div>
            </div>

            {/* Protected Assets */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Protected Assets</h2>
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {protectedAssets.map((asset, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asset.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.usdValue}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            asset.status === 'SECURE' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {asset.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Security Alerts */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Security Alerts</h2>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{alert.type.replace('_', ' ')}</h3>
                        <p className="text-gray-600">Token: {alert.token}</p>
                        <p className="text-gray-600">Risk Score: {alert.riskScore}/100</p>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        {alert.action}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Sentinel X - AI-powered security for your crypto assets on X Layer
          </p>
        </div>
      </footer>
    </div>
  )
}