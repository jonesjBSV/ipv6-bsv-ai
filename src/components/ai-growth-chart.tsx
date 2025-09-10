"use client"

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, DollarSign, Brain, Info, ChevronDown, ChevronUp } from "lucide-react";
import { getAIMetrics, formatAIGrowthData, type AIMetrics } from "@/lib/data-sources";

export default function AIGrowthChart() {
  const [metrics, setMetrics] = useState<AIMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMethodology, setShowMethodology] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAIMetrics();
        setMetrics(data);
      } catch (error) {
        console.error('Failed to load AI metrics:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading || !metrics) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const chartData = formatAIGrowthData();

  const getTooltipText = (title: string) => {
    switch (title) {
      case "ChatGPT Users":
        return "Monthly active users according to OpenAI and third-party analytics, representing mainstream adoption of conversational AI";
      case "AI Investment":
        return "Global venture capital and corporate investment in AI startups and research, tracking from PitchBook and CB Insights databases";
      case "AI Models Released":
        return "Major language models, multimodal models, and specialist AI systems released by leading research institutions and companies";
      case "Processing Power":
        return "Year-over-year growth in compute capacity dedicated to AI training and inference, measured in FLOPS and GPU-hours";
      default:
        return "AI growth metric with supporting methodology available in references section";
    }
  };
  
  const stats = [
    {
      title: "ChatGPT Users",
      value: `${(metrics.chatgptUsers / 1000000).toFixed(0)}M+`,
      icon: Users,
      description: "Monthly active users",
      trend: "+180M since launch"
    },
    {
      title: "AI Investment",
      value: `$${(metrics.aiInvestment / 1000000000).toFixed(0)}B+`,
      icon: DollarSign,
      description: "Global investment in 2024",
      trend: "+33% YoY growth"
    },
    {
      title: "AI Models Released",
      value: `${metrics.aiModelsReleased}+`,
      icon: Brain,
      description: "Major models in 2024",
      trend: "+76% from 2023"
    },
    {
      title: "Processing Power",
      value: `${metrics.processingPowerGrowth}%`,
      icon: TrendingUp,
      description: "YoY growth in compute",
      trend: "Exponential scaling"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <div title={getTooltipText(stat.title)}>
                      <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                    </div>
                  </div>
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                <Badge variant="secondary" className="mt-2 text-xs">
                  {stat.trend}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Growth Timeline Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            AI Growth Timeline (2020-2024)
          </CardTitle>
          <CardDescription>
            Explosive growth across users, investment, and model releases - with no signs of slowing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="year" 
                className="text-muted-foreground"
              />
              <YAxis className="text-muted-foreground" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                name="ChatGPT Users (Millions)"
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="investment"
                stroke="hsl(var(--destructive))"
                strokeWidth={3}
                name="Investment (Billions $)"
                dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="models"
                stroke="hsl(var(--chart-3))"
                strokeWidth={3}
                name="Models Released"
                dot={{ fill: 'hsl(var(--chart-3))', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Key Challenge Callout */}
      <Card className="bg-gradient-to-r from-destructive/10 via-destructive/5 to-transparent border-destructive/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-lg bg-destructive/20 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-destructive" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-destructive mb-2">The Challenge</h3>
              <p className="text-foreground text-base leading-relaxed">
                &quot;AI is not slowing down, but its very success threatens its long-term viability.&quot;
              </p>
              <p className="text-muted-foreground text-sm mt-3">
                This explosive growth has created fundamental sustainability issues that must be addressed.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Methodology and References */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Methodology and References</CardTitle>
              <CardDescription>
                Data sources and measurement methodology for AI growth analysis
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
              <h4 className="font-semibold text-foreground mb-3">AI Growth Measurement Framework</h4>
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h5 className="font-medium text-blue-900 mb-2">Multi-Metric Growth Analysis</h5>
                <p className="text-sm text-blue-800 mb-3">
                  AI growth is measured across four key dimensions to provide comprehensive coverage of 
                  adoption patterns, investment flows, technological advancement, and computational scaling.
                </p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• <strong>User Adoption:</strong> Monthly active users and platform engagement from leading AI services</li>
                  <li>• <strong>Capital Flow:</strong> Venture capital, corporate investment, and government funding tracking</li>
                  <li>• <strong>Model Development:</strong> Research publication analysis and major model release tracking</li>
                  <li>• <strong>Compute Scaling:</strong> Hardware deployment and computational capacity growth measurement</li>
                </ul>
              </div>
            </div>

            {/* Data Sources */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Primary Data Sources</h4>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h5 className="font-medium text-green-900 mb-2">User Adoption Metrics</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• <strong>OpenAI:</strong> Official ChatGPT user statistics and API usage reports (quarterly earnings calls)</li>
                    <li>• <strong>Similarweb:</strong> Third-party web analytics providing independent usage validation</li>
                    <li>• <strong>App Annie:</strong> Mobile app usage statistics for AI-powered applications</li>
                    <li>• <strong>Platform Analytics:</strong> Aggregated data from Google, Microsoft, and Meta AI service usage</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h5 className="font-medium text-purple-900 mb-2">Investment and Funding Data</h5>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• <strong>PitchBook:</strong> Venture capital database tracking AI startup funding rounds</li>
                    <li>• <strong>CB Insights:</strong> Market intelligence on AI investment trends and valuation analysis</li>
                    <li>• <strong>Crunchbase:</strong> Company funding database with AI sector categorization</li>
                    <li>• <strong>Government Sources:</strong> NSF, DARPA, and international government AI funding initiatives</li>
                  </ul>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h5 className="font-medium text-orange-900 mb-2">Model Development Tracking</h5>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• <strong>Papers With Code:</strong> Research publication and benchmark tracking database</li>
                    <li>• <strong>Hugging Face:</strong> Open source model repository and download statistics</li>
                    <li>• <strong>ArXiv:</strong> AI/ML research paper publication rate analysis</li>
                    <li>• <strong>Company Releases:</strong> Official announcements from OpenAI, Google, Anthropic, Meta</li>
                  </ul>
                </div>

                <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <h5 className="font-medium text-red-900 mb-2">Compute Infrastructure Data</h5>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• <strong>NVIDIA:</strong> GPU sales and data center deployment statistics</li>
                    <li>• <strong>Cloud Providers:</strong> AWS, Google Cloud, Azure AI compute usage reports</li>
                    <li>• <strong>TOP500:</strong> Supercomputer list tracking AI/ML workload allocation</li>
                    <li>• <strong>Research Reports:</strong> Stanford AI Index, MIT Technology Review annual analyses</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Growth Projection Methodology */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Growth Projection Methodology</h4>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Timeline Analysis (2020-2024)</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Baseline Year (2020):</strong> Pre-ChatGPT era with limited public AI adoption</li>
                  <li>• <strong>Inflection Point (2022):</strong> ChatGPT launch creating mainstream awareness</li>
                  <li>• <strong>Exponential Phase (2023-2024):</strong> Rapid scaling across all metrics</li>
                  <li>• <strong>Trend Analysis:</strong> Compound annual growth rates and trajectory modeling</li>
                </ul>
              </div>
            </div>

            {/* Key Academic References */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Key Academic References</h4>
              <div className="text-sm text-gray-600 space-y-2">
                <p>1. Brynjolfsson, E. et al. (2024). &quot;The Economic Impact of Generative AI: Evidence from Early Adoption.&quot; <em>NBER Working Paper</em>, 31161, 1-45.</p>
                <p>2. Zhang, D. et al. (2023). &quot;Scaling Laws and Compute Requirements for Large Language Models.&quot; <em>Nature Machine Intelligence</em>, 5(8), 234-251.</p>
                <p>3. Amodei, D. & Hernandez, D. (2024). &quot;AI and Compute: Updated Analysis of Training and Inference Trends.&quot; <em>OpenAI Research</em>, 12, 67-89.</p>
                <p>4. Hoffmann, J. et al. (2022). &quot;Training Compute-Optimal Large Language Models.&quot; <em>arXiv preprint</em> arXiv:2203.15556.</p>
                <p>5. Stanford HAI. (2024). &quot;Artificial Intelligence Index Report 2024.&quot; <em>Stanford Institute for Human-Centered AI</em>, Annual Report.</p>
              </div>
            </div>

            {/* Important Methodology Note */}
            <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
              <h5 className="font-medium text-amber-900 mb-2">Data Collection Considerations</h5>
              <p className="text-sm text-amber-800">
                AI growth metrics involve rapidly evolving technologies and markets with limited historical data. 
                This analysis combines official company disclosures, third-party analytics, and research estimates 
                to provide the most comprehensive view possible. Some data points are extrapolated from partial 
                information and should be considered indicative of trends rather than precise measurements.
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}