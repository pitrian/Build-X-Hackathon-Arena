/**
 * Onchain Reader Utility
 * Reads blockchain data from X Layer using Onchain OS
 */

const { ethers } = require('ethers');

class OnchainReader {
  constructor() {
    // Default to X Layer Testnet RPC
    this.provider = new ethers.JsonRpcProvider(
      process.env.X_LAYER_RPC || 'https://sepolia.xai-chain.net/rpc'
    );
  }

  /**
   * Check if an address is a contract
   * @param {string} address - Ethereum address
   * @returns {Promise<boolean>} True if address is a contract
   */
  async isContract(address) {
    try {
      const code = await this.provider.getCode(address);
      return code !== '0x';
    } catch (error) {
      return false;
    }
  }

  /**
   * Get contract bytecode
   * @param {string} address - Contract address
   * @returns {Promise<string>} Contract bytecode
   */
  async getBytecode(address) {
    try {
      return await this.provider.getCode(address);
    } catch (error) {
      throw new Error(`Failed to get bytecode: ${error.message}`);
    }
  }

  /**
   * Get token information (name, symbol, decimals)
   * @param {string} tokenAddress - Token contract address
   * @returns {Promise<Object>} Token information
   */
  async getTokenInfo(tokenAddress) {
    try {
      const contract = new ethers.Contract(tokenAddress, [
        'function name() view returns (string)',
        'function symbol() view returns (string)',
        'function decimals() view returns (uint8)'
      ], this.provider);

      const [name, symbol, decimals] = await Promise.all([
        contract.name().catch(() => 'Unknown'),
        contract.symbol().catch(() => 'UNKNOWN'),
        contract.decimals().catch(() => 18)
      ]);

      return { name, symbol, decimals };
    } catch (error) {
      throw new Error(`Failed to get token info: ${error.message}`);
    }
  }

  /**
   * Get token balance of an address
   * @param {string} tokenAddress - Token contract address
   * @param {string} walletAddress - Wallet address
   * @returns {Promise<bigint>} Token balance
   */
  async getTokenBalance(tokenAddress, walletAddress) {
    try {
      const contract = new ethers.Contract(tokenAddress, [
        'function balanceOf(address) view returns (uint256)'
      ], this.provider);

      return await contract.balanceOf(walletAddress);
    } catch (error) {
      throw new Error(`Failed to get token balance: ${error.message}`);
    }
  }

  /**
   * Check if token has dangerous functions (mint, owner)
   * @param {string} contractAddress - Contract address
   * @returns {Promise<Object>} Danger indicators
   */
  async checkDangerousFunctions(contractAddress) {
    try {
      const bytecode = await this.getBytecode(contractAddress);
      
      // Simple heuristic checks based on function signatures
      const hasMint = bytecode.includes('40c10f19'); // mint(address,uint256)
      const hasOwner = bytecode.includes('8da5cb5b'); // owner()
      const hasTransferOwnership = bytecode.includes('f2fde38b'); // transferOwnership(address)
      
      return {
        hasMintFunction: hasMint,
        hasOwnerFunction: hasOwner,
        hasTransferOwnership: hasTransferOwnership,
        isHighRisk: hasMint || hasOwner
      };
    } catch (error) {
      return {
        hasMintFunction: false,
        hasOwnerFunction: false,
        hasTransferOwnership: false,
        isHighRisk: false,
        error: error.message
      };
    }
  }

  /**
   * Get recent transactions for an address
   * @param {string} address - Address to monitor
   * @param {number} limit - Number of transactions to fetch
   * @returns {Promise<Array>} Recent transactions
   */
  async getRecentTransactions(address, limit = 10) {
    try {
      // This would typically use a block explorer API
      // For now, we'll return mock data
      return [];
    } catch (error) {
      return [];
    }
  }
}

module.exports = OnchainReader;