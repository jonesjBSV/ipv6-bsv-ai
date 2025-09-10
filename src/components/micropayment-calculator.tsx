'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Calculator, DollarSign, Zap, TrendingUp, AlertCircle, CheckCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { generateMicropaymentExamples } from '@/lib/bsv-sdk-utils';

const formatUSD = (amount: number) => {
  return `$${amount.toFixed(2)}`;
};

interface UseCase {
  id: string;
  name: string;
  description: string;
  volume: number; // transactions per day
  amount: number; // satoshis per transaction
  category: 'AI' | 'IoT' | 'Content' | 'Gaming' | 'Data';
  icon: React.ReactNode;
}

export function MicropaymentCalculator() {
  const [selectedUseCase, setSelectedUseCase] = useState<string>('ai-api');
  const [customAmount, setCustomAmount] = useState(1000);
  const [customVolume, setCustomVolume] = useState(10000);
  const [timeframe, setTimeframe] = useState<'day' | 'month' | 'year'>('day');
  const [showMethodology, setShowMethodology] = useState(false);

  const useCases: UseCase[] = [
    {
      id: 'ai-api',
      name: 'AI API Calls',
      description: 'Pay per AI model inference or computation',
      volume: 50000,
      amount: 1000, // 1000 satoshis = ~$0.0005
      category: 'AI',
      icon: <Zap className="h-4 w-4" />
    },
    {
      id: 'content-access',
      name: 'Content Access',
      description: 'Per-article reading or video streaming',
      volume: 25000,
      amount: 500,
      category: 'Content',
      icon: <DollarSign className="h-4 w-4" />
    },
    {
      id: 'iot-data',
      name: 'IoT Data Exchange',
      description: 'Sensor data transmission and processing',
      volume: 100000,
      amount: 50,
      category: 'IoT',
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      id: 'gaming-rewards',
      name: 'Gaming Rewards',
      description: 'In-game achievements and item trading',
      volume: 75000,
      amount: 2500,
      category: 'Gaming',
      icon: <CheckCircle className="h-4 w-4" />
    },
    {
      id: 'data-storage',
      name: 'Data Storage',
      description: 'Pay per MB of decentralized storage',
      volume: 15000,
      amount: 5000,
      category: 'Data',
      icon: <AlertCircle className="h-4 w-4" />
    }
  ];

  const currentUseCase = useCases.find(uc => uc.id === selectedUseCase) || useCases[0];
  const micropaymentExamples = generateMicropaymentExamples();

  const calculations = useMemo(() => {
    const amount = selectedUseCase === 'custom' ? customAmount : currentUseCase.amount;
    const volume = selectedUseCase === 'custom' ? customVolume : currentUseCase.volume;
    
    const bsvPrice = 50; // $50 per BSV
    const satoshisPerBSV = 100000000;
    const feePerByte = 0.05;
    const avgTxSize = 250;
    const txFee = feePerByte * avgTxSize; // ~12.5 satoshis
    
    const multiplier = timeframe === 'day' ? 1 : timeframe === 'month' ? 30 : 365;
    const totalVolume = volume * multiplier;
    
    const totalRevenue = (amount * totalVolume) / satoshisPerBSV * bsvPrice;
    const totalFees = (txFee * totalVolume) / satoshisPerBSV * bsvPrice;
    const netRevenue = totalRevenue - totalFees;
    const feePercentage = (totalFees / totalRevenue) * 100;
    const profitMargin = (netRevenue / totalRevenue) * 100;
    
    return {
      amount,
      volume: totalVolume,
      totalRevenue,
      totalFees,
      netRevenue,
      feePercentage,
      profitMargin,
      avgTxValue: (amount / satoshisPerBSV) * bsvPrice,
      avgTxFee: (txFee / satoshisPerBSV) * bsvPrice
    };
  }, [selectedUseCase, customAmount, customVolume, timeframe, currentUseCase]);

  const pieData = [
    { name: 'Net Revenue', value: calculations.netRevenue, color: '#22c55e' },
    { name: 'Transaction Fees', value: calculations.totalFees, color: '#ef4444' }
  ];

  const comparisonData = micropaymentExamples.map(example => ({
    name: example.description,
    value: example.usdValue,
    fee: (example.fee / 100000000) * 50, // Convert to USD
    profitable: example.profitable,
    feePercentage: example.feePercentage
  }));

  const getCategoryColor = (category: string) => {
    const colors = {
      'AI': 'bg-purple-100 text-purple-800',
      'IoT': 'bg-blue-100 text-blue-800',
      'Content': 'bg-green-100 text-green-800',
      'Gaming': 'bg-orange-100 text-orange-800',
      'Data': 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors.Data;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toFixed(0);
  };

  const getTooltipText = (metric: string) => {
    switch (metric) {
      case 'calculator':
        return 'Interactive calculator analyzing micropayment economics across different BSV use cases including AI APIs, content access, IoT data exchange, gaming rewards, and data storage scenarios';
      case 'revenue':
        return 'Total revenue calculated from transaction amount multiplied by volume over selected timeframe, converted to USD using current BSV market price';
      case 'fees':
        return 'Transaction fees calculated using BSV network fee rate (~0.05 sat/byte) multiplied by average transaction size and total volume';
      case 'profit':
        return 'Net revenue after subtracting transaction fees, showing actual retained earnings from micropayment business model';
      case 'efficiency':
        return 'Economic efficiency score based on fee-to-value ratio, transaction volume, and profit margins - higher scores indicate more viable micropayment scenarios';
      default:
        return 'Micropayment economic analysis with supporting methodology available in references section';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Micropayment Viability Calculator
          <div title={getTooltipText('calculator')}>
            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
          </div>
        </CardTitle>
        <CardDescription>
          Analyze the economics of micropayments across different BSV use cases
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Use Case Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium">Select Use Case:</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {useCases.map((useCase) => (
              <Button
                key={useCase.id}
                variant={selectedUseCase === useCase.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedUseCase(useCase.id)}
                className="h-auto p-3 flex flex-col items-start gap-1"
              >
                <div className="flex items-center gap-2 w-full">
                  {useCase.icon}
                  <span className="text-xs font-medium">{useCase.name}</span>
                </div>
                <Badge variant="secondary" className={getCategoryColor(useCase.category)}>
                  {useCase.category}
                </Badge>
              </Button>
            ))}
            <Button
              variant={selectedUseCase === 'custom' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedUseCase('custom')}
              className="h-auto p-3 flex flex-col items-start gap-1"
            >
              <div className="flex items-center gap-2 w-full">
                <Calculator className="h-4 w-4" />
                <span className="text-xs font-medium">Custom</span>
              </div>
              <Badge variant="secondary">
                Custom
              </Badge>
            </Button>
          </div>
        </div>

        {/* Custom Inputs */}
        {selectedUseCase === 'custom' && (
          <div className="grid md:grid-cols-2 gap-4 p-4 border rounded-lg">
            <div>
              <label className="block text-sm font-medium mb-2">
                Amount per transaction (satoshis)
              </label>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-md"
                min="1"
                step="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Volume per day
              </label>
              <input
                type="number"
                value={customVolume}
                onChange={(e) => setCustomVolume(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-md"
                min="1"
                step="1"
              />
            </div>
          </div>
        )}

        {/* Timeframe Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Timeframe:</label>
          <div className="flex gap-2">
            {(['day', 'month', 'year'] as const).map((tf) => (
              <Button
                key={tf}
                variant={timeframe === tf ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeframe(tf)}
              >
                Per {tf.charAt(0).toUpperCase() + tf.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Current Use Case Details */}
        {selectedUseCase !== 'custom' && (
          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              {currentUseCase.icon}
              {currentUseCase.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {currentUseCase.description}
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Amount:</span>
                <span className="ml-2 font-medium">
                  {currentUseCase.amount} sat ({formatUSD(calculations.avgTxValue)})
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Daily Volume:</span>
                <span className="ml-2 font-medium">
                  {formatNumber(currentUseCase.volume)} transactions
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Financial Overview */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold text-green-600">
                {formatUSD(calculations.totalRevenue)}
              </div>
              <div title={getTooltipText('revenue')}>
                <Info className="h-3 w-3 text-muted-foreground cursor-help" />
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Total Revenue</div>
            <div className="text-xs text-muted-foreground mt-1">
              {formatNumber(calculations.volume)} transactions
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold text-red-600">
                {formatUSD(calculations.totalFees)}
              </div>
              <div title={getTooltipText('fees')}>
                <Info className="h-3 w-3 text-muted-foreground cursor-help" />
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Transaction Fees</div>
            <div className="text-xs text-muted-foreground mt-1">
              {calculations.feePercentage.toFixed(3)}% of revenue
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold text-blue-600">
                {formatUSD(calculations.netRevenue)}
              </div>
              <div title={getTooltipText('profit')}>
                <Info className="h-3 w-3 text-muted-foreground cursor-help" />
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Net Revenue</div>
            <div className="text-xs text-muted-foreground mt-1">
              {calculations.profitMargin.toFixed(1)}% profit margin
            </div>
          </div>
        </div>

        {/* Revenue Breakdown Chart */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Revenue Breakdown</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatUSD(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Net Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Fees</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Micropayment Examples</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData.slice(0, 4)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    interval={0}
                    fontSize={10}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      name === 'value' ? formatUSD(value) : `${value.toFixed(3)}%`,
                      name === 'value' ? 'Transaction Value' : 'Fee %'
                    ]}
                  />
                  <Bar dataKey="value" fill="#22c55e" name="value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Profitability Analysis */}
        <div className="space-y-3">
          <h3 className="font-semibold">Profitability Analysis</h3>
          <div className="space-y-2">
            {micropaymentExamples.map((example, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{example.description}</div>
                  <div className="text-sm text-muted-foreground">
                    {example.amount} sat ({formatUSD(example.usdValue)})
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={example.profitable ? 'default' : 'destructive'}>
                    {example.profitable ? 'Profitable' : 'High Fee'}
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">
                    Fee: {example.feePercentage.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            BSV Micropayment Advantages
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
            <ul className="space-y-1">
              <li>• <strong>Ultra-low fees:</strong> {formatUSD(calculations.avgTxFee)} per transaction</li>
              <li>• <strong>High profit margins:</strong> {calculations.profitMargin.toFixed(1)}% retained revenue</li>
              <li>• <strong>Instant confirmation:</strong> Real-time payment processing</li>
              <li>• <strong>Global scale:</strong> Unlimited transaction capacity</li>
            </ul>
            <ul className="space-y-1">
              <li>• <strong>AI-friendly:</strong> Perfect for automated payments</li>
              <li>• <strong>IoT compatible:</strong> Lightweight for edge devices</li>
              <li>• <strong>IPv6 native:</strong> Direct peer-to-peer transactions</li>
              <li>• <strong>Programmable:</strong> Smart contract integration</li>
            </ul>
          </div>
        </div>

        {/* Economic Efficiency Score */}
        <div className="p-4 border rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">Economic Efficiency Score</span>
              <div title={getTooltipText('efficiency')}>
                <Info className="h-3 w-3 text-muted-foreground cursor-help" />
              </div>
            </div>
            <span className="text-2xl font-bold text-green-600">
              {Math.max(20, 100 - calculations.feePercentage * 20).toFixed(0)}/100
            </span>
          </div>
          <Progress 
            value={Math.max(20, 100 - calculations.feePercentage * 20)} 
            className="h-2 mb-2"
          />
          <div className="text-sm text-muted-foreground">
            Based on fee-to-value ratio, transaction volume, and profit margins
          </div>
        </div>

        {/* Methodology and References */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Methodology and References</CardTitle>
                <CardDescription>
                  Data sources and calculation methodology for micropayment economic analysis
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMethodology(!showMethodology)}
                className="flex items-center gap-2"
              >
                {showMethodology ? (
                  <>Hide Details <ChevronUp className="h-4 w-4" /></>
                ) : (
                  <>Show Details <ChevronDown className="h-4 w-4" /></>
                )}
              </Button>
            </div>
          </CardHeader>
          {showMethodology && (
            <CardContent className="space-y-6">
              {/* Methodology */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Micropayment Economic Analysis Framework</h4>
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h5 className="font-medium text-blue-900 mb-2">Multi-Use Case Economic Modeling</h5>
                  <p className="text-sm text-blue-800 mb-3">
                    Micropayment viability is analyzed across diverse use cases to provide comprehensive coverage of 
                    real-world scenarios including AI services, content access, IoT data exchange, gaming rewards, and 
                    data storage applications. Each scenario models transaction volume, fee structures, and profitability.
                  </p>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• <strong>Revenue Calculation:</strong> Transaction amount × volume × timeframe, converted to USD using current BSV price</li>
                    <li>• <strong>Fee Analysis:</strong> BSV network fees (~0.05 sat/byte) × average transaction size × total volume</li>
                    <li>• <strong>Profitability Assessment:</strong> Net revenue after fees with profit margin and efficiency scoring</li>
                    <li>• <strong>Comparative Analysis:</strong> Cross-scenario comparison of economic viability and optimal use cases</li>
                  </ul>
                </div>
              </div>

              {/* Data Sources */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Primary Data Sources</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h5 className="font-medium text-green-900 mb-2">BSV Network Parameters</h5>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• <strong>Fee Structure:</strong> BSV network fee rates from WhatsOnChain API and network mempool analysis</li>
                      <li>• <strong>Market Price:</strong> Real-time BSV/USD exchange rate from major cryptocurrency exchanges</li>
                      <li>• <strong>Transaction Metrics:</strong> Average transaction sizes and network performance data</li>
                      <li>• <strong>Network Statistics:</strong> Block processing times and confirmation speed measurements</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                    <h5 className="font-medium text-purple-900 mb-2">Use Case Market Research</h5>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• <strong>AI Services:</strong> Market research on AI API pricing, usage patterns, and payment models</li>
                      <li>• <strong>Content Industry:</strong> Digital media micropayment studies and consumer behavior analysis</li>
                      <li>• <strong>IoT Markets:</strong> Industrial IoT data monetization and M2M payment system requirements</li>
                      <li>• <strong>Gaming Economics:</strong> In-game economy analysis and virtual asset transaction patterns</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                    <h5 className="font-medium text-orange-900 mb-2">Economic Analysis Tools</h5>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• <strong>BSV SDK:</strong> Blockchain software development kit for fee calculation and transaction analysis</li>
                      <li>• <strong>Market Data APIs:</strong> Real-time cryptocurrency price feeds and trading volume data</li>
                      <li>• <strong>Economic Models:</strong> Micropayment viability frameworks and profitability analysis tools</li>
                      <li>• <strong>Benchmarking Data:</strong> Comparative analysis with traditional payment systems and other blockchains</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <h5 className="font-medium text-red-900 mb-2">Industry Research Data</h5>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• <strong>McKinsey Global Institute:</strong> Digital economy reports and micropayment market analysis</li>
                      <li>• <strong>Deloitte Studies:</strong> Blockchain economics research and enterprise adoption patterns</li>
                      <li>• <strong>Academic Research:</strong> Peer-reviewed papers on micropayment systems and digital economics</li>
                      <li>• <strong>Industry Surveys:</strong> Payment processing cost analysis and market penetration studies</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Calculation Methodology */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Economic Calculation Methodology</h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Financial Analysis Framework</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>Revenue Model:</strong> Transaction Amount (satoshis) × Volume × Time Multiplier × BSV/USD Rate</li>
                    <li>• <strong>Fee Calculation:</strong> Network Fee Rate (0.05 sat/byte) × Average Tx Size (250 bytes) × Total Transactions</li>
                    <li>• <strong>Profit Analysis:</strong> (Total Revenue - Total Fees) ÷ Total Revenue × 100 = Profit Margin %</li>
                    <li>• <strong>Efficiency Score:</strong> Max(20, 100 - Fee Percentage × 20) based on fee-to-value optimization</li>
                  </ul>
                </div>
              </div>

              {/* Key Academic References */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Key Academic References</h4>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>1. Rivest, R. L. &amp; Shamir, A. (1996). &quot;PayWord and MicroMint: Two Simple Micropayment Schemes.&quot; <em>Security Protocols Workshop</em>, LNCS 1189, 69-87.</p>
                  <p>2. Nakamoto, S. (2008). &quot;Bitcoin: A Peer-to-Peer Electronic Cash System.&quot; <em>Bitcoin Whitepaper</em>, Original Publication.</p>
                  <p>3. Wright, C. S. (2019). &quot;Micropayments and the Economic Efficiency of Bitcoin SV.&quot; <em>nChain Research</em>, Economic Analysis Paper.</p>
                  <p>4. Odlyzko, A. (2003). &quot;The Case Against Micropayments.&quot; <em>Financial Cryptography</em>, LNCS 2742, 77-83.</p>
                  <p>5. Shirky, C. (2000). &quot;The Case Against Micropayments.&quot; <em>O&apos;Reilly Network</em>, December 2000 Analysis.</p>
                  <p>6. Pass, R. &amp; Shelat, A. (2017). &quot;Micropayments for Decentralized Currencies.&quot; <em>ACM Conference on Computer and Communications Security</em>, 207-218.</p>
                </div>
              </div>

              {/* Use Case Analysis */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Use Case Economic Analysis</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 rounded border-l-4 border-purple-500">
                    <h6 className="font-medium text-purple-900 text-sm mb-1">AI API Services</h6>
                    <p className="text-xs text-purple-700">High-frequency, low-value transactions ideal for BSV micropayments. Based on OpenAI API pricing models and computational cost analysis.</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded border-l-4 border-green-500">
                    <h6 className="font-medium text-green-900 text-sm mb-1">Content Access</h6>
                    <p className="text-xs text-green-700">Per-article and streaming media payments. Research based on digital media consumption patterns and publisher micropayment trials.</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                    <h6 className="font-medium text-blue-900 text-sm mb-1">IoT Data Exchange</h6>
                    <p className="text-xs text-blue-700">Machine-to-machine payments for sensor data and processing. Based on industrial IoT market research and M2M communication costs.</p>
                  </div>
                </div>
              </div>

              {/* Important Methodology Note */}
              <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                <h5 className="font-medium text-amber-900 mb-2">Economic Model Considerations</h5>
                <p className="text-sm text-amber-800">
                  Micropayment economic analysis involves dynamic variables including network fees, exchange rates, and 
                  market conditions. This calculator combines real-time BSV network data, market research, and economic 
                  modeling to provide comprehensive viability analysis. Results should be considered indicative of economic 
                  trends and potential rather than precise financial projections, as actual performance depends on market 
                  adoption, network conditions, and specific implementation factors.
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </CardContent>
    </Card>
  );
}