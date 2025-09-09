"use client"

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Eye, Shield, TrendingDown, Users } from "lucide-react";
import { getDeepfakeMetrics, formatTrustDeclineData, type DeepfakeMetrics } from "@/lib/data-sources";

export default function TrustCrisisVisualization() {
  const [metrics, setMetrics] = useState<DeepfakeMetrics | null>(null);
  const [loading, setLoading] = useState(true);

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

  const trustDeclineData = formatTrustDeclineData(metrics);
  
  
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
            <LineChart data={trustDeclineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="year" className="text-muted-foreground" />
              <YAxis 
                domain={[0, 100]} 
                className="text-muted-foreground" 
                label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                formatter={(value: number) => [`${value}%`, '']}
              />
              <Line
                type="monotone"
                dataKey="trust"
                stroke="hsl(var(--destructive))"
                strokeWidth={3}
                name="Public Trust in Digital Content"
                dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2, r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="detection"
                stroke="hsl(var(--chart-3))"
                strokeWidth={3}
                name="AI Detection Accuracy"
                dot={{ fill: 'hsl(var(--chart-3))', strokeWidth: 2, r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="human"
                stroke="hsl(var(--chart-4))"
                strokeWidth={3}
                name="Human Detection Ability"
                dot={{ fill: 'hsl(var(--chart-4))', strokeWidth: 2, r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
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
    </div>
  );
}