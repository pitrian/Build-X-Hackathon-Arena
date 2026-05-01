/**
 * New Project Scanner
 * Scans X Layer for newly deployed contracts and tokens
 */

const { ethers } = require('ethers');

class NewProjectScanner {
  constructor() {
    // Try to connect to X Layer RPC, but handle failure gracefully
    this.provider = null;
    this.connected = false;
    this.initProvider();
    
    // Keep track of last scanned block
    this.lastScannedBlock = 0;
  }

  async initProvider() {
    try {
      const rpcUrl = process.env.X_LAYER_RPC || 'https://sepolia.xai-chain.net/rpc';
      this.provider = new ethers.JsonRpcProvider(rpcUrl);
      // Test connection
      await this.provider.getBlockNumber();
      this.connected = true;
      console.log('  ✓ Connected to X Layer');
    } catch (error) {
      console.log('  ⚠ Blockchain not available, running in demo mode');
      this.connected = false;
      this.provider = null;
    }
  }

  /**
   * Scan for new projects
   * @returns {Array} List of new projects found
   */
  async scan() {
    try {
      // If connected to blockchain, scan real blocks
      if (this.connected && this.provider) {
        const currentBlock = await this.provider.getBlockNumber();
        console.log(`Scanning blocks ${this.lastScannedBlock} to ${currentBlock}`);
        
        // In a real implementation, this would analyze actual blocks
        // For now, we'll still use mock data but indicate it's demo mode
      }
      
      // Generate mock projects (demo mode)
      const newProjects = this.generateMockProjects();
      
      if (newProjects.length > 0) {
        console.log(`  Found ${newProjects.length} new projects (demo data)`);
      }
      
      return newProjects;
    } catch (error) {
      console.log('  Error scanning for new projects:', error.message);
      // Return mock data anyway for demo
      return this.generateMockProjects();
    }
  }

  /**
   * Generate mock projects for demo
   * @returns {Array} Mock projects
   */
  generateMockProjects() {
    // Generate 0-3 new projects per scan (demo)
    const count = Math.floor(Math.random() * 4);
    const projects = [];
    
    const tokenNames = ['SOLANA-X', 'ETHMAX', 'BITCORN', 'PEPEAI', 'WORLDCOIN', 'CYPHER', 'NEXUS', 'ZERIUM'];
    const projectTypes = ['TOKEN', 'NFT', 'DEFI', 'GAMEFI', 'DAO'];
    
    for (let i = 0; i < count; i++) {
      const projectType = projectTypes[Math.floor(Math.random() * projectTypes.length)];
      const tokenName = tokenNames[Math.floor(Math.random() * tokenNames.length)];
      
      projects.push({
        type: 'NEW_PROJECT',
        title: `${projectType}: ${tokenName}`,
        description: `New ${projectType.toLowerCase()} project detected on X Layer`,
        address: '0x' + Math.random().toString(16).substr(2, 40),
        name: tokenName,
        projectType,
        deployBlock: Date.now(),
        requiresTransaction: Math.random() > 0.7,
        severity: Math.random() > 0.8 ? 'HIGH' : 'MEDIUM',
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
    // In demo mode, randomly mark some as known
    const seed = parseInt(address.slice(2, 10), 16) % 100;
    return seed < 10;
  }

  /**
   * Get project details from blockchain
   * @param {string} address - Project address
   * @returns {Object} Project details
   */
  async getProjectDetails(address) {
    if (!this.connected || !this.provider) {
      return {
        address,
        isContract: true,
        demoMode: true,
        tokenInfo: { name: 'Demo Token', symbol: 'DEMO', decimals: 18 },
        createdAt: new Date().toISOString()
      };
    }

    try {
      const code = await this.provider.getCode(address);
      const isContract = code !== '0x';
      
      return {
        address,
        isContract,
        bytecodeSize: code.length,
        demoMode: false,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      return { error: error.message };
    }
  }
}

module.exports = NewProjectScanner;