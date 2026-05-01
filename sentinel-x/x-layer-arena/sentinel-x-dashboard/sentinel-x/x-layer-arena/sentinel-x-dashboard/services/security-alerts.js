/**
 * Security Alert Service
 * Manages security alerts and notifications
 */

class SecurityAlertService {
  constructor() {
    this.alerts = [];
    this.subscribers = [];
  }

  /**
   * Subscribe to security alerts
   * @param {Function} callback - Function to call when alert is generated
   */
  subscribe(callback) {
    this.subscribers.push(callback);
  }

  /**
   * Unsubscribe from security alerts
   * @param {Function} callback - Function to unsubscribe
   */
  unsubscribe(callback) {
    const index = this.subscribers.indexOf(callback);
    if (index > -1) {
      this.subscribers.splice(index, 1);
    }
  }

  /**
   * Generate a security alert
   * @param {Object} alertData - Alert data
   */
  generateAlert(alertData) {
    const alert = {
      id: this.generateAlertId(),
      timestamp: new Date().toISOString(),
      ...alertData
    };
    
    this.alerts.push(alert);
    
    // Notify all subscribers
    for (const subscriber of this.subscribers) {
      try {
        subscriber(alert);
      } catch (error) {
        console.error('Error notifying alert subscriber:', error);
      }
    }
    
    return alert;
  }

  /**
   * Get recent alerts
   * @param {number} limit - Maximum number of alerts to return
   * @returns {Array} Recent alerts
   */
  getRecentAlerts(limit = 50) {
    // Sort by timestamp descending and take limit
    return this.alerts
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  }

  /**
   * Get alerts for a specific wallet
   * @param {string} walletAddress - Wallet address
   * @returns {Array} Alerts for the wallet
   */
  getAlertsForWallet(walletAddress) {
    return this.alerts.filter(alert => 
      alert.walletAddress === walletAddress
    ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  /**
   * Clear old alerts
   * @param {number} days - Days to keep alerts (default 30)
   */
  clearOldAlerts(days = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const originalLength = this.alerts.length;
    this.alerts = this.alerts.filter(alert => 
      new Date(alert.timestamp) > cutoffDate
    );
    
    console.log(`Cleared ${originalLength - this.alerts.length} old alerts`);
  }

  /**
   * Generate unique alert ID
   * @returns {string} Alert ID
   */
  generateAlertId() {
    return 'alert_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Get alert statistics
   * @returns {Object} Alert statistics
   */
  getStatistics() {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    const recentAlerts = this.alerts.filter(alert => 
      new Date(alert.timestamp) > oneHourAgo
    );
    
    const dailyAlerts = this.alerts.filter(alert => 
      new Date(alert.timestamp) > oneDayAgo
    );
    
    const threatLevels = {
      HIGH: this.alerts.filter(a => a.severity === 'HIGH').length,
      MEDIUM: this.alerts.filter(a => a.severity === 'MEDIUM').length,
      LOW: this.alerts.filter(a => a.severity === 'LOW').length
    };
    
    return {
      totalAlerts: this.alerts.length,
      alertsLastHour: recentAlerts.length,
      alertsToday: dailyAlerts.length,
      threatLevels,
      mostCommonType: this.getMostCommonAlertType()
    };
  }

  /**
   * Get most common alert type
   * @returns {string} Most common alert type
   */
  getMostCommonAlertType() {
    if (this.alerts.length === 0) return 'NONE';
    
    const typeCount = {};
    for (const alert of this.alerts) {
      typeCount[alert.type] = (typeCount[alert.type] || 0) + 1;
    }
    
    return Object.keys(typeCount).reduce((a, b) => 
      typeCount[a] > typeCount[b] ? a : b
    );
  }

  /**
   * Export alerts to CSV format
   * @returns {string} CSV formatted alerts
   */
  exportToCSV() {
    const headers = ['ID', 'Timestamp', 'Type', 'Severity', 'Wallet', 'Details'];
    const rows = this.alerts.map(alert => [
      alert.id,
      alert.timestamp,
      alert.type,
      alert.severity,
      alert.walletAddress || '',
      JSON.stringify(alert.details || {})
    ]);
    
    return [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
  }
}

export default new SecurityAlertService();