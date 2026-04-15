/**
 * Contract Analyzer
 * Analyzes smart contracts for vulnerabilities
 */

const RiskCalculator = require('../utils/risk-calculator');

class ContractAnalyzer {
  constructor(onchainReader) {
    this.onchainReader = onchainReader;
  }

  /**
   * Analyze a smart contract for vulnerabilities
   * @param {string} contractAddress - Address of contract to analyze
   * @returns {Object} Detailed vulnerability analysis
   */
  async analyze(contractAddress) {
    try {
      // Check if it's actually a contract
      const isContract = await this.onchainReader.isContract(contractAddress);
      if (!isContract) {
        return {
          score: 100,
          vulnerabilities: ['NOT_A_CONTRACT'],
          recommendation: 'DANGER',
          error: 'Address is not a contract'
        };
      }

      // Get contract information
      const bytecode = await this.onchainReader.getBytecode(contractAddress);
      const dangerFlags = await this.onchainReader.checkDangerousFunctions(contractAddress);
      
      // Analyze bytecode for common vulnerabilities
      const vulnerabilities = this.detectVulnerabilities(bytecode, contractAddress);
      
      // Include danger flags from function checks
      if (dangerFlags.hasMintFunction) {
        vulnerabilities.push('MINT_FUNCTION');
      }
      if (dangerFlags.hasOwnerFunction) {
        vulnerabilities.push('OWNER_FUNCTION');
      }
      
      // Calculate risk score
      const riskFactors = {
        hasMintFunction: dangerFlags.hasMintFunction,
        hasOwnerFunction: dangerFlags.hasOwnerFunction,
        bytecodeSize: bytecode.length,
        proxyPattern: bytecode.includes('delegatecall'),
        unverifiedSource: true, // We're not verifying source in this demo
        noAudit: true // We're not checking audit status in this demo
      };
      
      const score = RiskCalculator.calculateContractRisk(riskFactors);
      const level = RiskCalculator.getRiskLevel(score);
      const recommendation = RiskCalculator.getRecommendation(score);
      
      return {
        score,
        level,
        recommendation,
        vulnerabilities,
        contractAddress,
        dangerFlags,
        bytecodeLength: bytecode.length
      };
    } catch (error) {
      return {
        score: 100,
        vulnerabilities: ['ANALYSIS_FAILED'],
        recommendation: 'DANGER',
        error: error.message
      };
    }
  }

  /**
   * Detect common contract vulnerabilities from bytecode
   * @param {string} bytecode - Contract bytecode
   * @param {string} address - Contract address
   * @returns {Array} List of detected vulnerabilities
   */
  detectVulnerabilities(bytecode, address) {
    const vulnerabilities = [];

    // Check for reentrancy vulnerability (simplified detection)
    if (this.hasReentrancyPattern(bytecode)) {
      vulnerabilities.push('REENTRANCY_POSSIBLE');
    }

    // Check for integer overflow/underflow (pre-Solidity 0.8.0)
    if (this.hasOverflowPattern(bytecode)) {
      vulnerabilities.push('OVERFLOW_UNDERFLOW');
    }

    // Check for timestamp dependency
    if (this.hasTimestampDependency(bytecode)) {
      vulnerabilities.push('TIMESTAMP_DEPENDENCY');
    }

    // Check for blockhash dependency
    if (this.hasBlockhashDependency(bytecode)) {
      vulnerabilities.push('BLOCKHASH_DEPENDENCY');
    }

    // Check for uninitialized storage pointer
    if (this.hasStoragePointerIssue(bytecode)) {
      vulnerabilities.push('UNINITIALIZED_STORAGE_POINTER');
    }

    return vulnerabilities;
  }

  /**
   * Check for reentrancy vulnerability pattern
   * @param {string} bytecode - Contract bytecode
   * @returns {boolean} True if reentrancy pattern detected
   */
  hasReentrancyPattern(bytecode) {
    // Look for CALL followed by SSTORE without reentrancy guard
    return bytecode.includes('55') && bytecode.includes('f1') && !bytecode.includes('mutex');
  }

  /**
   * Check for integer overflow/underflow patterns
   * @param {string} bytecode - Contract bytecode
   * @returns {boolean} True if overflow patterns detected
   */
  hasOverflowPattern(bytecode) {
    // Check for arithmetic operations without SafeMath
    const mathOps = ['01', '03', '04', '05']; // ADD, SUB, MUL, DIV
    return mathOps.some(op => bytecode.includes(op));
  }

  /**
   * Check for timestamp dependency
   * @param {string} bytecode - Contract bytecode
   * @returns {boolean} True if timestamp dependency detected
   */
  hasTimestampDependency(bytecode) {
    // TIMESTAMP opcode is 42
    return bytecode.includes('42');
  }

  /**
   * Check for blockhash dependency
   * @param {string} bytecode - Contract bytecode
   * @returns {boolean} True if blockhash dependency detected
   */
  hasBlockhashDependency(bytecode) {
    // BLOCKHASH opcode is 40
    return bytecode.includes('40');
  }

  /**
   * Check for uninitialized storage pointer issues
   * @param {string} bytecode - Contract bytecode
   * @returns {boolean} True if storage pointer issues detected
   */
  hasStoragePointerIssue(bytecode) {
    // This is a simplified check
    return bytecode.includes('80') && bytecode.includes('54');
  }
}

module.exports = ContractAnalyzer;