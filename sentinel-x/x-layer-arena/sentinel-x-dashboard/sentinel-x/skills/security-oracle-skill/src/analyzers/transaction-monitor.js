/**
 * Transaction Monitor
 * Monitors wallet transactions for suspicious activity
 */

class TransactionMonitor {
  constructor(onchainReader) {
    this.onchainReader = onchainReader;
    this.watchedWallets = new Map();
    this.monitoringInterval = null;
  }

  /**
   * Start watching a wallet for suspicious activity
   * @param {string} walletAddress - Address of wallet to monitor
   * @param {Function} callback - Function to call when alert is detected
   */
  async watch(walletAddress, callback) {
    // Store the callback for this wallet
    if (!this.watchedWallets.has(walletAddress)) {
      this.watchedWallets.set(walletAddress, []);
    }
    
    this.watchedWallets.get(walletAddress).push(callback);
    
    // Start monitoring if not already started
    if (!this.monitoringInterval) {
      this.startMonitoring();
    }
    
    console.log(`Started monitoring wallet: ${walletAddress}`);
  }

  /**
   * Stop watching a wallet
   * @param {string} walletAddress - Address of wallet to stop monitoring
   */
  unwatch(walletAddress) {
    this.watchedWallets.delete(walletAddress);
    
    // Stop monitoring if no more wallets to watch
    if (this.watchedWallets.size === 0 && this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
      console.log('Stopped monitoring - no wallets to watch');
    }
  }

  /**
   * Start the monitoring process
   */
  startMonitoring() {
    // Check for new transactions every 30 seconds
    this.monitoringInterval = setInterval(() => {
      this.checkForSuspiciousActivity();
    }, 30000);
    
    console.log('Transaction monitoring started');
  }

  /**
   * Check all watched wallets for suspicious activity
   */
  async checkForSuspiciousActivity() {
    try {
      for (const [walletAddress, callbacks] of this.watchedWallets.entries()) {
        const recentTransactions = await this.onchainReader.getRecentTransactions(walletAddress, 5);
        
        for (const tx of recentTransactions) {
          const alert = this.analyzeTransaction(tx, walletAddress);
          
          if (alert) {
            // Notify all callbacks for this wallet
            for (const callback of callbacks) {
              try {
                callback(alert);
              } catch (error) {
                console.error('Error in transaction monitor callback:', error);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error checking for suspicious activity:', error);
    }
  }

  /**
   * Analyze a transaction for suspicious activity
   * @param {Object} transaction - Transaction to analyze
   * @param {string} walletAddress - Owner of the wallet
   * @returns {Object|null} Alert if suspicious activity detected
   */
  analyzeTransaction(transaction, walletAddress) {
    // Simulate some transaction analysis
    // In a real implementation, this would check actual transaction data
    
    const txHashSeed = transaction.hash ? parseInt(transaction.hash.slice(2, 10), 16) % 1000 : 0;
    const valueSeed = transaction.value ? parseInt(transaction.value.toString().slice(0, 6)) % 1000 : 0;
    
    // Suspicious patterns we're looking for:
    const isLargeTransfer = transaction.value && transaction.value.gt && transaction.value.gt(ethers.parseEther("10"));
    const isToContract = transaction.to && this.isContractAddress(transaction.to);
    const isUnexpectedTransfer = txHashSeed > 950; // 5% chance of unexpected transfer
    const isDrainAttempt = valueSeed > 980 && isLargeTransfer; // Potential drain attempt
    
    // Check if transaction involves known risky addresses
    const isToRiskyAddress = this.isKnownRiskyAddress(transaction.to);
    
    // Check for approval to spending contracts
    const isLargeApproval = this.isLargeApproval(transaction);
    
    // Generate alerts based on detected patterns
    if (isDrainAttempt) {
      return {
        type: 'POSSIBLE_FUND_DRAIN',
        details: {
          transaction: transaction.hash,
          value: transaction.value?.toString(),
          to: transaction.to
        },
        severity: 'HIGH',
        timestamp: new Date().toISOString()
      };
    }
    
    if (isToRiskyAddress) {
      return {
        type: 'TRANSFER_TO_RISKY_ADDRESS',
        details: {
          transaction: transaction.hash,
          riskyAddress: transaction.to,
          reason: 'KNOWN_SCAM_CONTRACT'
        },
        severity: 'HIGH',
        timestamp: new Date().toISOString()
      };
    }
    
    if (isLargeApproval) {
      return {
        type: 'LARGE_APPROVAL_GIVEN',
        details: {
          transaction: transaction.hash,
          approvedAddress: transaction.to,
          amount: 'UNLIMITED'
        },
        severity: 'MEDIUM',
        timestamp: new Date().toISOString()
      };
    }
    
    if (isUnexpectedTransfer) {
      return {
        type: 'UNEXPECTED_TRANSFER',
        details: {
          transaction: transaction.hash,
          value: transaction.value?.toString(),
          to: transaction.to
        },
        severity: 'LOW',
        timestamp: new Date().toISOString()
      };
    }
    
    // No alert generated
    return null;
  }

  /**
   * Check if an address is a known contract address
   * @param {string} address - Address to check
   * @returns {boolean} True if address is a contract
   */
  isContractAddress(address) {
    // In a real implementation, this would check on-chain
    // For demo, we'll simulate based on address characteristics
    return address && address.length === 42 && address.startsWith('0x');
  }

  /**
   * Check if an address is known to be risky
   * @param {string} address - Address to check
   * @returns {boolean} True if address is known to be risky
   */
  isKnownRiskyAddress(address) {
    // Simulate known risky addresses
    const riskyAddresses = [
      '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // Example risky address
      '0x59AE8c82185746773CeC67597257C0e673B10c98', // Another example
    ];
    
    return riskyAddresses.includes(address);
  }

  /**
   * Check if transaction is a large approval
   * @param {Object} transaction - Transaction to check
   * @returns {boolean} True if large approval detected
   */
  isLargeApproval(transaction) {
    // In a real implementation, this would decode approval transactions
    // For demo, we'll simulate based on transaction data
    return transaction.input && transaction.input.startsWith('0x095ea7b3'); // approve() function selector
  }

  /**
   * Gracefully shutdown the monitor
   */
  shutdown() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    
    this.watchedWallets.clear();
    console.log('Transaction monitor shut down');
  }
}

module.exports = TransactionMonitor;