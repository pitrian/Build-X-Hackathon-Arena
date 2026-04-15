/**
 * New Project Scanner
 * Scans X Layer for newly deployed contracts and tokens
 */

const { ethers } = require('ethers');

class NewProjectScanner {
  constructor() {
    // Connect to X Layer RPC
    this.provider = new ethers.JsonRpcProvider(
      process.env.X_LAYER_RPC || 'https://sepolia.xai-chain.net/rpc'
    );
    
    // Keep track of last scanned block
    this.lastScannedBlock = 0;
  }

  /**
   * Scan for new projects
   * @returns {Array} List of new projects found
   */
  async scan() {
    try {
      const currentBlock = await this.provider.getBlockNumber();
      console.log(`Scanning blocks ${this.lastScannedBlock} to ${currentBlock}`);
      
      const newProjects = [];
      
      // For demo, we'll generate some mock projects
      // In a real implementation, this would scan actual blockchain data
      const mockProjects = this.generateMockProjects(currentBlock);
      
      for (const project of mockProjects) {
        // Check if project is already known
        if (!this.isKnownProject(project.address)) {
          newProjects.push(project);
          console.log(`  Found new project: ${project.name} (${project.address})`);
        }
      }
      
      // Update last scanned block
      this.lastScannedBlock = currentBlock;
      
      return newProjects;
    } catch (error) {
      console.error('Error scanning for new projects:', error);
      return [];
    }
  }

  /**
   * Generate mock projects for demo
   * @param {number} currentBlock - Current block number
   * @returns {Array} Mock projects
   */
  generateMockProjects(currentBlock) {
    // Generate 0-3 new projects per scan (demo)
    const count = Math.floor(Math.random() * 4);
    const projects = [];
    
    for (let i = 0; i < count; i++) {
      const projectType = Math.random() > 0.5 ? 'TOKEN' : 'CONTRACT';
      
      projects.push({
        type: 'NEW_PROJECT',
        title: projectType === 'TOKEN' ? 
          `New Token: MOCK${Math.floor(Math.random() * 1000)}` : 
          `New Contract: MockProtocol${Math.floor(Math.random() * 100)}`,
        description: projectType === 'TOKEN' ?
          'A new token contract has been deployed' :
          'A new protocol contract has been deployed',
        address: '0x' + Math.random().toString(16).substr(2, 40),
        name: projectType === 'TOKEN' ? 
          `MOCK${Math.floor(Math.random() * 1000)}` : 
          `MockProtocol${Math.floor(Math.random() * 100)}`,
        projectType,
        deployBlock: currentBlock - Math.floor(Math.random() * 100),
        requiresTransaction: Math.random() > 0.7, // 30% chance requires verification
        severity: Math.random() > 0.8 ? 'HIGH' : 'LOW', // 20% high severity
        tags: ['new-project', projectType.toLowerCase(), 'x-layer']
      });
    }
    
    return projects;
  }

  /**
   * Check if a project is already known
   * @param {string} address - Project address
   * @returns {boolean} True if project is known
   */
  isKnownProject(address) {
    // In a real implementation, this would check against a database
    // For demo, we'll simulate with a simple check
    const seed = parseInt(address.slice(2, 10), 16) % 100;
    return seed < 10; // 10% chance project is already known
  }

  /**
   * Get project details from blockchain
   * @param {string} address - Project address
   * @returns {Object} Project details
   */
  async getProjectDetails(address) {
    try {
      // Check if it's a contract
      const code = await this.provider.getCode(address);
      const isContract = code !== '0x';
      
      if (!isContract) {
        return { error: 'Address is not a contract' };
      }
      
      // Get basic contract info
      const bytecode = code;
      const bytecodeSize = bytecode.length;
      
      // Try to get token info if it's a token
      let tokenInfo = null;
      try {
        const contract = new ethers.Contract(address, [
          'function name() view returns (string)',
          'function symbol() view returns (string)',
          'function decimals() view returns (uint8)'
        ], this.provider);
        
        tokenInfo = {
          name: await contract.name().catch(() => null),
          symbol: await contract.symbol().catch(() => null),
          decimals: await contract.decimals().catch(() => null)
        };
      } catch (error) {
        // Not a token contract
      }
      
      return {
        address,
        isContract,
        bytecodeSize,
        tokenInfo,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      return { error: error.message };
    }
  }
}

module.exports = NewProjectScanner;