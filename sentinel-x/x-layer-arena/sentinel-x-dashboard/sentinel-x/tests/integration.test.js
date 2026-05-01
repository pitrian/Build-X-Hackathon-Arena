/**
 * Integration Tests for Sentinel X System
 */

const SecurityOracle = require('../../skills/security-oracle-skill/src/index');
const WalletService = require('../../x-layer-arena/sentinel-x-dashboard/services/wallet-service');
const SentinelXAgent = require('../../agent-track/sentinel-x-agent/src/index');

describe('Sentinel X Integration', () => {
  describe('End-to-End Workflow', () => {
    test('should integrate Security Oracle with Wallet Service', async () => {
      // Create a test wallet
      const wallet = await WalletService.createAgenticWallet('Integration Test Wallet');
      
      // Enable protection
      WalletService.enableProtection(wallet.address);
      
      // Analyze a mock contract using Security Oracle
      const analysis = await SecurityOracle.analyzeContract('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
      
      expect(analysis).toHaveProperty('score');
      expect(analysis).toHaveProperty('recommendation');
      
      // Add contract to watchlist
      WalletService.watchToken(wallet.address, '0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
      
      // Check wallet info
      const walletInfo = WalletService.getWalletInfo(wallet.address);
      expect(walletInfo.monitoredTokens).toContain('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
    });

    test('should integrate with Agent for autonomous protection', async () => {
      // Create agent
      const agent = new SentinelXAgent();
      
      // Check agent health
      const health = agent.getHealth();
      expect(health.running).toBe(false); // Not started yet
      expect(health.scanners).toBe(3);
      expect(health.reporters).toBe(2);
      
      // Check that security oracle works with agent scanners
      const projectScanner = agent.scanners[0];
      const projects = await projectScanner.scan();
      
      expect(Array.isArray(projects)).toBe(true);
    });
  });

  describe('Cross-Module Functionality', () => {
    test('should share data between modules', async () => {
      // Test that Security Oracle can analyze tokens that Wallet Service manages
      const tokenAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
      
      // Security Oracle analysis
      const tokenAnalysis = await SecurityOracle.scanToken(tokenAddress);
      expect(tokenAnalysis).toHaveProperty('riskScore');
      
      // Wallet Service should be able to monitor this token
      const wallet = await WalletService.createAgenticWallet('Cross-Module Test');
      WalletService.watchToken(wallet.address, tokenAddress);
      
      const walletInfo = WalletService.getWalletInfo(wallet.address);
      expect(walletInfo.monitoredTokens).toContain(tokenAddress);
      
      // If risk is high, wallet should be able to take action
      if (tokenAnalysis.riskScore > 70) {
        expect(tokenAnalysis.recommendation).toBe('AVOID');
      }
    });
  });
});