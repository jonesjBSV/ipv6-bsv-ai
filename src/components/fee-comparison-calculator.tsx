'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Calculator, DollarSign, Clock, Zap, AlertTriangle } from 'lucide-react';
import { calculateFeeComparison } from '@/lib/bsv-sdk-utils';

const formatUSD = (amount: number) => {
  return `$${amount.toFixed(6)}`;
};

interface FeeCalculation {
  blockchain: string;
  fee: number;
  time: number;
  efficiency: number;
  color: string;
  icon: React.ReactNode;
}

export function FeeComparisonCalculator() {
  const [transactionValue, setTransactionValue] = useState(10); // USD
  const [transactionSize, setTransactionSize] = useState(250); // bytes
  const feeData = calculateFeeComparison();

  const calculations = useMemo((): FeeCalculation[] => {
    const bsvFee = (feeData.bsv.satoshisPerByte * transactionSize) * 0.0000005; // Convert to USD
    const btcFee = (feeData.btc.satoshisPerByte * transactionSize) * 0.0005; // Convert to USD (higher rate)
    const ethFee = feeData.eth.usdPerTransaction; // Fixed USD amount

    return [
      {
        blockchain: 'BSV',
        fee: bsvFee,
        time: feeData.bsv.confirmationTime,
        efficiency: Math.max(95 - (bsvFee / transactionValue) * 100, 10),
        color: 'text-green-600',
        icon: <Zap className="h-4 w-4" />
      },
      {
        blockchain: 'BTC',
        fee: btcFee,
        time: feeData.btc.confirmationTime,
        efficiency: Math.max(20 - (btcFee / transactionValue) * 10, 5),
        color: 'text-orange-600',
        icon: <Clock className="h-4 w-4" />
      },
      {
        blockchain: 'ETH',
        fee: ethFee,
        time: feeData.eth.confirmationTime,
        efficiency: Math.max(40 - (ethFee / transactionValue) * 8, 10),
        color: 'text-blue-600',
        icon: <AlertTriangle className="h-4 w-4" />
      }
    ];
  }, [transactionValue, transactionSize, feeData]);

  const getBestOption = () => {
    return calculations.reduce((best, current) => 
      current.efficiency > best.efficiency ? current : best
    );
  };

  const getWorstOption = () => {
    return calculations.reduce((worst, current) => 
      current.efficiency < worst.efficiency ? current : worst
    );
  };

  const calculateSavings = () => {
    const best = getBestOption();
    const worst = getWorstOption();
    const savings = worst.fee - best.fee;
    const savingsPercentage = ((savings / worst.fee) * 100);
    return { savings, savingsPercentage };
  };

  const presetValues = [
    { label: 'Micropayment', value: 0.10, size: 200 },
    { label: 'Small Purchase', value: 5.00, size: 250 },
    { label: 'Medium Purchase', value: 50.00, size: 300 },
    { label: 'Large Purchase', value: 500.00, size: 400 },
    { label: 'Enterprise', value: 5000.00, size: 500 }
  ];

  const { savings, savingsPercentage } = calculateSavings();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Transaction Fee Comparison Calculator
        </CardTitle>
        <CardDescription>
          Compare real-world transaction costs across BSV, BTC, and ETH networks
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Controls */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Transaction Value (USD)
            </label>
            <input
              type="number"
              value={transactionValue}
              onChange={(e) => setTransactionValue(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-md"
              step="0.01"
              min="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Transaction Size (bytes)
            </label>
            <input
              type="number"
              value={transactionSize}
              onChange={(e) => setTransactionSize(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-md"
              step="1"
              min="150"
              max="1000"
            />
          </div>
        </div>

        {/* Preset Buttons */}
        <div>
          <label className="block text-sm font-medium mb-2">Quick Presets:</label>
          <div className="flex flex-wrap gap-2">
            {presetValues.map((preset) => (
              <Button
                key={preset.label}
                variant="outline"
                size="sm"
                onClick={() => {
                  setTransactionValue(preset.value);
                  setTransactionSize(preset.size);
                }}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Fee Comparison Results</h3>
            <Badge variant="outline" className="text-green-600">
              BSV saves {formatUSD(savings)} ({savingsPercentage.toFixed(1)}%)
            </Badge>
          </div>

          {calculations.map((calc) => (
            <div key={calc.blockchain} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {calc.icon}
                  <span className={`font-semibold ${calc.color}`}>
                    {calc.blockchain}
                  </span>
                  {calc.blockchain === getBestOption().blockchain && (
                    <Badge className="bg-green-100 text-green-800">Best</Badge>
                  )}
                  {calc.blockchain === getWorstOption().blockchain && (
                    <Badge variant="destructive">Most Expensive</Badge>
                  )}
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${calc.color}`}>
                    {formatUSD(calc.fee)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {calc.time < 1 ? `${(calc.time * 60).toFixed(0)}s` : `${calc.time}min`}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Cost as % of transaction:</span>
                  <span className={calc.color}>
                    {((calc.fee / transactionValue) * 100).toFixed(3)}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Efficiency Score:</span>
                  <span>{calc.efficiency.toFixed(0)}/100</span>
                </div>
                <Progress 
                  value={calc.efficiency} 
                  className="h-2"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Summary Insights */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            Key Insights
          </h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• BSV enables profitable micropayments with ultra-low fees</li>
            <li>• {savingsPercentage.toFixed(0)}% cost reduction compared to alternatives</li>
            <li>• Instant confirmation vs. hours of waiting on other networks</li>
            <li>• Linear scaling with IPv6 enables unlimited transaction volume</li>
            <li>• Perfect for AI applications requiring high-frequency microtransactions</li>
          </ul>
        </div>

        {/* Technical Details */}
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="font-semibold text-green-800">BSV Network</div>
            <div className="text-green-600">0.05 sat/byte</div>
            <div className="text-green-600">~30 second confirmation</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="font-semibold text-orange-800">BTC Network</div>
            <div className="text-orange-600">~50 sat/byte</div>
            <div className="text-orange-600">~60 minute confirmation</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="font-semibold text-blue-800">ETH Network</div>
            <div className="text-blue-600">~30 gwei gas</div>
            <div className="text-blue-600">~5 minute confirmation</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}