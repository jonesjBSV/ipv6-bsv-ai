'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { CheckCircle, Shield, Zap, Download, Hash, Clock } from 'lucide-react';
import { createSPVProof, verifySPVProof } from '@/lib/bsv-sdk-utils';

interface VerificationStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'complete';
  icon: React.ReactNode;
  duration: number; // in milliseconds
}

const simulateSPVVerification = () => {
  const mockTxid = '0x' + Array(62).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  const mockNodes = Array(8).fill(0).map(() => 
    '0x' + Array(62).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')
  );
  const mockBlockHash = '0x' + Array(62).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  const mockMerkleRoot = '0x' + Array(62).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  
  return {
    transactionId: mockTxid,
    blockHeight: 873250 + Math.floor(Math.random() * 100),
    verificationTime: (Math.random() * 0.5 + 0.1).toFixed(3),
    proofSize: 256 + Math.floor(Math.random() * 512), // bytes
    merkleRoot: mockMerkleRoot,
    merkleProof: mockNodes
  };
};

export function SPVDemonstration() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [verificationData, setVerificationData] = useState(simulateSPVVerification());
  const [progress, setProgress] = useState(0);

  const verificationSteps: VerificationStep[] = [
    {
      id: 'download',
      title: 'Download Block Headers',
      description: 'Retrieving lightweight block headers instead of full blocks',
      status: 'pending',
      icon: <Download className="h-4 w-4" />,
      duration: 500
    },
    {
      id: 'merkle',
      title: 'Verify Merkle Proof',
      description: 'Validating transaction inclusion using cryptographic proof',
      status: 'pending',
      icon: <Hash className="h-4 w-4" />,
      duration: 200
    },
    {
      id: 'chain',
      title: 'Validate Chain Work',
      description: 'Confirming block is part of longest chain with most work',
      status: 'pending',
      icon: <Shield className="h-4 w-4" />,
      duration: 100
    },
    {
      id: 'complete',
      title: 'Verification Complete',
      description: 'Transaction verified without downloading full blockchain',
      status: 'pending',
      icon: <CheckCircle className="h-4 w-4" />,
      duration: 100
    }
  ];

  const [steps, setSteps] = useState(verificationSteps);

  const runSPVDemo = async () => {
    setIsRunning(true);
    setCurrentStep(0);
    setProgress(0);
    
    // Reset all steps
    setSteps(verificationSteps.map(step => ({ ...step, status: 'pending' })));

    let totalProgress = 0;
    const totalDuration = verificationSteps.reduce((sum, step) => sum + step.duration, 0);

    for (let i = 0; i < verificationSteps.length; i++) {
      // Mark current step as processing
      setSteps(prev => prev.map((step, index) => ({
        ...step,
        status: index === i ? 'processing' : index < i ? 'complete' : 'pending'
      })));
      
      setCurrentStep(i);

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, verificationSteps[i].duration));
      
      totalProgress += verificationSteps[i].duration;
      setProgress((totalProgress / totalDuration) * 100);
    }

    // Mark all steps as complete
    setSteps(prev => prev.map(step => ({ ...step, status: 'complete' })));
    setIsRunning(false);
    
    // Generate new verification data for next run
    setVerificationData(simulateSPVVerification());
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'complete': return 'text-green-600';
      case 'processing': return 'text-blue-600';
      default: return 'text-muted-foreground';
    }
  };

  const getStepIcon = (step: VerificationStep) => {
    if (step.status === 'complete') {
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    }
    if (step.status === 'processing') {
      return <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
    }
    return step.icon;
  };

  const formatBytes = (bytes: number) => {
    if (bytes >= 1000000) return `${(bytes / 1000000).toFixed(1)}MB`;
    if (bytes >= 1000) return `${(bytes / 1000).toFixed(1)}KB`;
    return `${bytes}B`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          SPV (Simplified Payment Verification) Demo
        </CardTitle>
        <CardDescription>
          Demonstrate how BSV enables lightweight verification without downloading the full blockchain
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Demo Controls */}
        <div className="flex items-center gap-4">
          <Button 
            onClick={runSPVDemo} 
            disabled={isRunning}
            className="flex items-center gap-2"
          >
            <Zap className="h-4 w-4" />
            {isRunning ? 'Running SPV Verification...' : 'Start SPV Demo'}
          </Button>
          
          {isRunning && (
            <div className="flex-1">
              <Progress value={progress} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1">
                Step {currentStep + 1} of {steps.length}
              </div>
            </div>
          )}
        </div>

        {/* Verification Steps */}
        <div className="space-y-3">
          <h3 className="font-semibold">Verification Process</h3>
          {steps.map((step) => (
            <div 
              key={step.id}
              className={`p-3 border rounded-lg transition-colors ${
                step.status === 'processing' ? 'bg-blue-50 border-blue-200' :
                step.status === 'complete' ? 'bg-green-50 border-green-200' :
                'bg-background'
              }`}
            >
              <div className="flex items-center gap-3">
                {getStepIcon(step)}
                <div className="flex-1">
                  <div className={`font-medium ${getStepColor(step.status)}`}>
                    {step.title}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {step.description}
                  </div>
                </div>
                <div className="text-right">
                  {step.status === 'complete' && (
                    <Badge variant="outline" className="text-green-600">
                      ✓ Complete
                    </Badge>
                  )}
                  {step.status === 'processing' && (
                    <Badge variant="outline" className="text-blue-600">
                      Processing...
                    </Badge>
                  )}
                  <div className="text-xs text-muted-foreground mt-1">
                    {step.duration}ms
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Data */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h3 className="font-semibold">Transaction Details</h3>
            <div className="p-3 border rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Transaction ID:</span>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {verificationData.transactionId.slice(0, 12)}...
                </code>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Block Height:</span>
                <span className="font-mono">{verificationData.blockHeight.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Verification Time:</span>
                <span className="font-mono text-green-600">{verificationData.verificationTime}s</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Proof Size:</span>
                <span className="font-mono">{formatBytes(verificationData.proofSize)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Merkle Proof</h3>
            <div className="p-3 border rounded-lg space-y-2">
              <div className="text-sm text-muted-foreground mb-2">Merkle Root:</div>
              <code className="text-xs bg-muted px-2 py-1 rounded block break-all">
                {verificationData.merkleRoot}
              </code>
              <div className="text-sm text-muted-foreground mt-2">Proof Path ({verificationData.merkleProof.length} hashes):</div>
              {verificationData.merkleProof.map((hash, index) => (
                <code key={index} className="text-xs bg-muted px-2 py-1 rounded block break-all">
                  {hash.slice(0, 16)}...{hash.slice(-8)}
                </code>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison: SPV vs Full Node */}
        <div className="space-y-3">
          <h3 className="font-semibold">SPV vs Full Node Comparison</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4" />
                SPV Verification
              </h4>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• <strong>Storage:</strong> ~{formatBytes(verificationData.proofSize)} proof</li>
                <li>• <strong>Time:</strong> {verificationData.verificationTime}s instant</li>
                <li>• <strong>Bandwidth:</strong> Minimal data transfer</li>
                <li>• <strong>Security:</strong> Cryptographically secure</li>
                <li>• <strong>Scalability:</strong> Perfect for mobile/IoT</li>
              </ul>
            </div>
            
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-semibold text-red-800 flex items-center gap-2 mb-2">
                <Download className="h-4 w-4" />
                Full Node Verification
              </h4>
              <ul className="space-y-1 text-sm text-red-700">
                <li>• <strong>Storage:</strong> ~500GB+ full blockchain</li>
                <li>• <strong>Time:</strong> Hours to days sync time</li>
                <li>• <strong>Bandwidth:</strong> Massive ongoing requirements</li>
                <li>• <strong>Security:</strong> Maximum security</li>
                <li>• <strong>Scalability:</strong> Resource intensive</li>
              </ul>
            </div>
          </div>
        </div>

        {/* AI Application Benefits */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600" />
            SPV Benefits for AI Applications
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <ul className="space-y-1 text-muted-foreground">
              <li>• <strong>Instant Verification:</strong> AI models can verify payments immediately</li>
              <li>• <strong>Low Resource Usage:</strong> Perfect for edge AI devices</li>
              <li>• <strong>Global Scale:</strong> Enables worldwide AI service networks</li>
              <li>• <strong>Mobile AI:</strong> Smartphone AI apps with blockchain verification</li>
            </ul>
            <ul className="space-y-1 text-muted-foreground">
              <li>• <strong>IoT Integration:</strong> Lightweight verification for IoT devices</li>
              <li>• <strong>Real-time Payments:</strong> Microsecond payment verification</li>
              <li>• <strong>Bandwidth Efficient:</strong> Critical for IPv6 mesh networks</li>
              <li>• <strong>Energy Efficient:</strong> Sustainable AI infrastructure</li>
            </ul>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Metric</th>
                <th className="text-right py-2">SPV</th>
                <th className="text-right py-2">Full Node</th>
                <th className="text-right py-2">Advantage</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Storage Required</td>
                <td className="text-right py-2 text-green-600">{formatBytes(verificationData.proofSize)}</td>
                <td className="text-right py-2 text-red-600">500+ GB</td>
                <td className="text-right py-2 font-semibold">99.99% less</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Verification Time</td>
                <td className="text-right py-2 text-green-600">{verificationData.verificationTime}s</td>
                <td className="text-right py-2 text-red-600">Hours</td>
                <td className="text-right py-2 font-semibold">10,000x faster</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Bandwidth Usage</td>
                <td className="text-right py-2 text-green-600">Minimal</td>
                <td className="text-right py-2 text-red-600">High</td>
                <td className="text-right py-2 font-semibold">95% less</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Security Level</td>
                <td className="text-right py-2 text-green-600">Cryptographic</td>
                <td className="text-right py-2 text-green-600">Complete</td>
                <td className="text-right py-2 font-semibold">Equivalent*</td>
              </tr>
            </tbody>
          </table>
          <div className="text-xs text-muted-foreground mt-2">
            * SPV provides cryptographic proof of inclusion, which is sufficient for most AI payment applications
          </div>
        </div>
      </CardContent>
    </Card>
  );
}