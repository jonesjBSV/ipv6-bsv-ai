"use client"

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, DollarSign, Brain } from "lucide-react";
import { getAIMetrics, formatAIGrowthData, type AIMetrics } from "@/lib/data-sources";

export default function AIGrowthChart() {
  const [metrics, setMetrics] = useState<AIMetrics | null>(null);
  const [loading, setLoading] = useState(true);

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

  const chartData = formatAIGrowthData(metrics);
  
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
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
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
    </div>
  );
}