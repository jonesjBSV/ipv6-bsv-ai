"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { AlertCircle, Globe, Shield, Cpu, Network, Database, Zap } from "lucide-react";

const sampleData = {
  adoption: [
    { name: "IPv4", value: 85, color: "#8884d8" },
    { name: "IPv6", value: 15, color: "#82ca9d" },
  ],
  blockchain: [
    { month: "Jan", transactions: 400, nodes: 240 },
    { month: "Feb", transactions: 300, nodes: 198 },
    { month: "Mar", transactions: 200, nodes: 300 },
    { month: "Apr", transactions: 278, nodes: 308 },
    { month: "May", transactions: 189, nodes: 400 },
  ],
  ai: [
    { category: "Data Processing", efficiency: 78 },
    { category: "Network Security", efficiency: 85 },
    { category: "Resource Management", efficiency: 92 },
    { category: "Protocol Optimization", efficiency: 67 },
  ],
};

const chartConfig = {
  adoption: {
    label: "Network Adoption",
  },
  blockchain: {
    label: "Blockchain Metrics",
  },
  ai: {
    label: "AI Efficiency",
  },
};

export default function PresentationDashboard() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <Badge variant="outline" className="text-lg px-4 py-2">
            Technical Presentation
          </Badge>
          <h1 className="text-4xl font-bold text-foreground">
            AI requires Blockchain requires IPv6
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Exploring the interdependent technologies shaping our digital future
          </p>
        </div>

        <Separator />

        {/* Navigation Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ipv6">IPv6 Foundation</TabsTrigger>
            <TabsTrigger value="blockchain">Blockchain Layer</TabsTrigger>
            <TabsTrigger value="ai">AI Applications</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">IPv6 Adoption</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15.2%</div>
                  <Progress value={15.2} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Global IPv6 deployment progress
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blockchain Nodes</CardTitle>
                  <Network className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,847</div>
                  <Progress value={78} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Active network participants
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Efficiency</CardTitle>
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89.3%</div>
                  <Progress value={89.3} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Processing optimization gain
                  </p>
                </CardContent>
              </Card>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                The synergy between these technologies creates exponential improvements in network 
                efficiency, security, and scalability.
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* IPv6 Tab */}
          <TabsContent value="ipv6" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  IPv6 Adoption Trends
                </CardTitle>
                <CardDescription>
                  Network protocol evolution and adoption rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sampleData.adoption}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {sampleData.adoption.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blockchain Tab */}
          <TabsContent value="blockchain" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Blockchain Network Metrics
                </CardTitle>
                <CardDescription>
                  Transaction volume and node distribution over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sampleData.blockchain}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="transactions" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                      <Line type="monotone" dataKey="nodes" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Tab */}
          <TabsContent value="ai" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  AI Performance Metrics
                </CardTitle>
                <CardDescription>
                  Efficiency gains across different AI application domains
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sampleData.ai}>
                      <XAxis dataKey="category" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="efficiency" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button size="lg">
            <Database className="mr-2 h-4 w-4" />
            Explore Data
          </Button>
          <Button variant="outline" size="lg">
            <Shield className="mr-2 h-4 w-4" />
            View Security
          </Button>
          <Button variant="secondary" size="lg">
            <Network className="mr-2 h-4 w-4" />
            Network Status
          </Button>
        </div>
      </div>
    </div>
  );
}