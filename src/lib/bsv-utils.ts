/**
 * BSV Blockchain Utilities
 * 
 * This module provides utility functions for interacting with the BSV blockchain,
 * including transaction data fetching, fee calculations, and SPV demonstrations.
 * 
 * Features:
 * - Real-time transaction data from WhatsOnChain API
 * - Fee comparison calculations (BSV vs BTC vs ETH)
 * - Transaction throughput metrics
 * - SPV verification examples
 * - Micropayment calculations
 */

import { Transaction, PrivateKey, P2PKH, Script, OP } from '@bsv/sdk';

// Types for BSV transaction data
export interface BSVTransaction {
  txid: string;
  size: number;
  fee: number;
  time: number;
  inputs: Array<{
    txid: string;
    vout: number;
    sequence: number;
    n: number;
    addr: string;
    valueSat: number;
    value: number;
  }>;
  outputs: Array<{
    value: number;
    n: number;
    scriptPubKey: {
      hex: string;
      asm: string;
      addresses?: string[];
      type: string;
    };
  }>;
}

export interface BlockInfo {
  hash: string;
  height: number;
  time: number;
  tx_count: number;
  size: number;
  difficulty: number;
}

export interface NetworkStats {
  chain: string;
  blocks: number;
  headers: number;
  bestblockhash: string;
  difficulty: number;
  mediantime: number;
  verificationprogress: number;
  chainwork: string;
  size_on_disk: number;
  pruned: boolean;
}

// Fee comparison data structure
export interface FeeComparison {
  bsv: {
    satoshisPerByte: number;
    usdPerTransaction: number;
    avgConfirmationTime: number; // minutes
  };
  btc: {
    satoshisPerByte: number;
    usdPerTransaction: number;
    avgConfirmationTime: number; // minutes
  };
  eth: {
    gweiPerGas: number;
    usdPerTransaction: number;
    avgConfirmationTime: number; // minutes
  };
}

// Micropayment example structure
export interface MicropaymentExample {
  description: string;
  amount: number; // in satoshis
  usdValue: number;
  fee: number; // in satoshis
  feePercentage: number;
  profitable: boolean;
}

/**
 * Fetches recent BSV transactions from WhatsOnChain API
 */
export async function fetchRecentBSVTransactions(limit: number = 10): Promise<BSVTransaction[]> {
  try {
    const response = await fetch(`https://api.whatsonchain.com/v1/bsv/main/txs?limit=${limit}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const txids: string[] = await response.json();
    
    // Fetch detailed information for each transaction
    const transactions = await Promise.all(
      txids.slice(0, limit).map(async (txid) => {
        try {
          const txResponse = await fetch(`https://api.whatsonchain.com/v1/bsv/main/tx/${txid}`);
          if (txResponse.ok) {
            return await txResponse.json() as BSVTransaction;
          }
          return null;
        } catch (error) {
          console.warn(`Failed to fetch transaction ${txid}:`, error);
          return null;
        }
      })
    );
    
    return transactions.filter((tx): tx is BSVTransaction => tx !== null);
  } catch (error) {
    console.error('Error fetching BSV transactions:', error);
    // Return mock data for presentation reliability
    return generateMockTransactions(limit);
  }
}

/**
 * Fetches current BSV network statistics
 */
export async function fetchBSVNetworkStats(): Promise<NetworkStats | null> {
  try {
    const response = await fetch('https://api.whatsonchain.com/v1/bsv/main/chain/info');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json() as NetworkStats;
  } catch (error) {
    console.error('Error fetching BSV network stats:', error);
    // Return mock data for presentation reliability
    return {
      chain: 'main',
      blocks: 873250,
      headers: 873250,
      bestblockhash: '0000000000000000001c8d5e7e4a7b1d9f5a7e4a7b1d9f5a7e4a7b1d9f5a7e4a',
      difficulty: 112628548513.7,
      mediantime: Date.now() / 1000 - 600,
      verificationprogress: 0.99999,
      chainwork: '00000000000000000000000000000000000000000123456789abcdef123456',
      size_on_disk: 456789123456,
      pruned: false
    };
  }
}

/**
 * Fetches current block information
 */
export async function fetchCurrentBlock(): Promise<BlockInfo | null> {
  try {
    const response = await fetch('https://api.whatsonchain.com/v1/bsv/main/block/tip');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json() as BlockInfo;
  } catch (error) {
    console.error('Error fetching current block:', error);
    // Return mock data for presentation reliability
    return {
      hash: '0000000000000000001c8d5e7e4a7b1d9f5a7e4a7b1d9f5a7e4a7b1d9f5a7e4a',
      height: 873250,
      time: Date.now() / 1000,
      tx_count: 2156,
      size: 4567890,
      difficulty: 112628548513.7
    };
  }
}

/**
 * Calculates and compares transaction fees across different blockchains
 */
export function calculateFeeComparison(): FeeComparison {
  // Current approximate values as of 2024
  return {
    bsv: {
      satoshisPerByte: 0.05, // Ultra-low fees
      usdPerTransaction: 0.0001, // ~$0.0001 for typical transaction
      avgConfirmationTime: 0.5 // ~30 seconds for first confirmation
    },
    btc: {
      satoshisPerByte: 50, // High fees during congestion
      usdPerTransaction: 15.00, // ~$15 average
      avgConfirmationTime: 60 // ~1 hour for reasonable confirmation
    },
    eth: {
      gweiPerGas: 30, // Varies significantly
      usdPerTransaction: 8.50, // ~$8.50 average
      avgConfirmationTime: 5 // ~5 minutes
    }
  };
}

/**
 * Generates micropayment examples to demonstrate BSV's viability for small transactions
 */
