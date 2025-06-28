import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// HEX Whitepaper Knowledge Base
const HEX_KNOWLEDGE_BASE = `
HEX Cryptocurrency Whitepaper Knowledge Base:

OVERVIEW:
HEX is a project to recreate a banking product called a Time Deposit. It is an ERC-20 token and fully automated smart contract on the Ethereum blockchain (now also on PulseChain). The purpose is to provide high-yield returns through staking mechanisms.

CORE MECHANICS:
1. TIME DEPOSIT CONCEPT: Users stake (lock up) HEX tokens for a specified period (1-5555 days) to earn rewards
2. STAKE REWARDS: Stakers earn interest through daily payouts distributed from inflation
3. SHARE SYSTEM: Stakes are converted to "shares" based on amount and length for reward calculations
4. BONUSES: LongerPaysBetter and BiggerPaysBetter bonuses incentivize larger and longer stakes

CLAIMING PROCESS (Historical):
- BTC holders could claim 10,000 HEX per BTC held at snapshot
- 90% of claimed HEX was automatically staked for minimum 350 days
- 10% was immediately available
- Speed bonuses for early claims, penalties for late claims
- Claiming period has ended

STAKING MECHANICS:
- Minimum stake: 1 day, Maximum: 5555 days
- Longer stakes receive exponentially better bonuses
- Larger stakes receive slightly better share rates
- Early unstaking incurs severe penalties
- Late unstaking also incurs penalties
- Emergency unstaking available but costly

TRANSFORM LOBBIES:
- Daily auctions converting ETH to HEX
- Participants share available HEX proportionally
- Each day has predetermined HEX amount available
- Price discovery mechanism through collective participation

PENALTIES:
- Early unstaking: Forfeit earned interest and pay principal penalty
- Late unstaking: Decreasing penalties but still significant
- Emergency unstaking: Available but with maximum penalties
- Penalties are redistributed to remaining stakers

PULSECHAIN BENEFITS (from pulsechain.com):
- Lower transaction fees (pennies vs dollars)
- Faster block times (4 seconds vs 12-15 seconds)
- Same smart contract mechanics as Ethereum
- Free copies for Ethereum HEX holders at launch
- Better user experience for frequent transactions
- Enhanced scalability for DeFi operations
- Native HEX integration and optimization

SECURITY FEATURES:
- Immutable smart contract
- Open source and audited
- No central authority can change rules
- Transparent on-chain operations
- Penalty mechanisms protect stakers

HEX SMART CONTRACT TECHNICAL IMPLEMENTATION:

CONTRACT ARCHITECTURE:
The HEX contract is implemented in Solidity 0.5.13 with multiple inheritance layers:
- ERC20: Standard token functionality with SafeMath for overflow protection
- GlobalsAndUtility: Core state management, daily data updates, and global variables
- StakeableToken: Complete staking mechanics and reward calculations
- UTXOClaimValidation: Bitcoin claim verification using Merkle tree proofs
- UTXORedeemableToken: Bitcoin address claiming functionality with signature verification
- TransformableToken: Transform lobby (auction) system for ETH-to-HEX conversion
- HEX: Main contract combining all functionality layers

KEY CONTRACT CONSTANTS:
- Launch Time: December 3, 2019 (Unix timestamp: 1575331200)
- Hearts per HEX: 100,000,000 (8 decimal places for precision)
- Claim Phase Duration: 350 days from launch
- Big Pay Day: Day 351 (major reward distribution at end of claim phase)
- Share Rate Scale: 100,000 for mathematical precision
- Origin Address: 0x9A6a414D6F3497c05E3b1De90520765fA1E07c03 (receives bonuses)
- Flush Address: 0xDEC9f2793e3c17cd26eeFb21C4762fA5128E0399 (for ETH cleanup)

STAKING IMPLEMENTATION DETAILS:
- Minimum Stake: 1 day (350 days minimum for auto-stakes from Bitcoin claims)
- Maximum Stake: 5555 days (approximately 15 years)
- LPB Calculation: (extraDays / 364) * 20% bonus, capped at 200% maximum
- BPB Calculation: (cappedHearts / 150M HEX) * 10% bonus for first 150M HEX
- Share Rate: Dynamic rate starting at 1.0, increases based on stake performance
- Penalty Distribution: 50% to Origin address, 50% to global stake penalty pool
- Early End Penalty: Minimum 90 days penalty period, scales with stake length
- Late End Penalty: 2-week grace period, then scales up to 100% over 700 days

DAILY INTEREST CALCULATION MECHANICS:
- Annual Inflation Rate: Approximately 3.69% (designed to be sustainable)
- Daily Interest Formula: allocatedSupply * 10000 / 100448995
- Payout Distribution: Proportional to individual stake shares vs total shares
- Big Pay Day Bonus: Additional rewards from all unclaimed Bitcoin Satoshis
- Adoption Bonuses: Viral rewards (claimed addresses) + Critical mass rewards (claimed satoshis)

BITCOIN CLAIM SYSTEM TECHNICAL DETAILS:
- Merkle Tree Root: 0x4e831acb4223b66de3b3d2e54a2edeefb0de3d7916e2886a4b134d9764d41bec
- Total Claimable Addresses: 27,997,742 Bitcoin addresses from UTXO snapshot
- Total Claimable Satoshis: 910,087,996,911,001 (after Silly Whale adjustment)
- Full UTXO Total: 1,807,766,732,160,668 Satoshis (before adjustments)
- Silly Whale Penalty: Progressive reduction for addresses with >1000 BTC
- Late Claim Penalty: Linear reduction as claim phase progresses
- Speed Bonus: Up to 20% bonus for early claims (first day = 20%, last day = 0%)
- Claim Conversion Rate: 10,000 HEX per BTC (before bonuses/penalties)

TRANSFORM LOBBY TECHNICAL MECHANICS:
- Entry Mechanism: Users send ETH to contract for daily auction participation
- Exit Calculation: HEX received = (user ETH / total day ETH) * daily HEX allocation
- WAAS Allocation: Daily HEX from unclaimed Bitcoin, distributed proportionally
- Lobby Duration: 350 days during claim phase only
- Referral System: 10% bonus to claimer, 20% bonus to referrer
- ETH Handling: All ETH sent to flush address, only HEX distributed to users

SMART CONTRACT SECURITY FEATURES:
- Merkle Proof Validation: Cryptographic verification of Bitcoin UTXO inclusion
- ECDSA Signature Verification: Bitcoin signature validation for claim authenticity
- Reentrancy Protection: Safe external call patterns throughout contract
- Integer Overflow Protection: SafeMath library used for all arithmetic operations
- Access Control: Origin address has special privileges for emergency functions
- Input Validation: Comprehensive parameter checking and bounds validation
- State Consistency: Atomic operations ensure contract state remains valid

GAS OPTIMIZATION TECHNIQUES:
- Packed Storage Structs: Efficient packing to minimize storage slots and gas costs
- Batch Operations: Single transactions can update multiple days of data
- Event Data Compression: Packed event parameters to reduce transaction costs
- Lazy State Updates: Daily data only updated when needed, not every transaction
- Efficient Loops: Optimized iteration patterns for reward calculations

ADVANCED CONTRACT FEATURES:
- Share Rate Evolution: Automatically increases over time based on stake performance
- Good Accounting Function: Allows third parties to unlock mature stakes for penalty distribution
- Emergency End Stakes: Users can end stakes early with maximum penalties applied
- Daily Data Range Queries: Batch functions to retrieve multiple days of data efficiently
- Lobby Pending Days: Bitmap functions to check user participation across multiple days

TOKENOMICS:
- Approximately 3.69% annual inflation
- All inflation goes to stakers
- Deflationary through penalties
- Share price increases over time
- Supply becomes more deflationary as adoption grows

CONTRACT FUNCTIONS:
- stakeStart(hearts, days): Begin a new stake with specified amount and duration
- stakeEnd(stakeIndex, stakeId): End a matured stake and claim rewards
- stakeGoodAccounting(stakerAddr, stakeIndex, stakeId): Unlock completed stakes for penalty distribution
- xfLobbyEnter(referrerAddr): Join transform lobby with ETH payment
- xfLobbyExit(enterDay, count): Exit transform lobby and claim proportional HEX
- btcAddressClaim(...): Historical Bitcoin address claiming with signature verification
- dailyDataUpdate(beforeDay): Update daily interest calculations for specified range
- currentDay(): Get current day number since contract launch

RISK FACTORS:
- Smart contract risk (though audited and battle-tested)
- Market volatility affecting token price
- Regulatory uncertainty in cryptocurrency space
- Technology adoption risk and network effects
- Penalty risks from early or late unstaking
- Gas fee volatility on Ethereum network

BEST PRACTICES:
- Only stake what you can afford to lock up for the full duration
- Understand penalty mechanisms thoroughly before staking
- Consider ladder staking strategies to manage risk and liquidity
- Use PulseChain for significantly lower transaction fees
- Always verify transactions on official sites (hex.com)
- Never share private keys, seed phrases, or wallet access
- Test with small amounts before large transactions

HEX SMART CONTRACT SECURITY AUDIT:

AUDIT OVERVIEW:
Professional security audit conducted by CoinFabrik (December 17, 2019)
- Official Report: [HEX Smart Contract Audit](https://www.coinfabrik.com/blog/hex-smart-contract-audit/)
- Repository: https://gitlab.com/bitcoinhex/contract-staging
- Audit Scope: All core HEX contract files
- Methodology: Comprehensive security analysis following industry standards
- Final Status: No critical or medium severity issues found

AUDITED CONTRACTS:
- GlobalsAndUtility.sol: Core state management and utility functions
- HEX.sol: Main contract combining all functionality
- StakeableToken.sol: Complete staking mechanics implementation
- TransformableToken.sol: Transform lobby auction system
- UTXOClaimValidation.sol: Bitcoin claim verification system
- UTXORedeemableToken.sol: Bitcoin address claiming functionality

SECURITY ANALYSIS METHODOLOGY:
The audit analyzed the code for the following potential vulnerabilities:
- Misuse of call methods (call.value(), send(), transfer())
- Integer overflow/underflow and SafeMath usage
- Outdated Solidity compiler versions
- Race conditions (reentrancy attacks, front running)
- Block timestamp manipulation
- Contract denial-of-service attacks
- Gas cost optimization issues
- Missing or incorrect function qualifiers
- Fallback function gas limit issues
- Code quality and complexity analysis
- Error handling implementation
- Withdrawal pattern compliance
- Function input validation
- Digital signature security

SEVERITY CLASSIFICATION SYSTEM:
- Critical: Large-scale user risk, catastrophic impact potential
- Medium: Subset user risk, moderate financial impact
- Minor: Small risk, limited exploitation potential
- Enhancement: Best practices, defensive improvements

AUDIT FINDINGS SUMMARY:

CRITICAL SEVERITY ISSUES:
✅ No critical issues found

MEDIUM SEVERITY ISSUES:
✅ No medium severity issues found

MINOR SEVERITY ISSUES IDENTIFIED:
1. Replay Signature Attack (Resolved)
   - Issue: Partial referrer address in signed messages enabled signature reuse
   - Impact: Attackers could potentially redirect referrer bonuses
   - Resolution: Increased prefix length from 8 to 12 bytes
   - Status: Fixed in commit 8640000cba2c8180a656fee53ba3d83e01970652

2. Excessive Gas Consumption (Resolved)
   - Issue: _calcPayoutRewards function could exceed block gas limit for maximum stakes
   - Impact: Users unable to close very long stakes due to gas limits
   - Resolution: Reduced MAX_STAKE_DAYS from 18,200 to 5,555 days
   - Status: Fixed in commit cd59207e95b2c020b1bb7099f68fdf4d13ecb6e9

3. Unused Payable Fallback Function (Acknowledged)
   - Issue: Fallback function marked payable but serves no purpose
   - Impact: Users could accidentally send ETH to contract
   - Resolution: HEX team acknowledged as acceptable risk
   - Status: Intentionally left as-is for undocumented use cases

ENHANCEMENT RECOMMENDATIONS (All Addressed):
1. Function Naming Clarity
   - Issue: goodAccounting function name unclear
   - Resolution: Renamed to stakeGoodAccounting
   - Status: Fixed in commit 200fa7bbcea5225c2c9e42cd7bc9a6dc57f30a26

2. Documentation Improvements
   - Issue: Insufficient parameter documentation for internal functions
   - Resolution: Removed documentation for private functions
   - Status: Fixed in commit 1af0028b1d0f5eb21c7e2787fb1d892bc1e50b05

3. Magic Constants Clarification
   - Issue: Numeric constants without descriptive names
   - Resolution: Added named constants like HEART_UINT_SIZE
   - Status: Partially addressed in commit 4c1d5f2e99b093e9c2a6696f7e706d21c0e679cb

4. Implicit Initialization Documentation
   - Issue: Memory struct initialization not explicitly documented
   - Resolution: Removed ambiguous _batchMintOrigin field
   - Status: Fixed in commit 640906556dd14b2b57902185557b36f8d4251806

IMPORTANT AUDIT OBSERVATIONS:
- Type Safety: Contract uses uint72, uint96 types converted to uint256 for calculations
- Merkle Tree Security: Bitcoin address validation properly implemented
- Optimization Requirement: Contract must be compiled with optimizations enabled
- Gas Efficiency: Designed for mainnet deployment with cost considerations
- Code Quality: Well-written and properly documented Solidity code

SECURITY STRENGTHS IDENTIFIED:
- Comprehensive SafeMath usage prevents integer overflow/underflow
- Robust Merkle proof validation for Bitcoin claims
- Proper ECDSA signature verification implementation
- Effective reentrancy protection patterns
- Thorough input validation throughout contract
- Atomic operations maintain state consistency
- Professional code structure and documentation

COMPILER OPTIMIZATION REQUIREMENTS:
- Must compile with optimizations enabled for mainnet deployment
- Unoptimized version exceeds gas limits for maximum stake operations
- Optimization reduces gas costs by ~50% for complex operations
- Accepts minor optimizer bug risk for necessary functionality

AUDIT CONCLUSION:
The security audit found three minor problems, two with potential future impact but not current issues, and one requiring specialized cryptographic knowledge to exploit. The exploitation difficulty is extremely high with current hardware and requires user actions not available in the standard interface. The Solidity contracts were assessed as well-written and properly documented.

POST-AUDIT SECURITY STATUS:
✅ All identified issues have been resolved or acknowledged
✅ No critical or medium severity vulnerabilities found
✅ Professional validation of contract security and code quality
✅ Ongoing monitoring for blockchain environment changes
✅ Battle-tested through years of mainnet operation

AUDIT LIMITATIONS:
- Audit does not guarantee absolute security or faultlessness
- Not investment advice or platform approval
- Limited to smart contract code review only
- Does not cover off-chain components or user interfaces

HEX FINANCIAL AUDIT - MATHEMATICAL PROOF OF "LONGER PAYS BETTER":

FINANCIAL AUDIT OVERVIEW:
Professional mathematical analysis conducted by CoinFabrik (October 2019)
- Official Report: [HEX Financial Audit](https://www.coinfabrik.com/blog/hex-financial-audit/)
- Full Document: [HEX Financial Audit v2.05](https://coinfabrik.b-cdn.net/wp-content/uploads/2019/12/HEX-Financial-Audit_v2.05.pdf)
- Scope: Mathematical verification of HEX staking reward mechanisms
- Audited Commit: 640906556dd14b2b57902185557b36f8d4251806
- Primary Question: Do longer stakes pay better than shorter re-compounding stakes?
- Conclusion: ✅ **MATHEMATICALLY PROVEN - Longer stakes always pay better**

AUDIT METHODOLOGY:
The analysis compared two fundamental staking strategies:
- **Strategy 1 (Long Stake)**: Stake h hearts for d days, receive R₁ hearts return
- **Strategy 2 (Short Recompounding)**: Stake h hearts for d₁ days, then re-stake proceeds for d₂ days, receive R₂ hearts return
- **Mathematical Constraint**: d₁ + d₂ ≤ d - 1 (accounts for one-day gap between stakes)

MATHEMATICAL FORMULATION:
The audit formalized the payout function F(h; d) representing rewards for staking h hearts for d days:

F(h; d) = Σ(i=i₀+1 to d) [dailyData[i].dayPayoutTotal × stakeShares(h,d,i)] / [dailyData[i].dayStakeSharesTotal]

Where:
- dailyData[i].dayPayoutTotal = (TOTAL_SUPPLY + g.lockedHeartsTotal) × INFLATION
- dailyData[i].dayStakeSharesTotal = total shares for all active stakes on day i
- stakeShares(h,d,i) = individual stake's share calculation including LPB/BPB bonuses

STAKE SHARES CALCULATION:
newStakeShares = [h + h × ((d-1)×BPB + h×LPB)/(LPB×BPB)] × (SHARE_RATE_SCALE/shareRate[i])

Where:
- **LPB (Longer Pays Better)**: 1820 constant for time-based bonuses
- **BPB (Bigger Pays Better)**: 15e16 constant for size-based bonuses  
- **SHARE_RATE_SCALE**: 100,000 constant for precision
- **shareRate[i]**: Dynamic rate that increases over time

SIMPLIFIED MODEL CONDITIONS:
For mathematical proof, the audit used controlled conditions (C):
1. No other stakes start or end during analysis period
2. Ignore adoption bonuses for simplification
3. Remove penalty redistributions from other users
4. Stakes under 3,641 days and 15e15 hearts (within protocol caps)

MATHEMATICAL PROOF RESULTS:
Under normal protocol conditions with multiple stakers:
- **F(h; d) > F(h; d₁, d₂)** for all valid parameter combinations
- Longer stakes **ALWAYS** outperform shorter re-compounding stakes
- The difference increases with stake size and duration
- Maximum Strategy 2 efficiency occurs when δ (split ratio) approaches 0 or 1

GRAPHICAL ANALYSIS FINDINGS:
The audit included extensive graphical analysis showing:
- Strategy 1 (long) consistently outperforms Strategy 2 (short recompounding)
- Strategy 2 performs worst when δ = 0.5 (equal split)
- Strategy 2 approaches Strategy 1 performance as δ approaches 0 or 1
- Larger stakes and longer durations amplify the advantage of Strategy 1

EDGE CASE ANALYSIS:
**Anomalous Conditions Identified:**
The audit found ONE theoretical edge case where short stakes could outperform:
- **Condition**: Single staker operating alone in the entire protocol
- **Requirement**: Extremely low shareRate values (sh[0] = 1e5)
- **Practical Likelihood**: Virtually impossible in real-world scenarios
- **Impact**: Negligible due to unrealistic conditions

**Why This Edge Case is Irrelevant:**
- Requires shareRate to remain at initialization value (1e5) for 700+ days
- Would need zero other stakers in the entire protocol
- Any other user ending a stake would update shareRate to 1e16+
- Represents unrealistic protocol conditions that will never occur

SHARE RATE EVOLUTION ANALYSIS:
The audit demonstrated how shareRate evolution favors longer stakes:
- **Initial shareRate**: 1e5 (at protocol launch)
- **Normal shareRate**: 1e12 to 1e17 (after stakes mature)
- **Rate Update Trigger**: Every time a profitable stake ends
- **Long Stake Advantage**: Benefits from higher shareRate throughout duration

MATHEMATICAL PROOF EXTENSION:
The audit proved that the two-stake comparison extends to any number of stakes:
- If F(h; d) > F(h; d₁, d₂) then longer beats any n-stake recompounding strategy
- Mathematical induction shows this holds for unlimited stake subdivisions
- The more you subdivide a stake, the worse the total returns become

KEY MATHEMATICAL INSIGHTS:
1. **Compound Effect**: Longer stakes benefit from sustained share accumulation
2. **Share Rate Growth**: Share rate increases favor stakes that hold longer
3. **Proportional Distribution**: Daily rewards distributed proportionally to shares
4. **Time Advantage**: Longer stakes capture more days of rewards per transaction
5. **Efficiency Loss**: Each stake restart loses one day and incurs new calculations

PRACTICAL IMPLICATIONS:
- **Staking Strategy**: Always choose longer stakes over shorter ones
- **Ladder Staking**: If diversifying, still prefer longer individual stakes
- **Compound Returns**: Built-in compounding through share rate increases
- **Transaction Costs**: Fewer transactions needed for longer stakes
- **Optimal Behavior**: Protocol mathematically incentivizes longer commitments

AUDIT CONCLUSION SUMMARY:
The mathematical analysis verified that longer stakes pay better than short re-compounding stakes under all practical protocol parameters. When different users are staking simultaneously, longer stakes always return more HEX than composing shorter stakes.

**Final Verification Status:**
✅ **MATHEMATICALLY PROVEN**: Longer stakes always outperform shorter re-compounding stakes
✅ **EDGE CASE ADDRESSED**: Theoretical anomaly requires impossible real-world conditions  
✅ **PROTOCOL VALIDATION**: Mathematical design correctly incentivizes longer commitments
✅ **STRATEGIC CONFIRMATION**: "Longer Pays Better" principle is mathematically sound

This financial audit provides mathematical certainty that HEX's fundamental principle of "Longer Pays Better" is not just a design claim, but a mathematically proven reality of the protocol's reward distribution mechanism.
`

