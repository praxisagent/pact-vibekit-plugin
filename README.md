# PACT MCP Server

MCP server for [PACT Protocol](https://dopeasset.com) — trustless escrow and payment channels for AI agents on Arbitrum One.

Built for the [Arbitrum Vibekit](https://github.com/EmberAGI/arbitrum-vibekit) ecosystem. Enables any MCP-compatible agent to create escrow agreements, open payment channels, and settle transactions with other agents — all on-chain, no trust required.

## What It Does

**Escrow** — Lock PACT tokens in a smart contract. Recipient completes work, verifier confirms, tokens release. If work isn't done by deadline, creator reclaims. No intermediary.

**Payment Channels** — Open a channel once, exchange unlimited micropayments off-chain via signed state updates, settle on-chain when done. Two transactions total regardless of payment count.

## Tools

### Read (no wallet needed)

| Tool | Description |
|------|-------------|
| `pact_get_balance` | PACT token balance + allowances for any address |
| `pact_get_escrow` | Get escrow pact details by ID |
| `pact_get_escrow_count` | Total pacts created |
| `pact_get_channel` | Get payment channel details by ID |
| `pact_get_channel_count` | Total channels created |
| `pact_protocol_info` | Contract addresses, chain info, quick-start guide |

### Write (returns unsigned transactions for the agent to sign)

| Tool | Description |
|------|-------------|
| `pact_build_approve` | Approve PACT tokens for escrow or channel contract |
| `pact_build_create_escrow` | Create new escrow with recipient, verifier, amount, deadline |
| `pact_build_complete_escrow` | Mark work as complete (recipient) |
| `pact_build_verify_escrow` | Confirm completion and release tokens (verifier) |
| `pact_build_reclaim_escrow` | Reclaim tokens after deadline (creator) |
| `pact_build_open_channel` | Open payment channel with counterparty |
| `pact_build_fund_channel` | Fund your side of an existing channel |
| `pact_build_coop_close` | Cooperatively close channel (instant) |
| `pact_build_initiate_close` | Unilateral close (1hr challenge period) |
| `pact_build_challenge` | Challenge a close with newer state |
| `pact_build_settle_channel` | Settle after challenge period |

### Helpers

| Tool | Description |
|------|-------------|
| `pact_compute_payment_digest` | Compute EIP-712 digest for off-chain payment signing |

## Quickstart

```bash
# Clone
git clone https://github.com/praxisagent/pact-vibekit-plugin.git
cd pact-vibekit-plugin

# Install
npm install

# Build
npm run build

# Run (HTTP/SSE mode on port 3020)
npm start

# Or dev mode with hot reload
npm run dev
```

### Environment Variables

```bash
# Optional — defaults to Arbitrum One public RPC
RPC_URL=https://arb1.arbitrum.io/rpc

# Optional — defaults to 3020
PORT=3020
```

### Connect to Your Agent

**SSE endpoint:** `http://localhost:3020/sse`

**Agent card:** `http://localhost:3020/.well-known/agent.json`

Add to your MCP client config (e.g., Vibekit `mcp.json`):
```json
{
  "mcpServers": {
    "pact": {
      "url": "http://localhost:3020/sse"
    }
  }
}
```

Or use STDIO transport:
```json
{
  "mcpServers": {
    "pact": {
      "command": "node",
      "args": ["./dist/index.js", "--stdio"]
    }
  }
}
```

## Contracts (Arbitrum One)

| Contract | Address |
|----------|---------|
| PACT Token | `0x809c2540358E2cF37050cCE41A610cb6CE66Abe1` |
| PactEscrow v2 | `0x220B97972d6028Acd70221890771E275e7734BFB` |
| PactPaymentChannel | `0x5a9D124c05B425CD90613326577E03B3eBd1F891` |

## Architecture

```
pact-mcp-server/
├── src/
│   ├── index.ts       # Server entry — HTTP/SSE + STDIO transports
│   ├── mcp.ts         # MCP tool definitions (17 tools)
│   └── contracts.ts   # Contract addresses, ABIs, status labels
├── package.json
├── tsconfig.json
└── .env.example
```

The server is **read-heavy by default**: all write operations return unsigned transaction calldata. The calling agent is responsible for signing and broadcasting. This keeps the server stateless and keyless — no private keys ever touch the MCP server.

## Security

- **No private keys.** Write tools return unsigned transactions. The agent's wallet handles signing.
- **No max approvals.** The `pact_build_approve` tool takes exact amounts. Unlimited approvals are a drain vector.
- **Read-only RPC.** The server only reads chain state. No transactions are sent.
- **Validated inputs.** All parameters are Zod-validated before use.

## License

MIT

## Links

- [PACT Protocol](https://dopeasset.com)
- [Grants Program](https://dopeasset.com/grants)
- [Vibekit Issue #569](https://github.com/EmberAGI/arbitrum-vibekit/issues/569)
- [Arbitrum Vibekit](https://github.com/EmberAGI/arbitrum-vibekit)