export function generateMicropaymentExamples(): MicropaymentExample[] {
  const bsvPrice = 50; // $50 per BSV (approximate)
  const satoshisPerBSV = 100000000;
  const feePerByte = 0.05; // satoshis
  const avgTxSize = 250; // bytes
  const txFee = feePerByte * avgTxSize; // ~12.5 satoshis

  const examples = [
    {
      description: 'Read a news article',
      amount: 100, // satoshis
      txFee
    },
    {
      description: 'Stream 1 minute of video',
      amount: 500, // satoshis
      txFee
    },
    {
      description: 'AI API call',
      amount: 1000, // satoshis
      txFee
    },
    {
      description: 'Small data storage',
      amount: 2500, // satoshis
      txFee
    },
    {
      description: 'IoT device communication',
      amount: 50, // satoshis
      txFee
    }
  ];

  return examples.map(example => {
    const usdValue = (example.amount / satoshisPerBSV) * bsvPrice;
    const feePercentage = (example.txFee / example.amount) * 100;
    
    return {
      description: example.description,
      amount: example.amount,
      usdValue,
      fee: example.txFee,
      feePercentage,
      profitable: feePercentage < 50 // Profitable if fee is less than 50% of transaction
    };
  });
}

/**
 * Calculates transaction throughput metrics for BSV
 */
export function calculateThroughputMetrics() {
  return {
    bsv: {
      theoreticalTPS: 100000, // Theoretical unlimited
      currentTPS: 300, // Current average
      blockSize: 4000000000, // 4GB theoretical limit
      avgBlockTime: 600, // 10 minutes in seconds
      scalability: 'Unlimited (IPv6 + Teranode)'
    },
    btc: {
      theoreticalTPS: 7,
      currentTPS: 4.6,
      blockSize: 1000000, // 1MB
      avgBlockTime: 600,
      scalability: 'Limited (1MB blocks)'
    },
    eth: {
      theoreticalTPS: 15,
      currentTPS: 12,
      blockSize: 30000000, // ~30MB gas limit equivalent
      avgBlockTime: 12,
      scalability: 'Limited (Layer 2 required)'
    }
  };
}

/**
 * Creates a simple BSV transaction for demonstration (testnet safe)
 */
export function createDemoTransaction(): string {
  try {
    // Create a demo transaction structure (for display purposes only)
    const tx = new Transaction();
    
    // This is just for demonstration - not a real transaction
    const demoTxHex = '0100000001abc123def456789012345678901234567890123456789012345678901234567890000000006a47304402203456789012345678901234567890123456789012345678901234567890123456780220123456789012345678901234567890123456789012345678901234567890123456782012102abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdefffffffff0240420f00000000001976a914123456789012345678901234567890123456789088ac10270000000000001976a914987654321098765432109876543210987654321088ac00000000';
    
    return demoTxHex;
  } catch (error) {
    console.error('Error creating demo transaction:', error);
    return '';
  }
}

/**
 * Simulates SPV verification process
 */
export function simulateSPVVerification() {
  return {
    transactionId: '1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
    blockHeight: 873250,
    merkleRoot: '9876543210987654321098765432109876543210987654321098765432109876',
    merkleProof: [
      '1111111111111111111111111111111111111111111111111111111111111111',
      '2222222222222222222222222222222222222222222222222222222222222222',
      '3333333333333333333333333333333333333333333333333333333333333333'
    ],
    verified: true,
    proofSize: 96, // bytes
    verificationTime: 0.001 // seconds
  };
}

/**
 * Generate mock transaction data for presentation reliability
 */
function generateMockTransactions(count: number): BSVTransaction[] {
  const mockTransactions: BSVTransaction[] = [];
  const now = Date.now() / 1000;
  
  for (let i = 0; i < count; i++) {
    mockTransactions.push({
      txid: `${Math.random().toString(16).substr(2, 8)}${'0'.repeat(56)}`,
      size: Math.floor(Math.random() * 1000) + 250,
      fee: Math.floor(Math.random() * 50) + 10,
      time: now - (i * 60),
      inputs: [{
        txid: `${Math.random().toString(16).substr(2, 8)}${'0'.repeat(56)}`,
        vout: 0,
        sequence: 4294967295,
        n: 0,
        addr: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
        valueSat: Math.floor(Math.random() * 100000) + 10000,
        value: (Math.floor(Math.random() * 100000) + 10000) / 100000000
      }],
      outputs: [{
        value: (Math.floor(Math.random() * 50000) + 5000) / 100000000,
        n: 0,
        scriptPubKey: {
          hex: '76a914' + Math.random().toString(16).substr(2, 20) + '88ac',
          asm: 'OP_DUP OP_HASH160 ... OP_EQUALVERIFY OP_CHECKSIG',
          addresses: ['1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'],
          type: 'pubkeyhash'
        }
      }]
    });
  }
  
  return mockTransactions;
}

/**
 * Format satoshis to BSV with appropriate precision
 */
export function formatSatoshisToBSV(satoshis: number): string {
  const bsv = satoshis / 100000000;
  return bsv.toFixed(8).replace(/\.?0+$/, '') + ' BSV';
}

/**
 * Format USD value with appropriate precision
 */
export function formatUSD(value: number): string {
  if (value < 0.01) {
    return `$${value.toFixed(6)}`;
  }
  return `$${value.toFixed(2)}`;
}

/**
 * Calculate transaction efficiency score
 */
export function calculateEfficiencyScore(fee: number, amount: number): number {
  const feePercentage = (fee / amount) * 100;
  if (feePercentage < 0.1) return 100;
  if (feePercentage < 1) return 90;
  if (feePercentage < 5) return 70;
  if (feePercentage < 10) return 50;
  return 20;
}