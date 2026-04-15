/**
 * Security Oracle Skill Tests
 */

const SecurityOracle = require('../src/index');

describe('SecurityOracle', () => {
  describe('analyzeContract', () => {
    test('should analyze a contract and return risk assessment', async () => {
      // Mock a safe contract address
      const result = await SecurityOracle.analyzeContract('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
      
      expect(result).toHaveProperty('score');
      expect(result).toHaveProperty('recommendation');
      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(100);
    });

    test('should handle invalid contract address', async () => {
      const result = await SecurityOracle.analyzeContract('0xINVALID');
      
      expect(result).toHaveProperty('score');
      expect(result).toHaveProperty('recommendation');
      // Should return high risk for invalid address
      expect(result.score).toBeGreaterThanOrEqual(70);
    });
  });

  describe('scanToken', () => {
    test('should scan a token and return risk assessment', async () => {
      // Mock a token address
      const result = await SecurityOracle.scanToken('0xdAC17F958D2ee523a2206206994597C13D831ec7');
      
      expect(result).toHaveProperty('riskScore');
      expect(result).toHaveProperty('recommendation');
      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.riskScore).toBeLessThanOrEqual(100);
    });

    test('should identify honeypot tokens', async () => {
      // Mock a honeypot token address
      const result = await SecurityOracle.scanToken('0x1deadf011deadf011deadf011deadf011deadf01');
      
      expect(result.isHoneypot).toBe(true);
      expect(result.recommendation).toBe('AVOID');
    });
  });

  describe('assessAsset', () => {
    test('should determine if address is contract or token and assess accordingly', async () => {
      // Test with contract address
      const contractResult = await SecurityOracle.assessAsset('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
      expect(contractResult).toHaveProperty('score');
      
      // Test with token address
      const tokenResult = await SecurityOracle.assessAsset('0xdAC17F958D2ee523a2206206994597C13D831ec7');
      expect(tokenResult).toHaveProperty('riskScore');
    });
  });
});