// PACT Protocol contract addresses on Arbitrum One (chainId 42161)
export const CONTRACTS = {
  PACT_TOKEN:    '0x809c2540358E2cF37050cCE41A610cb6CE66Abe1',
  PACT_ESCROW:   '0x220B97972d6028Acd70221890771E275e7734BFB',
  PACT_CHANNEL:  '0x5a9D124c05B425CD90613326577E03B3eBd1F891',
} as const;

// Minimal ABI fragments for PactEscrow v2
export const ESCROW_ABI = [
  'function nextPactId() view returns (uint256)',
  'function pacts(uint256) view returns (address creator, address recipient, address verifier, uint256 amount, uint256 deadline, uint8 status)',
  'function create(address recipient, address verifier, uint256 amount, uint256 deadline) returns (uint256)',
  'function complete(uint256 pactId)',
  'function verify(uint256 pactId)',
  'function reclaim(uint256 pactId)',
] as const;

// Minimal ABI fragments for PactPaymentChannel
export const CHANNEL_ABI = [
  'function nextChannelId() view returns (uint256)',
  'function CHALLENGE_PERIOD() view returns (uint256)',
  'function DOMAIN_SEPARATOR() view returns (bytes32)',
  'function UPDATE_TYPEHASH() view returns (bytes32)',
  'function channels(uint256) view returns (address agentA, address agentB, uint256 depositA, uint256 depositB, uint256 totalDeposit, uint256 nonce, uint256 balanceA, uint256 balanceB, uint256 closeTime, uint8 state)',
  'function isSettleable(uint256 channelId) view returns (bool)',
  'function open(address agentB, uint256 depositA) returns (uint256)',
  'function fund(uint256 channelId, uint256 depositB)',
  'function coopClose(uint256 channelId, uint256 balanceA, uint256 balanceB, uint256 nonce, bytes sigA, bytes sigB)',
  'function initiateClose(uint256 channelId, uint256 balanceA, uint256 balanceB, uint256 nonce, bytes sigA, bytes sigB)',
  'function challenge(uint256 channelId, uint256 balanceA, uint256 balanceB, uint256 nonce, bytes sigA, bytes sigB)',
  'function settle(uint256 channelId)',
] as const;

// Minimal ABI fragments for ERC-20 (PACT token)
export const ERC20_ABI = [
  'function balanceOf(address account) view returns (uint256)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function decimals() view returns (uint8)',
] as const;

// Status labels for Pact
export const PACT_STATUS: Record<number, string> = {
  0: 'Active',
  1: 'PendingVerification',
  2: 'Completed',
  3: 'Reclaimed',
};

// State labels for Channel
export const CHANNEL_STATE: Record<number, string> = {
  0: 'Open',
  1: 'Closing',
  2: 'Closed',
};
