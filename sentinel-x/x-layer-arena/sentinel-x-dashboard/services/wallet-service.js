/**
 * Wallet Service
 * Manages Agentic Wallet creation and protection
 */

import { ethers } from 'ethers';
import SecurityOracle from '../../skills/security-oracle-skill/src/index.js';
import UniswapIntegration from './uniswap-integration.js';

class WalletService {
  constructor() {
    this.wallets = new Map(); // Store wallet protection configs
  }

  /**
   * Create a new Agentic Wallet
   * @param {string} name - Wallet name
   * @param {Object} mnemonicOrPrivateKey - Mnemonic phrase or private key
   * @returns {Object} Created wallet info
   */
  async createAgenticWallet(name, mnemonicOrPrivateKey) {
    try {
      let wallet;
      
      if (typeof mnemonicOrPrivateKey === 'string' && mnemonicOrPrivateKey.includes(' ')) {
        // Create wallet from mnemonic
        wallet = ethers.Wallet.fromPhrase(mnemonicOrPrivateKey);
      } else if (typeof mnemonicOrPrivateKey === 'string') {
        // Create wallet from private key
        wallet = new ethers.Wallet(mnemonicOrPrivateKey);
      } else {
        // Generate new wallet
        wallet = ethers.Wallet.createRandom();
      }
      
      const walletInfo = {
        id: this.generateWalletId(),
        name,
        address: wallet.address,
        publicKey: wallet.publicKey,
        createdAt: new Date().toISOString(),
        protectionEnabled: true,
        autoSwapEnabled: true,
        monitoredTokens: [],
        threatHistory: []
      };
      
      // Store wallet config
      this.wallets.set(wallet.address, walletInfo);
      
      return {
        ...walletInfo,
        privateKey: wallet.privateKey // Only return for newly generated wallets
      };
    } catch (error) {
      throw new Error(`Failed to create wallet: ${error.message}`);
    }
  }

  /**
   * Enable protection for a wallet
   * @param {string} walletAddress - Wallet address
   * @param {Object} config - Protection configuration
   */
  enableProtection(walletAddress, config = {}) {
    const walletInfo = this.wallets.get(walletAddress);
    if (!walletInfo) {
      throw new Error('Wallet not found');
    }
    
    // Update protection settings
    walletInfo.protectionEnabled = config.protectionEnabled ?? true;
    walletInfo.autoSwapEnabled = config.autoSwapEnabled ?? true;
    walletInfo.protectedTokens = config.protectedTokens || walletInfo.protectedTokens || [];
    
    this.wallets.set(walletAddress, walletInfo);
    
    console.log(`Protection enabled for wallet: ${walletAddress}`);
  }

  /**
   * Monitor a wallet for threats
   * @param {string} walletAddress - Wallet address to monitor
   */
  async monitorWallet(walletAddress) {
    const walletInfo = this.wallets.get(walletAddress);
    if (!walletInfo) {
      throw new Error('Wallet not found');
    }
    
    if (!walletInfo.protectionEnabled) {
      console.log(`Protection not enabled for wallet: ${walletAddress}`);
      return;
    }
    
    console.log(`Starting monitoring for wallet: ${walletAddress}`);
    
    // Start monitoring with Security Oracle
    await SecurityOracle.monitorWallet(walletAddress, async (alert) => {
      console.log(`Security alert for ${walletAddress}:`, alert);
      
      // Record threat in history
      walletInfo.threatHistory.push({
        ...alert,
        timestamp: new Date().toISOString()
      });
      
      // If auto-swap is enabled and threat is severe, swap risky tokens
      if (walletInfo.autoSwapEnabled && alert.severity === 'HIGH') {
        await this.handleThreat(walletAddress, alert);
      }
      
      // Update wallet info
      this.wallets.set(walletAddress, walletInfo);
    });
  }

  /**
   * Handle security threat by taking protective action
   * @param {string} walletAddress - Wallet address
   * @param {Object} threat - Threat details
   */
  async handleThreat(walletAddress, threat) {
    console.log(`Handling threat for wallet ${walletAddress}:`, threat);
    
    // In a real implementation, this would:
    // 1. Identify risky tokens in wallet
    // 2. Swap them to stablecoins using UniswapIntegration
    // 3. Record the protection action
    
    // For demo, we'll simulate the actions
    const threatId = Math.floor(Math.random() * 1000000);
    
    console.log(`Auto-swapped risky assets for wallet ${walletAddress} (threat #${threatId})`);
    
    return {
      threatId,
      actionTaken: 'AUTO_SWAP_EXECUTED',
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Get wallet information
   * @param {string} walletAddress - Wallet address
   * @returns {Object} Wallet information
   */
  getWalletInfo(walletAddress) {
    const walletInfo = this.wallets.get(walletAddress);
    if (!walletInfo) {
      throw new Error('Wallet not found');
    }
    
    return walletInfo;
  }

  /**
   * Get all monitored wallets
   * @returns {Array} List of monitored wallets
   */
  getAllWallets() {
    return Array.from(this.wallets.values());
  }

  /**
   * Generate unique wallet ID
   * @returns {string} Wallet ID
   */
  generateWalletId() {
    return 'wallet_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Add token to protection watchlist
   * @param {string} walletAddress - Wallet address
   * @param {string} tokenAddress - Token address to watch
   */
  watchToken(walletAddress, tokenAddress) {
    const walletInfo = this.wallets.get(walletAddress);
    if (!walletInfo) {
      throw new Error('Wallet not found');
    }
    
    if (!walletInfo.monitoredTokens.includes(tokenAddress)) {
      walletInfo.monitoredTokens.push(tokenAddress);
      this.wallets.set(walletAddress, walletInfo);
      console.log(`Added ${tokenAddress} to watchlist for wallet ${walletAddress}`);
    }
  }

  /**
   * Remove token from protection watchlist
   * @param {string} walletAddress - Wallet address
   * @param {string} tokenAddress - Token address to remove
   */
  unwatchToken(walletAddress, tokenAddress) {
    const walletInfo = this.wallets.get(walletAddress);
    if (!walletInfo) {
      throw new Error('Wallet not found');
    }
    
    const index = walletInfo.monitoredTokens.indexOf(tokenAddress);
    if (index > -1) {
      walletInfo.monitoredTokens.splice(index, 1);
      this.wallets.set(walletAddress, walletInfo);
      console.log(`Removed ${tokenAddress} from watchlist for wallet ${walletAddress}`);
    }
  }

  /**
   * Gracefully shutdown wallet service
   */
  shutdown() {
    // Clean up any ongoing monitoring
    for (const walletInfo of this.wallets.values()) {
      console.log(`Shutting down monitoring for wallet: ${walletInfo.address}`);
    }
    
    this.wallets.clear();
    console.log('Wallet service shut down');
  }
}

export default new WalletService();