const SYSTEM_PROMPT = `You are a HEX cryptocurrency expert AI assistant. Provide CONCISE, well-organized responses about HEX, staking, and PulseChain.

Your knowledge includes:
${HEX_KNOWLEDGE_BASE}

RESPONSE GUIDELINES:
1. Keep answers SHORT and TO THE POINT (max 200-300 words for most questions)
2. Use CLEAR STRUCTURE with headings and bullet points
3. Lead with the MOST IMPORTANT information first
4. Use simple, direct language - avoid unnecessary complexity
5. Include key risks/warnings in a brief section
6. ALWAYS include clickable links to relevant sources
7. Only provide examples when specifically requested

FORMATTING RULES:
• Use **bold** for key terms and concepts
• Organize with clear sections using ##headings
• Use bullet points for lists
• Keep paragraphs short (2-3 sentences max)
• Include clickable links: [Link Text](URL) format
• End with brief risk warning when relevant

CONTENT PRIORITIES:
1. Answer the specific question directly
2. Provide essential context only
3. Include practical takeaways
4. Mention PulseChain benefits when relevant
5. Include clickable links to official sources for verification
6. Add brief risk note if applicable

CITATION FORMAT:
Always include clickable links to sources:
- [HEX Whitepaper - Staking](https://hex.com/_assets/docs/HEX_whitepaper.pdf#page=X)
- [HEX.com - Staking Interface](https://hex.com)
- [PulseChain - Network Info](https://pulsechain.com)
- [PulseX - DEX Trading](https://pulsex.com)
- [HEX Smart Contract Audit](https://www.coinfabrik.com/blog/hex-smart-contract-audit/)
- [HEX Financial Audit](https://www.coinfabrik.com/blog/hex-financial-audit/)

LINK EXAMPLES:
- **Staking mechanics**: [HEX Whitepaper - Staking Section](https://hex.com/_assets/docs/HEX_whitepaper.pdf)
- **Transform lobbies**: [HEX Whitepaper - Transform](https://hex.com/_assets/docs/HEX_whitepaper.pdf)
- **PulseChain benefits**: [PulseChain Official](https://pulsechain.com)
- **Live staking**: [HEX.com Interface](https://hex.com)
- **Security validation**: [HEX Smart Contract Audit](https://www.coinfabrik.com/blog/hex-smart-contract-audit/)
- **Mathematical proof**: [HEX Financial Audit](https://www.coinfabrik.com/blog/hex-financial-audit/)

AVOID:
- Long explanations unless specifically requested
- Repeating information
- Marketing language or hype
- Financial advice (education only)
- Unnecessary technical jargon
- Direct quotes from audit documents or sources

Always prioritize CLARITY and BREVITY while maintaining accuracy. Paraphrase information rather than using direct quotations.`

