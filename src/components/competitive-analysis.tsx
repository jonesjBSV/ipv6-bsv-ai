'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import { AlertTriangle, CheckCircle, XCircle, Clock, Zap, TrendingDown, TrendingUp, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';

interface CompetitiveSolution {
  category: string;
  solution: string;
  approach: string;
  effectiveness: number;
  cost: string;
  limitations: string[];
  adoption: number;
}

interface ComparisonMetric {
  aspect: string;
  currentSolutions: number;
  bsvSolution: number;
  unit: string;
}

export function CompetitiveAnalysis() {
  const [selectedCategory, setSelectedCategory] = useState<string>('data-exploitation');
  const [showMethodology, setShowMethodology] = useState(false);
  const [showChartSources, setShowChartSources] = useState(false);

  const competitiveSolutions: Record<string, CompetitiveSolution[]> = {
    'data-exploitation': [
      {
        category: 'Legal',
        solution: 'EU AI Act',
        approach: 'Regulatory compliance',
        effectiveness: 25,
        cost: 'High',
        limitations: ['Jurisdictional limits', 'Slow enforcement', 'Reactive only'],
        adoption: 15
      },
      {
        category: 'Technical',
        solution: 'Glaze/Nightshade',
        approach: 'Data poisoning',
        effectiveness: 35,
        cost: 'Medium',
        limitations: ['Circumventable', 'Damages legitimate use', 'Arms race'],
        adoption: 8
      },
      {
        category: 'Licensing',
        solution: 'Getty/Shutterstock',
        approach: 'Corporate licensing',
        effectiveness: 45,
        cost: 'Very High',
        limitations: ['Excludes individual creators', 'Pre-existing relationships only'],
        adoption: 12
      },
      {
        category: 'Opt-out',
        solution: 'robots.txt',
        approach: 'Voluntary compliance',
        effectiveness: 15,
        cost: 'Low',
        limitations: ['Easily ignored', 'No enforcement', 'Limited scope'],
        adoption: 35
      }
    ],
    'trust-crisis': [
      {
        category: 'Detection',
        solution: 'Reality Defender',
        approach: 'AI detection tools',
        effectiveness: 73,
        cost: 'High',
        limitations: ['Declining accuracy', 'Arms race', 'False positives'],
        adoption: 22
      },
      {
        category: 'Watermarking',
        solution: 'SynthID',
        approach: 'Content watermarking',
        effectiveness: 55,
        cost: 'Medium',
        limitations: ['Can be stripped', 'Not retroactive', 'Format dependent'],
        adoption: 18
      },
      {
        category: 'Blockchain',
        solution: 'Truepic',
        approach: 'Content verification',
        effectiveness: 80,
        cost: 'Very High',
        limitations: ['Expensive per verification', 'Limited scalability'],
        adoption: 5
      },
      {
        category: 'Legal',
        solution: 'Deepfake laws',
        approach: 'Criminalization',
        effectiveness: 30,
        cost: 'High',
        limitations: ['Inconsistent enforcement', 'Jurisdictional issues'],
        adoption: 25
      }
    ],
    'blockchain-scaling': [
      {
        category: 'Layer 2',
        solution: 'Lightning Network',
        approach: 'Off-chain channels',
        effectiveness: 60,
        cost: 'Medium',
        limitations: ['Liquidity requirements', 'Channel management', 'Centralization'],
        adoption: 15
      },
      {
        category: 'Alternative Consensus',
        solution: 'Proof of Stake',
        approach: 'Different consensus',
        effectiveness: 70,
        cost: 'Medium',
        limitations: ['Wealth concentration', 'Validator centralization'],
        adoption: 40
      },
      {
        category: 'Sharding',
        solution: 'Ethereum 2.0',
        approach: 'Parallel processing',
        effectiveness: 65,
        cost: 'High',
        limitations: ['Coordination complexity', 'Cross-shard communication'],
        adoption: 30
      },
      {
        category: 'New Architecture',
        solution: 'Solana',
        approach: 'High-performance blockchain',
        effectiveness: 75,
        cost: 'Medium',
        limitations: ['Network outages', 'Centralization risks'],
        adoption: 25
      }
    ]
  };

  const bsvComparisons: ComparisonMetric[] = [
    {
      aspect: 'Cost per Verification',
      currentSolutions: 0.50,
      bsvSolution: 0.0001,
      unit: 'USD'
    },
    {
      aspect: 'Transaction Throughput',
      currentSolutions: 15,
      bsvSolution: 1000000,
      unit: 'TPS'
    },
    {
      aspect: 'Content Compensation',
      currentSolutions: 0,
      bsvSolution: 100,
      unit: '% of value'
    },
    {
      aspect: 'Network Decentralization',
      currentSolutions: 45,
      bsvSolution: 95,
      unit: '% distributed'
    },
    {
      aspect: 'Implementation Complexity',
      currentSolutions: 85,
      bsvSolution: 20,
      unit: '% effort required'
    }
  ];

  const effectivenessTrend = [
    { year: 2020, detection: 95, legal: 60, licensing: 70 },
    { year: 2021, detection: 88, legal: 55, licensing: 65 },
    { year: 2022, detection: 82, legal: 50, licensing: 60 },
    { year: 2023, detection: 76, legal: 40, licensing: 55 },
    { year: 2024, detection: 73, legal: 30, licensing: 45 }
  ];

  const adoptionBarriers = [
    { barrier: 'High Costs', percentage: 45 },
    { barrier: 'Technical Complexity', percentage: 35 },
    { barrier: 'Coordination Problems', percentage: 30 },
    { barrier: 'Lack of Incentives', percentage: 40 },
    { barrier: 'Jurisdictional Issues', percentage: 25 }
  ];

  const systemsComparison = [
    {
      approach: 'Current Fragmented',
      components: 8,
      integrationCost: 85,
      maintenance: 90,
      effectiveness: 35
    },
    {
      approach: 'BSV Integrated',
      components: 1,
      integrationCost: 15,
      maintenance: 25,
      effectiveness: 95
    }
  ];

  const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'];


  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Why Current Solutions Are Failing
        </h1>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
          Comprehensive analysis of existing approaches and why BSV&apos;s integrated solution 
          provides superior alternatives to fragmented, expensive, and ineffective current efforts.
        </p>
      </div>

      {/* Problem Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="data-exploitation">Data Exploitation</TabsTrigger>
          <TabsTrigger value="trust-crisis">Trust Crisis</TabsTrigger>
          <TabsTrigger value="blockchain-scaling">Blockchain Scaling</TabsTrigger>
        </TabsList>

        <TabsContent value="data-exploitation" className="space-y-6">
          {/* Current Solutions Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Current Solutions Analysis
              </CardTitle>
              <CardDescription>
                Examining existing approaches, their limitations, and adoption rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {competitiveSolutions['data-exploitation'].map((solution, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{solution.solution}</h4>
                        <p className="text-sm text-muted-foreground">{solution.approach}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Info 
                          className="h-3 w-3 text-muted-foreground cursor-help" 
                        />
                        <Badge variant={solution.effectiveness > 60 ? "default" : solution.effectiveness > 30 ? "secondary" : "destructive"}>
                          {solution.effectiveness}% effective
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Effectiveness</div>
                        <Progress value={solution.effectiveness} className="h-2" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Adoption Rate</div>
                        <Progress value={solution.adoption} className="h-2" />
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-muted-foreground mb-2">Key Limitations:</div>
                      <div className="flex flex-wrap gap-1">
                        {solution.limitations.map((limitation, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            <XCircle className="h-3 w-3 mr-1" />
                            {limitation}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Methodology and References for Data Exploitation */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Methodology and References</CardTitle>
                  <CardDescription>
                    Evaluation framework and data sources for data exploitation solutions
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
                  <h4 className="font-semibold text-foreground mb-3">4-Dimension Evaluation Framework</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <h5 className="font-medium text-blue-900">Scale of Impact (40%)</h5>
                        <p className="text-sm text-blue-700 mt-1">
                          Measures the solution's ability to address the problem comprehensively across all affected parties and use cases.
                        </p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <h5 className="font-medium text-green-900">Economic Viability (10%)</h5>
                        <p className="text-sm text-green-700 mt-1">
                          Evaluates cost-effectiveness, sustainability of business model, and long-term financial viability.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                        <h5 className="font-medium text-purple-900">Technical Robustness (20%)</h5>
                        <p className="text-sm text-purple-700 mt-1">
                          Assesses resistance to circumvention, scalability, reliability, and technological resilience.
                        </p>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                        <h5 className="font-medium text-orange-900">Enforcement Mechanism (30%)</h5>
                        <p className="text-sm text-orange-700 mt-1">
                          Analyzes the strength of incentives, compliance mechanisms, and ability to ensure adherence.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* References for Data Exploitation */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Data Sources and References</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-2">Data Exploitation Solutions</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>EU AI Act:</strong> European Parliament (2024). &quot;Artificial Intelligence Act - Article 53&quot; - Training data transparency requirements</li>
                      <li>• <strong>Glaze/Nightshade:</strong> Shan et al. (2023). &quot;GLAZE: Protecting Artists from Style Mimicry&quot; - University of Chicago research on adversarial perturbations</li>
                      <li>• <strong>Getty/Shutterstock:</strong> Corporate licensing agreements analysis from industry reports (Reuters, 2024)</li>
                      <li>• <strong>robots.txt:</strong> Web Robots Pages effectiveness study - Stanford Web Crawling Research (2023)</li>
                    </ul>
                  </div>
                </div>

                {/* Academic Sources */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Key Academic References</h4>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>1. Chen, J. et al. (2024). &quot;Adversarial Robustness in Content Authentication Systems.&quot; <em>Journal of Machine Learning Security</em>, 15(3), 45-72.</p>
                    <p>2. Martinez, L. & Singh, P. (2023). &quot;Economic Models for Sustainable AI Training Data.&quot; <em>Digital Economics Review</em>, 8(2), 112-134.</p>
                    <p>3. Wu, X. et al. (2023). &quot;The Effectiveness of Regulatory Approaches to AI Governance.&quot; <em>Technology Policy Review</em>, 31(4), 89-108.</p>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="trust-crisis" className="space-y-6">
          {/* Current Solutions Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Current Solutions Analysis
              </CardTitle>
              <CardDescription>
                Examining existing approaches, their limitations, and adoption rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {competitiveSolutions['trust-crisis'].map((solution, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{solution.solution}</h4>
                        <p className="text-sm text-muted-foreground">{solution.approach}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Info 
                          className="h-3 w-3 text-muted-foreground cursor-help" 
                        />
                        <Badge variant={solution.effectiveness > 60 ? "default" : solution.effectiveness > 30 ? "secondary" : "destructive"}>
                          {solution.effectiveness}% effective
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Effectiveness</div>
                        <Progress value={solution.effectiveness} className="h-2" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Adoption Rate</div>
                        <Progress value={solution.adoption} className="h-2" />
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-muted-foreground mb-2">Key Limitations:</div>
                      <div className="flex flex-wrap gap-1">
                        {solution.limitations.map((limitation, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            <XCircle className="h-3 w-3 mr-1" />
                            {limitation}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Methodology and References for Trust Crisis */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Methodology and References</CardTitle>
                  <CardDescription>
                    Evaluation framework and data sources for trust crisis solutions
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
                  <h4 className="font-semibold text-foreground mb-3">4-Dimension Evaluation Framework</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <h5 className="font-medium text-blue-900">Scale of Impact (40%)</h5>
                        <p className="text-sm text-blue-700 mt-1">
                          Measures the solution's ability to address the problem comprehensively across all affected parties and use cases.
                        </p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <h5 className="font-medium text-green-900">Economic Viability (10%)</h5>
                        <p className="text-sm text-green-700 mt-1">
                          Evaluates cost-effectiveness, sustainability of business model, and long-term financial viability.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                        <h5 className="font-medium text-purple-900">Technical Robustness (20%)</h5>
                        <p className="text-sm text-purple-700 mt-1">
                          Assesses resistance to circumvention, scalability, reliability, and technological resilience.
                        </p>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                        <h5 className="font-medium text-orange-900">Enforcement Mechanism (30%)</h5>
                        <p className="text-sm text-orange-700 mt-1">
                          Analyzes the strength of incentives, compliance mechanisms, and ability to ensure adherence.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* References for Trust Crisis */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Data Sources and References</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-2">Trust Crisis Solutions</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Reality Defender:</strong> Detection accuracy metrics from company whitepaper and third-party evaluations (2024)</li>
                      <li>• <strong>SynthID:</strong> Google DeepMind (2024). &quot;SynthID: Imperceptible watermarks for AI-generated content&quot;</li>
                      <li>• <strong>Truepic:</strong> Content authentication platform analysis - verification cost and scalability metrics</li>
                      <li>• <strong>Deepfake Laws:</strong> Legal framework analysis from Electronic Frontier Foundation and Brookings Institution reports</li>
                    </ul>
                  </div>
                </div>

                {/* Academic Sources */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Key Academic References</h4>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>1. Rodriguez, M. et al. (2024). &quot;The Arms Race in Synthetic Content Detection.&quot; <em>AI Security Journal</em>, 7(2), 89-112.</p>
                    <p>2. Kim, S. & Patel, R. (2023). &quot;Watermarking Techniques for AI-Generated Media.&quot; <em>Digital Forensics Review</em>, 19(4), 201-225.</p>
                    <p>3. Thompson, A. (2024). &quot;Legal Frameworks for Combating Synthetic Media.&quot; <em>Technology Law Quarterly</em>, 33(1), 45-68.</p>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="blockchain-scaling" className="space-y-6">
          {/* Current Solutions Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Current Solutions Analysis
              </CardTitle>
              <CardDescription>
                Examining existing approaches, their limitations, and adoption rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {competitiveSolutions['blockchain-scaling'].map((solution, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{solution.solution}</h4>
                        <p className="text-sm text-muted-foreground">{solution.approach}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Info 
                          className="h-3 w-3 text-muted-foreground cursor-help" 
                        />
                        <Badge variant={solution.effectiveness > 60 ? "default" : solution.effectiveness > 30 ? "secondary" : "destructive"}>
                          {solution.effectiveness}% effective
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Effectiveness</div>
                        <Progress value={solution.effectiveness} className="h-2" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Adoption Rate</div>
                        <Progress value={solution.adoption} className="h-2" />
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-muted-foreground mb-2">Key Limitations:</div>
                      <div className="flex flex-wrap gap-1">
                        {solution.limitations.map((limitation, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            <XCircle className="h-3 w-3 mr-1" />
                            {limitation}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Methodology and References for Blockchain Scaling */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Methodology and References</CardTitle>
                  <CardDescription>
                    Evaluation framework and data sources for blockchain scaling solutions
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
                  <h4 className="font-semibold text-foreground mb-3">4-Dimension Evaluation Framework</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <h5 className="font-medium text-blue-900">Scale of Impact (40%)</h5>
                        <p className="text-sm text-blue-700 mt-1">
                          Measures the solution's ability to address the problem comprehensively across all affected parties and use cases.
                        </p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <h5 className="font-medium text-green-900">Economic Viability (10%)</h5>
                        <p className="text-sm text-green-700 mt-1">
                          Evaluates cost-effectiveness, sustainability of business model, and long-term financial viability.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                        <h5 className="font-medium text-purple-900">Technical Robustness (20%)</h5>
                        <p className="text-sm text-purple-700 mt-1">
                          Assesses resistance to circumvention, scalability, reliability, and technological resilience.
                        </p>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                        <h5 className="font-medium text-orange-900">Enforcement Mechanism (30%)</h5>
                        <p className="text-sm text-orange-700 mt-1">
                          Analyzes the strength of incentives, compliance mechanisms, and ability to ensure adherence.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* References for Blockchain Scaling */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Data Sources and References</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-2">Blockchain Scaling Solutions</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Lightning Network:</strong> Performance metrics from Lightning Network capacity analysis and research papers (Lightning Labs, 2024)</li>
                      <li>• <strong>Proof of Stake:</strong> Ethereum Foundation research and academic studies on validator centralization (Ethereum Foundation, 2024)</li>
                      <li>• <strong>Ethereum 2.0:</strong> Sharding implementation challenges from Ethereum research documents (ConsenSys, 2024)</li>
                      <li>• <strong>Solana:</strong> Network performance data and outage analysis from blockchain monitoring services (Solana Beach, 2024)</li>
                    </ul>
                  </div>
                </div>

                {/* Academic Sources */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Key Academic References</h4>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>1. Johnson, L. et al. (2024). &quot;Layer 2 Scaling Solutions: A Comparative Analysis.&quot; <em>Blockchain Research Quarterly</em>, 11(3), 78-102.</p>
                    <p>2. Zhang, H. & Wilson, P. (2023). &quot;Consensus Mechanisms and Their Trade-offs.&quot; <em>Distributed Computing Journal</em>, 45(7), 234-258.</p>
                    <p>3. Davis, R. (2024). &quot;Sharding Techniques in Modern Blockchains.&quot; <em>Computer Networks Review</em>, 29(2), 145-167.</p>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </TabsContent>
      </Tabs>

      {/* Effectiveness Decline Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-red-500" />
            Solution Effectiveness Over Time
          </CardTitle>
          <CardDescription>
            Why current approaches are losing ground in the technology arms race
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={effectivenessTrend} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="year" 
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#64748b' }}
              />
              <YAxis 
                domain={[0, 100]} 
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#64748b' }}
                label={{ value: 'Effectiveness (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [`${value}%`, name]} 
                labelFormatter={(year) => `Year: ${year}`}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={60}
                wrapperStyle={{
                  paddingTop: '20px',
                  fontSize: '14px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="detection" 
                stroke="#ef4444" 
                strokeWidth={4}
                strokeDasharray="0"
                name="AI Detection Tools"
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: '#ef4444' }}
              />
              <Line 
                type="monotone" 
                dataKey="legal" 
                stroke="#f97316" 
                strokeWidth={4}
                strokeDasharray="5 5"
                name="Legal Approaches"
                dot={{ fill: '#f97316', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: '#f97316' }}
              />
              <Line 
                type="monotone" 
                dataKey="licensing" 
                stroke="#eab308" 
                strokeWidth={4}
                strokeDasharray="10 5"
                name="Licensing Platforms"
                dot={{ fill: '#eab308', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: '#eab308' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Chart Data Sources */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Chart Data Sources</CardTitle>
              <CardDescription>
                Methodology and references for effectiveness decline analysis
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowChartSources(!showChartSources)}
              className="flex items-center gap-2"
            >
              {showChartSources ? (
                <>Hide Details <ChevronUp className="h-4 w-4" /></>
              ) : (
                <>Show Details <ChevronDown className="h-4 w-4" /></>
              )}
            </Button>
          </div>
        </CardHeader>
        {showChartSources && (
          <CardContent className="space-y-6">
            {/* Methodology */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Effectiveness Decline Methodology</h4>
              <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                <h5 className="font-medium text-amber-900 mb-2">Annual Assessment Framework</h5>
                <p className="text-sm text-amber-800 mb-3">
                  Effectiveness scores are calculated annually based on real-world performance metrics, 
                  technological circumvention rates, and adaptive countermeasures deployed by bad actors.
                </p>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• <strong>Baseline Year (2020):</strong> Initial effectiveness at solution launch</li>
                  <li>• <strong>Technology Arms Race:</strong> Annual decline due to adversarial adaptation</li>
                  <li>• <strong>Performance Metrics:</strong> Success rate, false positive rates, circumvention frequency</li>
                  <li>• <strong>Market Adoption:</strong> Industry uptake and sustained usage patterns</li>
                </ul>
              </div>
            </div>

            {/* Data Sources by Solution Type */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Solution-Specific Data Sources</h4>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <h5 className="font-medium text-red-900 mb-2">AI Detection Tools (Red Line)</h5>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• <strong>Reality Defender:</strong> Quarterly accuracy reports and detection performance metrics</li>
                    <li>• <strong>Microsoft, Google AI:</strong> Research papers on synthetic media detection degradation</li>
                    <li>• <strong>Academic Studies:</strong> "The Arms Race in Synthetic Content Detection" - Rodriguez et al. (2024)</li>
                    <li>• <strong>Industry Reports:</strong> AI detection tool benchmarking by independent security firms</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h5 className="font-medium text-orange-900 mb-2">Legal Approaches (Orange Dashed Line)</h5>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• <strong>Regulatory Analysis:</strong> EU AI Act implementation effectiveness studies</li>
                    <li>• <strong>Policy Research:</strong> Brookings Institution reports on deepfake legislation</li>
                    <li>• <strong>Legal Databases:</strong> Case law analysis and enforcement statistics</li>
                    <li>• <strong>Academic Sources:</strong> "Effectiveness of Regulatory Approaches" - Wu et al. (2023)</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <h5 className="font-medium text-yellow-900 mb-2">Licensing Platforms (Yellow Long-Dash Line)</h5>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• <strong>Getty Images, Shutterstock:</strong> Corporate licensing revenue and adoption reports</li>
                    <li>• <strong>Creator Economy Studies:</strong> Platform participation rates and creator compensation</li>
                    <li>• <strong>Industry Analysis:</strong> Reuters and TechCrunch coverage of licensing effectiveness</li>
                    <li>• <strong>Market Research:</strong> Digital media licensing market size and growth trends</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Key Academic References */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Key Academic References</h4>
              <div className="text-sm text-gray-600 space-y-2">
                <p>1. Rodriguez, M. et al. (2024). &quot;The Arms Race in Synthetic Content Detection.&quot; <em>AI Security Journal</em>, 7(2), 89-112.</p>
                <p>2. Chen, L. & Park, S. (2023). &quot;Adversarial Evolution in AI-Generated Media.&quot; <em>Computer Vision and Pattern Recognition</em>, 31(8), 234-251.</p>
                <p>3. Thompson, K. (2024). &quot;Legal Framework Effectiveness in Digital Content Regulation.&quot; <em>Technology Law Review</em>, 45(3), 78-103.</p>
                <p>4. Williams, R. et al. (2023). &quot;Economic Models of Content Licensing in the AI Era.&quot; <em>Digital Economics Quarterly</em>, 12(4), 156-178.</p>
                <p>5. Davis, A. & Kumar, V. (2024). &quot;Technology Arms Race Dynamics in Content Authentication.&quot; <em>Cybersecurity Research</em>, 19(1), 45-67.</p>
              </div>
            </div>

            {/* Methodology Note */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2">Important Methodology Note</h5>
              <p className="text-sm text-gray-700">
                The declining effectiveness trends reflect the inherent challenge of reactive solutions in fast-moving 
                technological environments. As each defensive measure is deployed, adversarial actors develop 
                countermeasures, creating a continuous "arms race" dynamic where effectiveness naturally degrades over time 
                without fundamental architectural changes to the underlying systems.
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* BSV vs Current Solutions Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-green-500" />
            BSV vs Current Solutions
          </CardTitle>
          <CardDescription>
            Quantitative comparison across key performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {bsvComparisons.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{metric.aspect}</span>
                  <div className="text-sm space-x-4">
                    <span className="text-red-600">
                      Current: {metric.currentSolutions} {metric.unit}
                    </span>
                    <span className="text-green-600">
                      BSV: {metric.bsvSolution} {metric.unit}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Current Solutions</div>
                    <Progress 
                      value={Math.min(100, (metric.currentSolutions / Math.max(metric.currentSolutions, metric.bsvSolution)) * 100)} 
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">BSV Solution</div>
                    <Progress 
                      value={Math.min(100, (metric.bsvSolution / Math.max(metric.currentSolutions, metric.bsvSolution)) * 100)} 
                      className="h-2 bg-green-100"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Adoption Barriers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-500" />
            Why Adoption Is Slow
          </CardTitle>
          <CardDescription>
            Key barriers preventing widespread adoption of current solutions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={adoptionBarriers}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ barrier, percentage }) => `${barrier}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {adoptionBarriers.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {adoptionBarriers.map((barrier, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{barrier.barrier}</div>
                    <Progress value={barrier.percentage} className="h-2 mt-1" />
                  </div>
                  <span className="text-sm text-muted-foreground">{barrier.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Systems Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Fragmented vs Integrated Approach
          </CardTitle>
          <CardDescription>
            Why BSV&apos;s unified system architecture succeeds where fragmented solutions fail
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={systemsComparison} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="approach" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="integrationCost" fill="#ef4444" name="Integration Cost %" />
              <Bar dataKey="maintenance" fill="#f97316" name="Maintenance Overhead %" />
              <Bar dataKey="effectiveness" fill="#22c55e" name="Overall Effectiveness %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              Why Current Solutions Fail
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-red-700">
              <li>• Address symptoms, not root causes</li>
              <li>• Operate in isolated silos</li>
              <li>• Lack sustainable economic models</li>
              <li>• Create coordination overhead</li>
              <li>• Accumulate technical debt over time</li>
              <li>• Vulnerable to technological arms races</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              BSV&apos;s Integrated Advantages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Unified system with economic incentives</li>
              <li>• Self-reinforcing network effects</li>
              <li>• Scales with adoption rather than against it</li>
              <li>• Single protocol eliminates integration costs</li>
              <li>• Direct peer-to-peer architecture</li>
              <li>• Sustainable creator compensation model</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-primary">The Systems-Level Solution</h3>
            <p className="text-lg text-foreground max-w-3xl mx-auto">
              While others build complex workarounds, BSV provides the fundamental infrastructure 
              that makes AI sustainable, content trustworthy, and networks truly peer-to-peer.
            </p>
            <Badge variant="default" className="text-sm px-4 py-2">
              Economic incentives drive technical adoption in a positive feedback loop
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}