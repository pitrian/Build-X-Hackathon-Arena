/**
 * Agent Configuration
 * Configuration settings for Sentinel X Agent
 */

require('dotenv').config();

const config = {
  // Agent settings
  agent: {
    name: 'SentinelX-Agent',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    logLevel: process.env.LOG_LEVEL || 'info'
  },

  // Blockchain settings
  blockchain: {
    rpcUrl: process.env.X_LAYER_RPC || 'https://sepolia.xai-chain.net/rpc',
    chainId: process.env.CHAIN_ID || 195, // X Layer chain ID
    pollInterval: parseInt(process.env.POLL_INTERVAL) || 600000, // 10 minutes
    gasLimit: parseInt(process.env.GAS_LIMIT) || 500000,
    gasPrice: process.env.GAS_PRICE || 'auto'
  },

  // Security settings
  security: {
    enableScanning: process.env.ENABLE_SCANNING !== 'false',
    enableReporting: process.env.ENABLE_REPORTING !== 'false',
    enableTransactions: process.env.ENABLE_TRANSACTIONS !== 'false',
    maxRiskThreshold: parseInt(process.env.MAX_RISK_THRESHOLD) || 70,
    autoProtectionThreshold: parseInt(process.env.AUTO_PROTECTION_THRESHOLD) || 80
  },

  // Reporting settings
  reporting: {
    moltbook: {
      enabled: !!process.env.MOLTBOOK_API_KEY,
      apiKey: process.env.MOLTBOOK_API_KEY,
      baseUrl: process.env.MOLTBOOK_BASE_URL || 'https://api.moltbook.com/v1'
    },
    twitter: {
      enabled: !!(process.env.TWITTER_API_KEY && process.env.TWITTER_API_SECRET),
      apiKey: process.env.TWITTER_API_KEY,
      apiSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    }
  },

  // Exchange integrations
  exchanges: {
    okx: {
      enabled: !!(process.env.OKX_API_KEY && process.env.OKX_SECRET_KEY),
      apiKey: process.env.OKX_API_KEY,
      secretKey: process.env.OKX_SECRET_KEY,
      passphrase: process.env.OKX_PASSPHRASE,
      baseUrl: process.env.OKX_BASE_URL || 'https://www.okx.com'
    }
  },

  // Database settings (for persistence in production)
  database: {
    enabled: process.env.DATABASE_ENABLED === 'true',
    url: process.env.DATABASE_URL || 'sqlite://sentinelx.db'
  },

  // Cache settings
  cache: {
    enabled: process.env.CACHE_ENABLED !== 'false',
    ttl: parseInt(process.env.CACHE_TTL) || 3600000, // 1 hour
    maxSize: parseInt(process.env.CACHE_MAX_SIZE) || 1000
  },

  // Notification settings
  notifications: {
    email: {
      enabled: process.env.EMAIL_NOTIFICATIONS === 'true',
      smtpHost: process.env.SMTP_HOST,
      smtpPort: parseInt(process.env.SMTP_PORT) || 587,
      username: process.env.SMTP_USERNAME,
      password: process.env.SMTP_PASSWORD
    },
    slack: {
      enabled: !!process.env.SLACK_WEBHOOK_URL,
      webhookUrl: process.env.SLACK_WEBHOOK_URL
    }
  },

  // Performance settings
  performance: {
    maxConcurrency: parseInt(process.env.MAX_CONCURRENCY) || 5,
    timeout: parseInt(process.env.REQUEST_TIMEOUT) || 30000, // 30 seconds
    retryAttempts: parseInt(process.env.RETRY_ATTEMPTS) || 3,
    retryDelay: parseInt(process.env.RETRY_DELAY) || 1000 // 1 second
  }
};

// Validate critical configuration
function validateConfig() {
  const errors = [];
  
  // Validate RPC URL
  if (!config.blockchain.rpcUrl) {
    errors.push('Missing X_LAYER_RPC configuration');
  }
  
  // Validate required security thresholds
  if (config.security.maxRiskThreshold < 0 || config.security.maxRiskThreshold > 100) {
    errors.push('MAX_RISK_THRESHOLD must be between 0 and 100');
  }
  
  if (config.security.autoProtectionThreshold < 0 || config.security.autoProtectionThreshold > 100) {
    errors.push('AUTO_PROTECTION_THRESHOLD must be between 0 and 100');
  }
  
  // Validate positive numeric values
  if (config.blockchain.pollInterval <= 0) {
    errors.push('POLL_INTERVAL must be positive');
  }
  
  if (config.blockchain.gasLimit <= 0) {
    errors.push('GAS_LIMIT must be positive');
  }
  
  if (config.performance.maxConcurrency <= 0) {
    errors.push('MAX_CONCURRENCY must be positive');
  }
  
  if (config.performance.timeout <= 0) {
    errors.push('REQUEST_TIMEOUT must be positive');
  }
  
  if (errors.length > 0) {
    throw new Error(`Configuration validation failed:\n${errors.join('\n')}`);
  }
}

// Perform validation on startup
try {
  validateConfig();
  console.log('Configuration validated successfully');
} catch (error) {
  console.error('Configuration validation error:', error.message);
  process.exit(1);
}

module.exports = config;