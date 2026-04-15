/**
 * Sentinel X Agent - Main Entry Point
 * Autonomous security agent for X Layer
 */

require('dotenv').config();
const ProjectScanner = require('./scanners/new-project-scanner');
const VulnerabilityChecker = require('./scanners/vulnerability-checker');
const MarketMovementTracker = require('./scanners/market-movement');
const MoltbookReporter = require('./reporters/moltbook-reporter');
const TwitterReporter = require('./reporters/twitter-reporter');
const TransactionExecutor = require('./executors/transaction-executor');

class SentinelXAgent {
  constructor() {
    this.scanners = [
      new ProjectScanner(),
      new VulnerabilityChecker(),
      new MarketMovementTracker()
    ];
    
    this.reporters = [
      new MoltbookReporter(),
      new TwitterReporter()
    ];
    
    this.executor = new TransactionExecutor();
    
    this.isRunning = false;
    this.scanInterval = null;
  }

  /**
   * Start the agent
   */
  async start() {
    if (this.isRunning) {
      console.log('Agent is already running');
      return;
    }
    
    this.isRunning = true;
    console.log('🚀 Sentinel X Agent started');
    console.log('📊 Scanning X Layer for security threats...');
    
    // Run initial scan
    await this.runScan();
    
    // Schedule periodic scans
    this.scanInterval = setInterval(() => {
      this.runScan();
    }, 600000); // Scan every 10 minutes
  }

  /**
   * Stop the agent
   */
  async stop() {
    if (!this.isRunning) {
      console.log('Agent is not running');
      return;
    }
    
    this.isRunning = false;
    
    if (this.scanInterval) {
      clearInterval(this.scanInterval);
      this.scanInterval = null;
    }
    
    console.log('🛑 Sentinel X Agent stopped');
  }

  /**
   * Run a complete scan cycle
   */
  async runScan() {
    try {
      console.log(`\n🔍 Starting scan cycle at ${new Date().toISOString()}`);
      
      // Run all scanners
      const findings = [];
      
      for (const scanner of this.scanners) {
        try {
          console.log(`  🔍 Running ${scanner.constructor.name}...`);
          const results = await scanner.scan();
          
          if (results && results.length > 0) {
            findings.push(...results);
            console.log(`    Found ${results.length} items`);
          }
        } catch (error) {
          console.error(`    Error in ${scanner.constructor.name}:`, error.message);
        }
      }
      
      // Process findings
      if (findings.length > 0) {
        console.log(`\n📝 Processing ${findings.length} findings...`);
        
        for (const finding of findings) {
          await this.processFinding(finding);
        }
      } else {
        console.log('\n✅ No new findings in this scan cycle');
      }
      
      console.log(`✅ Scan cycle completed at ${new Date().toISOString()}\n`);
    } catch (error) {
      console.error('Error during scan cycle:', error);
    }
  }

  /**
   * Process a security finding
   * @param {Object} finding - Security finding to process
   */
  async processFinding(finding) {
    try {
      console.log(`  📋 Processing finding: ${finding.title}`);
      
      // Generate detailed report
      const report = this.generateReport(finding);
      
      // Report to all channels
      for (const reporter of this.reporters) {
        try {
          await reporter.report(report);
          console.log(`    Reported via ${reporter.constructor.name}`);
        } catch (error) {
          console.error(`    Failed to report via ${reporter.constructor.name}:`, error.message);
        }
      }
      
      // Execute meaningful transaction if needed
      if (finding.requiresTransaction) {
        try {
          const txResult = await this.executor.executeProofTransaction(finding);
          console.log(`    Transaction executed: ${txResult.transactionHash}`);
        } catch (error) {
          console.error(`    Failed to execute transaction:`, error.message);
        }
      }
    } catch (error) {
      console.error(`  Error processing finding:`, error.message);
    }
  }

  /**
   * Generate detailed report from finding
   * @param {Object} finding - Security finding
   * @returns {Object} Detailed report
   */
  generateReport(finding) {
    return {
      id: this.generateReportId(),
      timestamp: new Date().toISOString(),
      title: finding.title,
      description: finding.description,
      severity: finding.severity || 'MEDIUM',
      affectedContracts: finding.contracts || [],
      recommendations: finding.recommendations || [],
      evidence: finding.evidence || {},
      tags: finding.tags || ['security', 'x-layer']
    };
  }

  /**
   * Generate unique report ID
   * @returns {string} Report ID
   */
  generateReportId() {
    return 'report_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Health check
   * @returns {Object} Agent health status
   */
  getHealth() {
    return {
      running: this.isRunning,
      timestamp: new Date().toISOString(),
      scanners: this.scanners.length,
      reporters: this.reporters.length
    };
  }
}

// Create and start agent if running directly
if (require.main === module) {
  const agent = new SentinelXAgent();
  
  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down agent...');
    await agent.stop();
    process.exit(0);
  });
  
  process.on('SIGTERM', async () => {
    console.log('\n🛑 Shutting down agent...');
    await agent.stop();
    process.exit(0);
  });
  
  // Start the agent
  agent.start().catch(error => {
    console.error('Failed to start agent:', error);
    process.exit(1);
  });
}

module.exports = SentinelXAgent;