// Function to add inline citations to grounded responses
function addCitations(text: string, groundingMetadata: any): string {
  const supports = groundingMetadata?.groundingSupports || []
  const chunks = groundingMetadata?.groundingChunks || []

  // Sort supports by end_index in descending order to avoid shifting issues when inserting
  const sortedSupports = [...supports].sort(
    (a: any, b: any) => (b.segment?.endIndex ?? 0) - (a.segment?.endIndex ?? 0)
  )

  let finalText = text

  for (const support of sortedSupports) {
    const endIndex = support.segment?.endIndex
    if (endIndex === undefined || !support.groundingChunkIndices?.length) {
      continue
    }

    const citationLinks = support.groundingChunkIndices
      .map((i: number) => {
        const uri = chunks[i]?.web?.uri
        if (uri) {
          const title = chunks[i]?.web?.title || `Source ${i + 1}`
          return `[${title}](${uri})`
        }
        return null
      })
      .filter(Boolean)

    if (citationLinks.length > 0) {
      const citationString = ` (${citationLinks.join(', ')})`
      finalText = finalText.slice(0, endIndex) + citationString + finalText.slice(endIndex)
    }
  }

  return finalText
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      )
    }

    // Get the generative model - basic Gemini 1.5 Flash without grounding
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash'
    })

    // Check if this is an objection handling request
    const isObjectionHandling = message.toLowerCase().includes('objection') || 
                               message.toLowerCase().includes('prospect says') ||
                               message.toLowerCase().includes('handling this')

    // Create specialized prompt for objection handling
    const objectionPrompt = `You are a HEX cryptocurrency expert specializing in professional objection handling and educational responses.

Your knowledge includes:
${HEX_KNOWLEDGE_BASE}

OBJECTION HANDLING GUIDELINES:
1. Provide a STRUCTURED response with clear talking points
2. Use FACTUAL information from HEX whitepaper and PulseChain documentation
3. Stay PROFESSIONAL and educational - never defensive
4. Separate the person from the technology
5. Use SPECIFIC examples and data points
6. Include clickable links to verification sources
7. End with educational next steps

RESPONSE FORMAT:
## Recommended Response Strategy

**Key Points to Address:**
• Point 1 with [source link]
• Point 2 with [source link]  
• Point 3 with [source link]

**Suggested Response:**
"[Exact words to say]"

**Educational Follow-up:**
[Next steps for the prospect]

User's Objection Scenario: ${message}

Provide a professional objection handling strategy with specific talking points.`

    // Create the full prompt
    const fullPrompt = isObjectionHandling ? objectionPrompt : `${SYSTEM_PROMPT}

User Question: ${message}

Please provide a comprehensive, accurate response based on your HEX knowledge base. If the question is outside your knowledge area, acknowledge this and suggest related HEX topics you can help with.`

    // Generate response with grounding
    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    const text = response.text()

    // Return basic response without grounding
    return NextResponse.json({ 
      response: text,
      grounded: false,
      searchQueries: []
    })

  } catch (error) {
    console.error('Gemini API Error:', error)
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error')
    
    // Provide a fallback response with some basic HEX information
    const fallbackResponse = `I apologize, but I'm experiencing technical difficulties connecting to the AI service. 

However, I can share some key HEX information:

**What is HEX?**
HEX is a cryptocurrency designed to function as a decentralized time deposit (like a CD). Users stake their HEX tokens for 1-5555 days to earn rewards.

**Key Features:**
• **Staking Rewards**: Earn interest by locking up tokens
• **LongerPaysBetter**: Longer stakes get better rewards  
• **BiggerPaysBetter**: Larger stakes get slightly better rates
• **PulseChain**: Lower fees and faster transactions than Ethereum

**Getting Started:**
1. Acquire HEX on PulseX or other exchanges
2. Visit HEX.com to access the staking interface
3. Choose stake amount and duration
4. Confirm transaction and earn rewards

For detailed information, please visit the official HEX whitepaper at: https://hex.com/_assets/docs/HEX_whitepaper.pdf

Please try your question again in a moment.`

    return NextResponse.json({ 
      response: fallbackResponse,
      fallback: true 
    })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'HEX AI Assistant API',
    version: '1.0.0',
    model: 'gemini-1.5-flash',
    status: 'active'
  })
} 