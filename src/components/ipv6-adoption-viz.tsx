"use client"

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Globe, Network, Wifi, TrendingUp, Router, Shield } from "lucide-react";
import { getIPv6Statistics, formatIPv6AdoptionData, type IPv6Stats } from "@/lib/data-sources";

export default function IPv6AdoptionVisualization() {
  const [stats, setStats] = useState<IPv6Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getIPv6Statistics();
        setStats(data);
      } catch (error) {
        console.error('Failed to load IPv6 stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading || !stats) {
    return <div className="animate-pulse space-y-4">Loading IPv6 adoption data...</div>;
  }

  const countryData = formatIPv6AdoptionData(stats);
  const topCountries = countryData
    .sort((a, b) => b.adoption - a.adoption)
    .slice(0, 8);

  const adoptionLevels = [
    { level: "High (>50%)", count: countryData.filter(c => c.adoption > 50).length, color: "#10b981" },
    { level: "Medium (30-50%)", count: countryData.filter(c => c.adoption >= 30 && c.adoption <= 50).length, color: "#f59e0b" },
    { level: "Low (<30%)", count: countryData.filter(c => c.adoption < 30).length, color: "#ef4444" }
  ];

  const natLimitations = [
    { aspect: "Direct Communication", withNAT: 15, withIPv6: 95 },
    { aspect: "P2P Efficiency", withNAT: 25, withIPv6: 90 },
    { aspect: "IoT Scalability", withNAT: 35, withIPv6: 100 },
    { aspect: "Blockchain P2P", withNAT: 20, withIPv6: 85 },
    { aspect: "Edge Computing", withNAT: 30, withIPv6: 95 }
  ];

  return (
    <div className="space-y-8">
      {/* Global IPv6 Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Global Adoption</CardTitle>
              <Globe className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {stats.globalAdoption.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Worldwide IPv6 deployment
            </p>
            <Badge variant="default" className="mt-2 text-xs">
              Growing steadily
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Google Traffic</CardTitle>
              <Network className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">
              {stats.googleTraffic.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Via IPv6 protocol
            </p>
            <Badge variant="secondary" className="mt-2 text-xs">
              Real usage metric
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">
              +{stats.growth.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Year-over-year growth
            </p>
            <Badge variant="secondary" className="mt-2 text-xs">
              Accelerating
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Address Space</CardTitle>
              <Router className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-500">
              2¹²⁸
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Unique addresses available
            </p>
            <Badge variant="secondary" className="mt-2 text-xs">
              Virtually unlimited
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Country Adoption Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            IPv6 Adoption by Country
          </CardTitle>
          <CardDescription>
            Leading countries demonstrating the path to true peer-to-peer communication
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={topCountries} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="country" 
                className="text-muted-foreground"
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                domain={[0, 80]} 
                className="text-muted-foreground"
                label={{ value: 'Adoption %', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                formatter={(value: any) => [`${value}%`, 'IPv6 Adoption']}
              />
              <Bar 
                dataKey="adoption" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* NAT vs IPv6 Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            NAT Limitations vs IPv6 Capabilities
          </CardTitle>
          <CardDescription>
            How IPv6 enables true peer-to-peer communication without bottlenecks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {natLimitations.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">{item.aspect}</span>
                  <div className="flex gap-4 text-sm">
                    <span className="text-destructive">NAT: {item.withNAT}%</span>
                    <span className="text-green-500">IPv6: {item.withIPv6}%</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground mb-1">With NAT/IPv4</div>
                    <Progress value={item.withNAT} className="h-2" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground mb-1">With IPv6</div>
                    <Progress value={item.withIPv6} className="h-2 bg-green-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Network Architecture Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20">
          <CardHeader>
            <CardTitle className="text-red-500 flex items-center gap-2">
              <Router className="h-5 w-5" />
              IPv4 + NAT Limitations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                <span className="text-sm">Address exhaustion (4.3B addresses)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                <span className="text-sm">NAT creates communication bottlenecks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                <span className="text-sm">Complex port forwarding required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                <span className="text-sm">P2P connections often fail</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                <span className="text-sm">IoT scaling severely limited</span>
              </div>
            </div>
            <div className="pt-2">
              <Badge variant="destructive" className="text-xs">
                Blockchain P2P requires workarounds
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
          <CardHeader>
            <CardTitle className="text-green-500 flex items-center gap-2">
              <Network className="h-5 w-5" />
              IPv6 Advantages
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">340 undecillion unique addresses</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Direct device-to-device communication</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">No NAT translation overhead</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Native P2P connectivity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Unlimited IoT device scaling</span>
              </div>
            </div>
            <div className="pt-2">
              <Badge variant="default" className="text-xs">
                Perfect for blockchain P2P networks
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* The Network Foundation */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-primary/20 mx-auto flex items-center justify-center">
              <Network className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary mb-2">The Network Foundation</h3>
              <p className="text-lg text-foreground max-w-3xl mx-auto">
                Blockchain can't be fully peer-to-peer without the networking layer. 
                IPv6 enables direct communication between every device, AI agent, and blockchain node 
                without centralized bottlenecks.
              </p>
            </div>
            <div className="flex justify-center gap-4 pt-4">
              <Badge variant="outline" className="text-sm px-4 py-2">
                Local protocols: Bluetooth, NFC, QR
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-2">
                Global reach: Internet connectivity
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}