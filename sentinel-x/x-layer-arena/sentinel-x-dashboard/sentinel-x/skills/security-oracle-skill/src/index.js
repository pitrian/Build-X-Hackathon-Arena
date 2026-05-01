/**
 * Security Oracle Skill - Main Entry Point
 * Provides security analysis capabilities for X Layer contracts and tokens
 */

const ContractAnalyzer = require('./analyzers/contract-analyzer');
const TokenRiskScanner = require('./analyzers/token-risk-scanner');
const TransactionMonitor = require('./analyzers/transaction-monitor');
const OnchainReader = require('./utils/onchain-reader');

class SecurityOracle {
  constructor() {
    this.onchainReader = new OnchainReader();
    this.contractAnalyzer = new ContractAnalyzer(this.onchainReader);
    this.tokenRiskScanner = new TokenRiskScanner(this.onchainReader);
    this.transactionMonitor = new TransactionMonitor(this.onchainReader);
  }

  /**
   * Analyze a smart contract for vulnerabilities
   * @param {string} contractAddress - Address of the contract to analyze
   * @returns {Object} Risk assessment with score and vulnerabilities
   */
  async analyzeContract(contractAddress) {
    try {
      const analysis = await this.contractAnalyzer.analyze(contractAddress);
      return analysis;
    } catch (error) {
      console.error(`Error analyzing contract ${contractAddress}:`, error);
      return {
        score: 100,
        vulnerabilities: ['ANALYSIS_ERROR'],
        recommendation: 'DANGER',
        error: error.message
      };
    }
  }

  /**
   * Scan a token for security risks
   * @param {string} tokenAddress - Address of the token to scan
   * @returns {Object} Risk assessment of the token
   */
  async scanToken(tokenAddress) {
    try {
      const riskAssessment = await this.tokenRiskScanner.scan(tokenAddress);
      return riskAssessment;
    } catch (error) {
      console.error(`Error scanning token ${tokenAddress}:`, error);
      return {
        riskScore: 100,
        factors: ['SCAN_ERROR'],
        isHoneypot: true,
        error: error.message
      };
    }
  }

  /**
   * Monitor a wallet for suspicious activity
   * @param {string} walletAddress - Address of the wallet to monitor
   * @param {Function} callback - Function to call when alert is detected
   */
  async monitorWallet(walletAddress, callback) {
    try {
      await this.transactionMonitor.watch(walletAddress, callback);
    } catch (error) {
      console.error(`Error monitoring wallet ${walletAddress}:`, error);
      callback({
        type: 'MONITORING_ERROR',
        details: error.message,
        severity: 'HIGH'
      });
    }
  }

  /**
   * Calculate overall risk score for an asset
   * @param {string} assetAddress - Address of the asset (token or contract)
   * @returns {Object} Comprehensive risk assessment
   */
  async assessAsset(assetAddress) {
    // Determine if it's a contract or token
    const isContract = await this.onchainReader.isContract(assetAddress);
    
    if (isContract) {
      return await this.analyzeContract(assetAddress);
    } else {
      return await this.scanToken(assetAddress);
    }
  }
}

module.exports = new SecurityOracle();