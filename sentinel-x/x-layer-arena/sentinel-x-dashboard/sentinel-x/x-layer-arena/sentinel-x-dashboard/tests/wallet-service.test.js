/**
 * Wallet Service Tests
 */

const WalletService = require('../services/wallet-service');

describe('WalletService', () => {
  describe('createAgenticWallet', () => {
    test('should create a new wallet with unique ID', async () => {
      const wallet = await WalletService.createAgenticWallet('Test Wallet');
      
      expect(wallet).toHaveProperty('id');
      expect(wallet).toHaveProperty('address');
      expect(wallet).toHaveProperty('publicKey');
      expect(wallet.name).toBe('Test Wallet');
      expect(wallet.protectionEnabled).toBe(true);
    });

    test('should create wallet from private key', async () => {
      const privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123';
      const wallet = await WalletService.createAgenticWallet('PK Wallet', privateKey);
      
      expect(wallet).toHaveProperty('address');
      expect(wallet).toHaveProperty('publicKey');
    });
  });

  describe('enableProtection', () => {
    test('should enable protection for wallet', async () => {
      const wallet = await WalletService.createAgenticWallet('Protection Test');
      WalletService.enableProtection(wallet.address, {
        protectionEnabled: true,
        autoSwapEnabled: true
      });
      
      const walletInfo = WalletService.getWalletInfo(wallet.address);
      expect(walletInfo.protectionEnabled).toBe(true);
      expect(walletInfo.autoSwapEnabled).toBe(true);
    });
  });

  describe('getWalletInfo', () => {
    test('should return wallet information', async () => {
      const wallet = await WalletService.createAgenticWallet('Info Test');
      const walletInfo = WalletService.getWalletInfo(wallet.address);
      
      expect(walletInfo).toHaveProperty('id');
      expect(walletInfo).toHaveProperty('name');
      expect(walletInfo).toHaveProperty('address');
      expect(walletInfo.name).toBe('Info Test');
    });

    test('should throw error for non-existent wallet', () => {
      expect(() => {
        WalletService.getWalletInfo('0xNONEXISTENT');
      }).toThrow('Wallet not found');
    });
  });
});