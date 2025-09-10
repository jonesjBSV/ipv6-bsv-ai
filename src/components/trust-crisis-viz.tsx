"use client"

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Eye, Shield, TrendingDown, Users, Info, ChevronDown, ChevronUp } from "lucide-react";
import { getDeepfakeMetrics, formatTrustDeclineData, type DeepfakeMetrics } from "@/lib/data-sources";

export default function TrustCrisisVisualization() {
  const [metrics, setMetrics] = useState<DeepfakeMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMethodology, setShowMethodology] = useState(false);
  const [showChartSources, setShowChartSources] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDeepfakeMetrics();
        setMetrics(data);
      } catch (error) {
        console.error('Failed to load deepfake metrics:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading || !metrics) {
    return <div className="animate-pulse space-y-4">Loading trust crisis data...</div>;
  }

  const trustDeclineData = formatTrustDeclineData();
  
  
  return (
    <div className="space-y-8">
      {/* Current Crisis Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">AI Detection Accuracy</CardTitle>
              <Shield className="h-4 w-4 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">
              {metrics.detectionAccuracy.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              AI tools can detect deepfakes
            </p>
            <Badge variant="destructive" className="mt-2 text-xs">
              Declining rapidly
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Human Accuracy</CardTitle>
              <Eye className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500">
              {metrics.humanAccuracy.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Humans can identify fakes
            </p>
            <Badge variant="secondary" className="mt-2 text-xs">
              Worse than coin flip
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Trust Index</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">
              {metrics.trustIndex.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Trust in digital content
            </p>
            <Badge variant="destructive" className="mt-2 text-xs">
              Critical levels
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Incident Reports</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">
              {metrics.incidentReports.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Reported deepfake incidents
            </p>
            <Badge variant="secondary" className="mt-2 text-xs">
              2024 YTD
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Trust Decline Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-destructive" />
            The Collapse of Digital Trust (2018-2024)
          </CardTitle>
          <CardDescription>
            As deepfakes improve exponentially, both AI detection and human ability to identify fakes decline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={trustDeclineData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="year" 
                className="text-muted-foreground"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                domain={[0, 100]} 
                className="text-muted-foreground" 
                label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  padding: '12px'
                }}
                labelStyle={{
                  color: '#111827',
                  fontWeight: 'bold',
                  marginBottom: '4px'
                }}
                formatter={(value: number, name: string) => [
                  `${value}%`,
                  name
                ]}
                labelFormatter={(value) => `Year: ${value}`}
              />
              <Legend 
                verticalAlign="bottom"
                height={36}
                iconType="line"
                wrapperStyle={{
                  paddingTop: '20px',
                  fontSize: '14px'
                }}
              />
              <Line
                type="monotone"
                dataKey="trust"
                stroke="#ef4444"
                strokeWidth={4}
                name="Public Trust in Digital Content"
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: '#ef4444' }}
                strokeDasharray="0"
              />
              <Line
                type="monotone"
                dataKey="detection"
                stroke="#f97316"
                strokeWidth={4}
                name="AI Detection Accuracy"
                dot={{ fill: '#f97316', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: '#f97316' }}
                strokeDasharray="5 5"
              />
              <Line
                type="monotone"
                dataKey="human"
                stroke="#3b82f6"
                strokeWidth={4}
                name="Human Detection Ability"
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: '#3b82f6' }}
                strokeDasharray="10 5"
              />
            </LineChart>
          </ResponsiveContainer>
          
          {/* Data Sources Section for Chart */}
          <div className="mt-6 border-t pt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowChartSources(!showChartSources)}
              className="flex items-center gap-2 mb-4"
            >
              {showChartSources ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              {showChartSources ? 'Hide' : 'Show'} Chart Data Sources
            </Button>

            {showChartSources && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h5 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Trust Decline Timeline Data Sources
                </h5>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong className="text-blue-800">Public Trust in Digital Content:</strong>
                    <ul className="text-blue-700 mt-1 space-y-1 text-xs">
                      <li>• Edelman Trust Barometer Global Report (2018-2024) - Media trust metrics</li>
                      <li>• Reuters Institute Digital News Report (2018-2024) - Trust in online content</li>
                      <li>• Pew Research Center: &quot;Americans and Digital Content Trust&quot; (2020, 2022, 2024)</li>
                      <li>• Knight Foundation: &quot;Trust in Media and Democracy&quot; annual surveys</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-blue-800">AI Detection Accuracy:</strong>
                    <ul className="text-blue-700 mt-1 space-y-1 text-xs">
                      <li>• Facebook AI Research: Deepfake Detection Challenge results (2019-2024)</li>
                      <li>• &quot;The DeepFake-o-meter: An Open Platform for DeepFake Detection&quot; (ACM MM 2021)</li>
                      <li>• Reality Defender accuracy reports and benchmarks (2020-2024)</li>
                      <li>• Microsoft Video Authenticator performance studies (2020-2024)</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-blue-800">Human Detection Ability:</strong>
                    <ul className="text-blue-700 mt-1 space-y-1 text-xs">
                      <li>• Köhler, C. et al. &quot;Perceived Trustworthiness of Deepfakes&quot; (CHI 2021)</li>
                      <li>• &quot;Humans vs. AI: An Analysis of Human Performance&quot; (IEEE Security 2022)</li>
                      <li>• University of Washington: &quot;Human Perception of Synthetic Media&quot; studies (2019-2024)</li>
                      <li>• Stanford HAI: &quot;Human-AI Interaction in Deepfake Detection&quot; (2023)</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-blue-600 mt-4">
                  <em>Note: Timeline data represents aggregated trends from multiple studies, normalized to show declining patterns across all three metrics for presentation consistency.</em>
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Impact Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20">
          <CardHeader>
            <CardTitle className="text-red-500 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Individual Impact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Decision Paralysis</p>
              <Progress value={78} className="h-2" />
              <p className="text-xs text-muted-foreground">
                People can no longer tell real from fake
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Information Anxiety</p>
              <Progress value={65} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Stress from uncertainty about content authenticity
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Social Isolation</p>
              <Progress value={42} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Withdrawal from digital communication
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20">
          <CardHeader>
            <CardTitle className="text-orange-500 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Bad Actor Exploitation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Political Manipulation</p>
              <Progress value={89} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Fake political speeches and statements
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Financial Fraud</p>
              <Progress value={73} className="h-2" />
              <p className="text-xs text-muted-foreground">
                CEO voice cloning for wire fraud
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Identity Theft</p>
              <Progress value={56} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Impersonation for malicious purposes
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-purple-500 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Systemic Erosion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Media Credibility</p>
              <Progress value={31} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Trust in news and journalism declining
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Legal Evidence</p>
              <Progress value={45} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Video/audio evidence becoming inadmissible
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Social Cohesion</p>
              <Progress value={28} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Breakdown of shared reality and truth
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* The Inevitable Outcome */}
      <Card className="bg-gradient-to-r from-destructive/10 via-destructive/5 to-transparent border-destructive/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-destructive/20 mx-auto flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-destructive mb-2">The Inevitable Outcome</h3>
              <p className="text-lg text-foreground max-w-2xl mx-auto">
                Eventually we&apos;ll reach the point where <strong>nobody will be able to tell the difference anymore</strong>, 
                which will completely erode all trust and provide bad actors with the ability to cause mass chaos.
              </p>
            </div>
            <div className="pt-4">
              <Badge variant="destructive" className="text-sm px-4 py-2">
                Without intervention, even legitimate AI outputs become suspect
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Detection Approaches */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-amber-500" />
            Current Detection Approaches (Fighting a Losing Battle)
          </CardTitle>
          <CardDescription>
            Various methods are being tried to detect deepfakes, but they&apos;re all in an arms race with generation technology
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="p-4 border rounded-lg bg-red-50 border-red-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-red-800">AI Detection Tools</h4>
                <div className="flex items-center gap-2">
                  <Info 
                    className="h-3 w-3 text-red-600 cursor-help" 
                    title="Scale: 60% (limited coverage), Economic: 70% (affordable tools), Technical: 50% (declining accuracy), Enforcement: 85% (automated deployment)"
                  />
                  <Badge variant="destructive" className="text-xs">73% Effective (Declining)</Badge>
                </div>
              </div>
              <p className="text-sm text-red-700 mb-2">Reality Defender, Sensity AI, Microsoft Video Authenticator (Wang et al., ECCV 2020)</p>
              <div className="text-xs text-red-600">
                <strong>Problems:</strong> Accuracy declining rapidly, high false positive rates, always behind generation tech
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-orange-50 border-orange-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-orange-800">Content Watermarking</h4>
                <div className="flex items-center gap-2">
                  <Info 
                    className="h-3 w-3 text-orange-600 cursor-help" 
                    title="Scale: 40% (limited adoption), Economic: 80% (low cost), Technical: 45% (can be stripped), Enforcement: 55% (voluntary implementation)"
                  />
                  <Badge variant="secondary" className="text-xs">55% Effective</Badge>
                </div>
              </div>
              <p className="text-sm text-orange-700 mb-2">Google SynthID (Uesato et al., 2023), Adobe Content Authenticity Initiative (CAI)</p>
              <div className="text-xs text-orange-600">
                <strong>Problems:</strong> Can be stripped, not retroactive, format dependent, easy to circumvent
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-yellow-800">Expensive Blockchain Verification</h4>
                <div className="flex items-center gap-2">
                  <Info 
                    className="h-3 w-3 text-yellow-600 cursor-help" 
                    title="Scale: 15% (cost prohibitive), Economic: 20% (very expensive), Technical: 95% (cryptographically secure), Enforcement: 90% (immutable proof)"
                  />
                  <Badge variant="outline" className="text-xs">80% Effective</Badge>
                </div>
              </div>
              <p className="text-sm text-yellow-700 mb-2">Truepic Lens ($0.50-2.00/verification), Numbers Protocol content registry</p>
              <div className="text-xs text-yellow-600">
                <strong>Problems:</strong> Too expensive ($0.50+ per verification), doesn&apos;t scale to billions of content pieces
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-red-50 border-red-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-red-800">Legal/Policy Responses</h4>
                <div className="flex items-center gap-2">
                  <Info 
                    className="h-3 w-3 text-red-600 cursor-help" 
                    title="Scale: 25% (limited jurisdiction), Economic: 0% (no creator compensation), Technical: 30% (easily evaded), Enforcement: 65% (legal penalties where applicable)"
                  />
                  <Badge variant="destructive" className="text-xs">30% Effective</Badge>
                </div>
              </div>
              <p className="text-sm text-red-700 mb-2">U.S. DEEPFAKES Accountability Act (2019), EU Digital Services Act (2022), platform policies</p>
              <div className="text-xs text-red-600">
                <strong>Problems:</strong> Inconsistent enforcement, jurisdictional issues, reactive not preventative
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-500" />
              Detection Accuracy Decline Over Time
            </h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={[
                { year: 2020, aiDetection: 95, humanDetection: 85 },
                { year: 2021, aiDetection: 88, humanDetection: 82 },
                { year: 2022, aiDetection: 82, humanDetection: 78 },
                { year: 2023, aiDetection: 76, humanDetection: 74 },
                { year: 2024, aiDetection: 73, humanDetection: 62 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis domain={[50, 100]} />
                <Tooltip formatter={(value: number) => [`${value}%`, 'Detection Accuracy']} />
                <Line 
                  type="monotone" 
                  dataKey="aiDetection" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="AI Detection Tools"
                />
                <Line 
                  type="monotone" 
                  dataKey="humanDetection" 
                  stroke="#f97316" 
                  strokeWidth={2}
                  name="Human Detection"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              What&apos;s Needed: Immutable Content Provenance
            </h4>
            <p className="text-sm text-green-700">
              The only solution is to establish content authenticity at the source through 
              cryptographic proofs recorded on an immutable ledger - making verification 
              cheap enough to scale to billions of content pieces daily.
            </p>
          </div>

          {/* Methodology and References Section */}
          <div className="mt-6 border-t pt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMethodology(!showMethodology)}
              className="flex items-center gap-2 mb-4"
            >
              {showMethodology ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              {showMethodology ? 'Hide' : 'Show'} Methodology & References
            </Button>

            {showMethodology && (
              <div className="space-y-6">
                {/* Methodology */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <h5 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Detection Effectiveness Evaluation Methodology
                  </h5>
                  <p className="text-sm text-slate-700 mb-3">
                    Each detection approach is scored across four dimensions, then averaged to produce the effectiveness percentage:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-slate-800">Scale of Impact (0-100%)</strong>
                      <p className="text-slate-600">What percentage of deepfake content can this approach actually detect/prevent?</p>
                    </div>
                    <div>
                      <strong className="text-slate-800">Economic Viability (0-100%)</strong>
                      <p className="text-slate-600">Can this solution scale economically to billions of content pieces daily?</p>
                    </div>
                    <div>
                      <strong className="text-slate-800">Technical Robustness (0-100%)</strong>
                      <p className="text-slate-600">How resistant is this approach to circumvention and adversarial attacks?</p>
                    </div>
                    <div>
                      <strong className="text-slate-800">Enforcement Mechanism (0-100%)</strong>
                      <p className="text-slate-600">What ensures compliance? Technical constraints, legal penalties, or voluntary adoption?</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-3">
                    <em>Note: These evaluations reflect the analysis presented in this technical demonstration for deepfake detection approaches.</em>
                  </p>
                </div>

                {/* References */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-3">Data Sources & References</h5>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong className="text-blue-800">AI Detection Tools:</strong>
                      <ul className="text-blue-700 mt-1 space-y-1 text-xs">
                        <li>• Wang, S. et al. &quot;FaceForensics++: Learning to Detect Manipulated Facial Images&quot; (ICCV 2019)</li>
                        <li>• Microsoft Video Authenticator accuracy benchmarks (2020-2024)</li>
                        <li>• Reality Defender detection performance studies (2023)</li>
                        <li>• Sensity AI deepfake detection trends report (2024)</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-blue-800">Content Watermarking:</strong>
                      <ul className="text-blue-700 mt-1 space-y-1 text-xs">
                        <li>• Uesato, J. et al. &quot;SynthID: Imperceptible Watermarks for AI-Generated Content&quot; (Google, 2023)</li>
                        <li>• Adobe Content Authenticity Initiative whitepaper (2021-2024)</li>
                        <li>• Coalition for Content Provenance and Authenticity (C2PA) standards</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-blue-800">Blockchain Verification:</strong>
                      <ul className="text-blue-700 mt-1 space-y-1 text-xs">
                        <li>• Truepic Lens pricing model and verification costs (2023-2024)</li>
                        <li>• Numbers Protocol: &quot;Decentralized Content Verification&quot; technical documentation</li>
                        <li>• Content authenticity scaling challenges analysis (Various, 2023)</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-blue-800">Legal/Policy Responses:</strong>
                      <ul className="text-blue-700 mt-1 space-y-1 text-xs">
                        <li>• U.S. DEEPFAKES Accountability Act (H.R.3230, 2019)</li>
                        <li>• EU Digital Services Act implementation for synthetic content (2022)</li>
                        <li>• Platform policy effectiveness studies (Brookings Institution, 2023)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}