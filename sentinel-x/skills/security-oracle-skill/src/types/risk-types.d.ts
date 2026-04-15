/**
 * Type definitions for Security Oracle Skill
 */

/**
 * Risk Assessment Result
 * @typedef {Object} RiskAssessment
 * @property {number} score - Risk score (0-100)
 * @property {string} level - Risk level (SAFE/WARNING/DANGER)
 * @property {string} recommendation - Action recommendation
 * @property {Array<string>} vulnerabilities - Detected vulnerabilities
 * @property {string} contractAddress - Address of analyzed contract
 * @property {Object} dangerFlags - Dangerous function flags
 * @property {number} bytecodeLength - Length of contract bytecode
 * @property {string} [error] - Error message if analysis failed
 */

/**
 * Token Risk Assessment Result
 * @typedef {Object} TokenRiskAssessment
 * @property {string} tokenAddress - Address of token
 * @property {Object} tokenInfo - Token information (name, symbol, decimals)
 * @property {number} riskScore - Risk score (0-100)
 * @property {string} level - Risk level (SAFE/WARNING/DANGER)
 * @property {string} recommendation - Action recommendation
 * @property {Object} factors - Risk factors detected
 * @property {boolean} isHoneypot - Whether token is a honeypot
 * @property {Object} dangerFlags - Dangerous function flags
 * @property {string} [error] - Error message if scan failed
 */

/**
 * Transaction Alert
 * @typedef {Object} TransactionAlert
 * @property {string} type - Type of alert
 * @property {Object} details - Alert details
 * @property {string} severity - Alert severity (LOW/MEDIUM/HIGH)
 * @property {string} timestamp - ISO timestamp of alert
 */

/**
 * Wallet Monitoring Callback
 * @callback WalletMonitorCallback
 * @param {TransactionAlert} alert - Transaction alert
 * @returns {void}
 */

module.exports = {};