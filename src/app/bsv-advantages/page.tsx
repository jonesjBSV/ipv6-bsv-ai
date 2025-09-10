import { BSVDashboard } from "@/components/bsv-dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BSVAdvantagesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Why BSV Specifically</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Unlike other blockchains, BSV aligns with the original Bitcoin system design: 
          high-throughput, low-cost, global-scale P2P transactions. It&apos;s not about speculation 
          or artificial scarcity — it&apos;s about utility and infrastructure.
        </p>
      </div>

      <div className="space-y-8">
        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20">
          <CardHeader>
            <CardTitle className="text-orange-500">Original Bitcoin System Design</CardTitle>
            <CardDescription>
              BSV maintains the foundational principles of Satoshi&apos;s white paper
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              BSV uniquely supports billions of daily transactions with negligible fees, 
              enabling micropayments and notarization for all AI-generated and human-generated data.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-background/50 rounded-lg p-4">
                <h4 className="font-semibold">Not Speculation</h4>
                <p className="text-sm text-muted-foreground">About utility and infrastructure</p>
                <Badge variant="outline" className="mt-2 text-xs">Utility-focused</Badge>
              </div>
              <div className="bg-background/50 rounded-lg p-4">
                <h4 className="font-semibold">Unlimited Throughput</h4>
                <p className="text-sm text-muted-foreground">Billions of daily transactions</p>
                <Badge variant="outline" className="mt-2 text-xs">Scales globally</Badge>
              </div>
              <div className="bg-background/50 rounded-lg p-4">
                <h4 className="font-semibold">Negligible Fees</h4>
                <p className="text-sm text-muted-foreground">Enabling micropayments</p>
                <Badge variant="outline" className="mt-2 text-xs">Fractions of cents</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Complete BSV Dashboard */}
        <Card>
          <CardHeader>
            <CardTitle>Live BSV Network Status</CardTitle>
            <CardDescription>
              Real-time blockchain metrics demonstrating BSV&apos;s capabilities for AI applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BSVDashboard />
          </CardContent>
        </Card>

        {/* AI Use Case Summary */}
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/20 mx-auto flex items-center justify-center">
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2">Perfect for AI Applications</h3>
                <p className="text-lg text-foreground max-w-3xl mx-auto">
                  BSV enables profitable AI API calls at $0.0005 per inference, 
                  ultra-low fees perfect for high-frequency IoT data exchanges, 
                  IPv6 compatibility for direct P2P communication, 
                  SPV verification for lightweight blockchain interaction, 
                  and instant confirmation for AI model payments and data trades.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}