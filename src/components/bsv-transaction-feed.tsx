'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';
import { Alert, AlertDescription } from './ui/alert';
import { Activity, Clock, DollarSign, Hash } from 'lucide-react';
import { fetchRecentBSVTransactions, formatSatoshisToBSV, formatUSD, type BSVTransaction } from '@/lib/bsv-utils';

interface BSVTransactionFeedProps {
  limit?: number;
  refreshInterval?: number; // in milliseconds
  className?: string;
}

export function BSVTransactionFeed({ 
  limit = 10, 
  refreshInterval = 30000, // 30 seconds
  className 
}: BSVTransactionFeedProps) {
  const [transactions, setTransactions] = useState<BSVTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchTransactions = async () => {
    try {
      setError(null);
      const txs = await fetchRecentBSVTransactions(limit);
      setTransactions(txs);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();

    const interval = setInterval(fetchTransactions, refreshInterval);
    return () => clearInterval(interval);
  }, [limit, refreshInterval]);

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now() / 1000;
    const diff = now - timestamp;
    
    if (diff < 60) return `${Math.floor(diff)}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const calculateFeeRate = (tx: BSVTransaction) => {
    return (tx.fee / tx.size).toFixed(4);
  };

  const getTotalValue = (tx: BSVTransaction) => {
    return tx.outputs.reduce((sum, output) => sum + output.value, 0);
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Live BSV Transaction Feed
          </CardTitle>
          <CardDescription>
            Real-time BSV transactions demonstrating low fees and fast processing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-green-500" />
          Live BSV Transaction Feed
          <Badge variant="outline" className="ml-auto">
            {transactions.length} transactions
          </Badge>
        </CardTitle>
        <CardDescription>
          Real-time BSV transactions demonstrating ultra-low fees and instant processing
          {lastUpdate && (
            <span className="block text-xs text-muted-foreground mt-1">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert className="mb-4">
            <AlertDescription>
              {error} - Showing cached data for demonstration
            </AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {transactions.map((tx, index) => (
            <div 
              key={tx.txid}
              className="p-3 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    <code className="text-xs font-mono bg-muted px-2 py-1 rounded truncate">
                      {tx.txid.slice(0, 16)}...{tx.txid.slice(-8)}
                    </code>
                    <Badge variant="secondary" className="text-xs">
                      {tx.size} bytes
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-green-600" />
                        <span className="text-muted-foreground">Value:</span>
                        <span className="font-medium">
                          {formatSatoshisToBSV(getTotalValue(tx) * 100000000)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">Fee:</span>
                        <span className="font-medium text-green-600">
                          {tx.fee} sat ({formatUSD(tx.fee * 0.0000005)})
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-blue-600" />
                        <span className="text-muted-foreground">Time:</span>
                        <span className="font-medium">
                          {formatTimeAgo(tx.time)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">Fee Rate:</span>
                        <span className="font-medium text-blue-600">
                          {calculateFeeRate(tx)} sat/byte
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {tx.inputs.length} input{tx.inputs.length !== 1 ? 's' : ''}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {tx.outputs.length} output{tx.outputs.length !== 1 ? 's' : ''}
                    </Badge>
                    <Badge 
                      variant={tx.fee < 100 ? "default" : "secondary"} 
                      className="text-xs ml-auto"
                    >
                      {tx.fee < 100 ? "Ultra Low Fee" : "Low Fee"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {transactions.length === 0 && !loading && (
          <div className="text-center py-8 text-muted-foreground">
            No transactions to display
          </div>
        )}
      </CardContent>
    </Card>
  );
}