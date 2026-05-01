/**
 * Risk Calculator Utility
 * Calculates risk scores based on various factors
 */

class RiskCalculator {
  /**
   * Calculate contract risk score
   * @param {Object} factors - Risk factors from analysis
   * @returns {number} Risk score (0-100)
   */
  static calculateContractRisk(factors) {
    let score = 0;
    
    // High risk factors (add 40-50 points each)
    if (factors.hasMintFunction) score += 50;
    if (factors.hasOwnerFunction && factors.hasTransferOwnership) score += 40;
    
    // Medium risk factors (add 20-30 points each)
    if (factors.bytecodeSize > 50000) score += 25; // Large contract
    if (factors.proxyPattern) score += 20; // Proxy contracts can be upgraded
    
    // Low risk factors (add 5-15 points each)
    if (factors.unverifiedSource) score += 15;
    if (factors.noAudit) score += 10;
    
    // Normalize to 0-100 range
    return Math.min(100, Math.max(0, score));
  }

  /**
   * Calculate token risk score
   * @param {Object} factors - Token risk factors
   * @returns {number} Risk score (0-100)
   */
  static calculateTokenRisk(factors) {
    let score = 0;
    
    // Extremely high risk factors
    if (factors.isHoneypot) return 100;
    if (factors.cannotSell) return 95;
    
    // High risk factors
    if (factors.ownerCanMint) score += 45;
    if (factors.liquidityTooLow) score += 40;
    if (factors.topHolderOwnsTooMuch) score += 35;
    
    // Medium risk factors
    if (factors.tradingDisabled) score += 30;
    if (factors.hiddenOwner) score += 25;
    if (factors.modifiableTax) score += 20;
    
    // Low risk factors
    if (factors.noLiquidity) score += 15;
    if (factors.proxyToken) score += 10;
    if (factors.similarToScam) score += 15;
    
    return Math.min(100, Math.max(0, score));
  }

  /**
   * Get risk level description
   * @param {number} score - Risk score
   * @returns {string} Risk level
   */
  static getRiskLevel(score) {
    if (score >= 70) return 'DANGER';
    if (score >= 40) return 'WARNING';
    return 'SAFE';
  }

  /**
   * Generate recommendation based on risk score
   * @param {number} score - Risk score
   * @returns {string} Recommendation
   */
  static getRecommendation(score) {
    if (score >= 70) return 'AVOID';
    if (score >= 40) return 'PROCEED_WITH_CAUTION';
    return 'SAFE_TO_USE';
  }
}

module.exports = RiskCalculator;