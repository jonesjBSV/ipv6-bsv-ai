'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Zap, Globe, Server, Infinity } from 'lucide-react';
import { calculateThroughputMetrics } from '@/lib/bsv-utils';

interface ThroughputMetric {
  name: string;
  current: number;
  theoretical: number;
  blockSize: number;
  blockTime: number;
  scalability: string;
  color: string;
  icon: React.ReactNode;
}

export function ThroughputComparison() {
  const [viewMode, setViewMode] = useState<'current' | 'theoretical' | 'scaling'>('current');
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});
  
  const metrics = calculateThroughputMetrics();

  const throughputData: ThroughputMetric[] = useMemo(() => [
    {
      name: 'BSV',
      current: metrics.bsv.currentTPS,
      theoretical: metrics.bsv.theoreticalTPS,
      blockSize: metrics.bsv.blockSize,
      blockTime: metrics.bsv.avgBlockTime,
      scalability: metrics.bsv.scalability,
      color: '#22c55e',
      icon: <Infinity className="h-4 w-4" />
    },
    {
      name: 'BTC',
      current: metrics.btc.currentTPS,
      theoretical: metrics.btc.theoreticalTPS,
      blockSize: metrics.btc.blockSize,
      blockTime: metrics.btc.avgBlockTime,
      scalability: metrics.btc.scalability,
      color: '#f97316',
      icon: <Server className="h-4 w-4" />
    },
    {
      name: 'ETH',
      current: metrics.eth.currentTPS,
      theoretical: metrics.eth.theoreticalTPS,
      blockSize: metrics.eth.blockSize,
      blockTime: metrics.eth.avgBlockTime,
      scalability: metrics.eth.scalability,
      color: '#3b82f6',
      icon: <Globe className="h-4 w-4" />
    }
  ], [metrics]);

  // Animation effect for counters
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedValues(prev => {
        const newValues = { ...prev };
        throughputData.forEach(item => {
          const targetValue = viewMode === 'current' ? item.current : item.theoretical;
          const currentValue = newValues[item.name] || 0;
          const step = Math.max(1, Math.ceil((targetValue - currentValue) / 10));
          
          if (currentValue < targetValue) {
            newValues[item.name] = Math.min(targetValue, currentValue + step);
          }
        });
        return newValues;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [viewMode, throughputData]);

  const chartData = throughputData.map(item => ({
    name: item.name,
    current: item.current,
    theoretical: viewMode === 'theoretical' ? item.theoretical : item.current,
    blockSize: item.blockSize / 1000000, // Convert to MB
    fill: item.color
  }));

  const scalingFactors = [
    { year: '2024', BSV: 300, BTC: 4.6, ETH: 12 },
    { year: '2025', BSV: 1000, BTC: 4.6, ETH: 15 },
    { year: '2026', BSV: 5000, BTC: 4.6, ETH: 20 },
    { year: '2027', BSV: 20000, BTC: 4.6, ETH: 25 },
    { year: '2028', BSV: 50000, BTC: 4.6, ETH: 30 },
    { year: '2030', BSV: 100000, BTC: 4.6, ETH: 50 }
  ];

  const formatTPS = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  const formatBlockSize = (bytes: number) => {
    if (bytes >= 1000000000) return `${(bytes / 1000000000).toFixed(1)}GB`;
    if (bytes >= 1000000) return `${(bytes / 1000000).toFixed(0)}MB`;
    if (bytes >= 1000) return `${(bytes / 1000).toFixed(0)}KB`;
    return `${bytes}B`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Blockchain Throughput Comparison
        </CardTitle>
        <CardDescription>
          Transaction processing capabilities and scalability analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* View Mode Toggle */}
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'current' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('current')}
          >
            Current TPS
          </Button>
          <Button
            variant={viewMode === 'theoretical' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('theoretical')}
          >
            Theoretical Max
          </Button>
          <Button
            variant={viewMode === 'scaling' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('scaling')}
          >
            Scaling Projection
          </Button>
        </div>

        {/* Current/Theoretical TPS View */}
        {(viewMode === 'current' || viewMode === 'theoretical') && (
          <div className="space-y-4">
            {/* Live Metrics */}
            <div className="grid md:grid-cols-3 gap-4">
              {throughputData.map((item) => (
                <div key={item.name} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {item.icon}
                    <span className="font-semibold" style={{ color: item.color }}>
                      {item.name}
                    </span>
                    {item.name === 'BSV' && viewMode === 'theoretical' && (
                      <Badge className="bg-green-100 text-green-800">Unlimited</Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-2xl font-bold" style={{ color: item.color }}>
                      {item.name === 'BSV' && viewMode === 'theoretical' ? 
                        '∞' : 
                        formatTPS(animatedValues[item.name] || 0)
                      } TPS
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      Block: {formatBlockSize(item.blockSize)} / {item.blockTime}s
                    </div>
                    
                    <Progress 
                      value={item.name === 'BSV' ? 100 : 
                        Math.min(100, ((viewMode === 'current' ? item.current : item.theoretical) / 1000) * 10)} 
                      className="h-2"
                    />
                    
                    <div className="text-xs text-muted-foreground">
                      {item.scalability}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bar Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    scale={viewMode === 'theoretical' ? 'log' : 'linear'}
                    domain={viewMode === 'theoretical' ? [1, 100000] : [0, 'dataMax']}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`${formatTPS(value)} TPS`, 'Throughput']}
                  />
                  <Bar 
                    dataKey="theoretical" 
                    fill="#8884d8" 
                    name="TPS"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Scaling Projection View */}
        {viewMode === 'scaling' && (
          <div className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scalingFactors}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis 
                    scale="log"
                    domain={[1, 100000]}
                    tickFormatter={formatTPS}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [`${formatTPS(value)} TPS`, name]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="BSV" 
                    stroke="#22c55e" 
                    strokeWidth={3}
                    dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="BTC" 
                    stroke="#f97316" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#f97316', strokeWidth: 2, r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ETH" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    strokeDasharray="3 3"
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4 text-green-600" />
                BSV Scaling Advantages
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• <strong>IPv6 Integration:</strong> Enables direct peer-to-peer communication</li>
                <li>• <strong>Teranode:</strong> Industrial-scale transaction processing infrastructure</li>
                <li>• <strong>Unbounded Blocks:</strong> No artificial size limits unlike BTC</li>
                <li>• <strong>Linear Scaling:</strong> Performance increases with network growth</li>
                <li>• <strong>Enterprise Ready:</strong> Designed for global adoption and AI workloads</li>
              </ul>
            </div>
          </div>
        )}

        {/* Technical Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Blockchain</th>
                <th className="text-right py-2">Current TPS</th>
                <th className="text-right py-2">Theoretical Max</th>
                <th className="text-right py-2">Block Size</th>
                <th className="text-right py-2">Block Time</th>
                <th className="text-left py-2">Scaling Method</th>
              </tr>
            </thead>
            <tbody>
              {throughputData.map((item) => (
                <tr key={item.name} className="border-b">
                  <td className="py-2 font-medium" style={{ color: item.color }}>
                    {item.name}
                  </td>
                  <td className="text-right py-2">{formatTPS(item.current)}</td>
                  <td className="text-right py-2">
                    {item.name === 'BSV' ? '∞' : formatTPS(item.theoretical)}
                  </td>
                  <td className="text-right py-2">{formatBlockSize(item.blockSize)}</td>
                  <td className="text-right py-2">{item.blockTime}s</td>
                  <td className="text-left py-2 text-muted-foreground">
                    {item.scalability}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key Insights */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">BSV Advantages</h4>
            <ul className="space-y-1 text-sm text-green-700">
              <li>• 1000x more scalable than BTC</li>
              <li>• Unlimited theoretical throughput</li>
              <li>• Perfect for AI microtransactions</li>
              <li>• IPv6-native architecture</li>
            </ul>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">AI Application Impact</h4>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>• Real-time AI model payments</li>
              <li>• High-frequency data transactions</li>
              <li>• Scalable IoT device networks</li>
              <li>• Global AI service marketplace</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}