/**
 * Sentinel X Agent Tests
 */

const SentinelXAgent = require('../src/index');
const ProjectScanner = require('../src/scanners/new-project-scanner');
const VulnerabilityChecker = require('../src/scanners/vulnerability-checker');
const MarketMovementTracker = require('../src/scanners/market-movement');
const MoltbookReporter = require('../src/reporters/moltbook-reporter');
const TwitterReporter = require('../src/reporters/twitter-reporter');
const TransactionExecutor = require('../src/executors/transaction-executor');

describe('SentinelXAgent', () => {
  let agent;

  beforeEach(() => {
    agent = new SentinelXAgent();
  });

  afterEach(() => {
    if (agent.isRunning) {
      agent.stop();
    }
  });

  describe('constructor', () => {
    test('should initialize with all scanners and reporters', () => {
      expect(agent.scanners).toHaveLength(3);
      expect(agent.scanners[0]).toBeInstanceOf(ProjectScanner);
      expect(agent.scanners[1]).toBeInstanceOf(VulnerabilityChecker);
      expect(agent.scanners[2]).toBeInstanceOf(MarketMovementTracker);
      
      expect(agent.reporters).toHaveLength(2);
      expect(agent.reporters[0]).toBeInstanceOf(MoltbookReporter);
      expect(agent.reporters[1]).toBeInstanceOf(TwitterReporter);
      
      expect(agent.executor).toBeInstanceOf(TransactionExecutor);
    });
  });

  describe('generateReport', () => {
    test('should generate detailed report from finding', () => {
      const finding = {
        title: 'Test Finding',
        description: 'Test Description',
        severity: 'HIGH',
        contracts: ['0x1234567890123456789012345678901234567890'],
        recommendations: ['Fix the issue'],
        evidence: { test: true },
        tags: ['test', 'security']
      };

      const report = agent.generateReport(finding);
      
      expect(report).toHaveProperty('id');
      expect(report).toHaveProperty('timestamp');
      expect(report.title).toBe('Test Finding');
      expect(report.description).toBe('Test Description');
      expect(report.severity).toBe('HIGH');
      expect(report.affectedContracts).toEqual(['0x1234567890123456789012345678901234567890']);
      expect(report.recommendations).toEqual(['Fix the issue']);
      expect(report.evidence).toEqual({ test: true });
      expect(report.tags).toEqual(['test', 'security']);
    });
  });

  describe('getHealth', () => {
    test('should return agent health status', () => {
      const health = agent.getHealth();
      
      expect(health).toHaveProperty('running');
      expect(health).toHaveProperty('timestamp');
      expect(health).toHaveProperty('scanners');
      expect(health).toHaveProperty('reporters');
      expect(health.scanners).toBe(3);
      expect(health.reporters).toBe(2);
    });
  });
});

describe('Scanners', () => {
  describe('ProjectScanner', () => {
    test('should scan for new projects', async () => {
      const scanner = new ProjectScanner();
      const projects = await scanner.scan();
      
      expect(Array.isArray(projects)).toBe(true);
    });
  });

  describe('VulnerabilityChecker', () => {
    test('should check for vulnerabilities', async () => {
      const checker = new VulnerabilityChecker();
      const vulnerabilities = await checker.scan();
      
      expect(Array.isArray(vulnerabilities)).toBe(true);
    });
  });

  describe('MarketMovementTracker', () => {
    test('should track market movements', async () => {
      const tracker = new MarketMovementTracker();
      const movements = await tracker.scan();
      
      expect(Array.isArray(movements)).toBe(true);
    });
  });
});

describe('Reporters', () => {
  describe('MoltbookReporter', () => {
    test('should report findings to Moltbook', async () => {
      const reporter = new MoltbookReporter();
      const report = {
        title: 'Test Report',
        description: 'Test Description'
      };
      
      const result = await reporter.report(report);
      
      expect(result).toHaveProperty('success');
      expect(typeof result.success).toBe('boolean');
    });
  });

  describe('TwitterReporter', () => {
    test('should generate tweet content from report', async () => {
      const reporter = new TwitterReporter();
      const report = {
        title: 'Test Security Alert',
        severity: 'HIGH',
        affectedContracts: ['0x1234567890123456789012345678901234567890']
      };
      
      const tweetContent = reporter.generateTweetContent(report);
      
      expect(typeof tweetContent).toBe('string');
      expect(tweetContent).toContain('#XLayer');
      expect(tweetContent).toContain('Test Security Alert');
    });
  });
});