import { MicropaymentCalculator } from "@/components/micropayment-calculator";
import { SPVDemonstration } from "@/components/spv-demonstration";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function BlockchainSolutionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Proposed Solution: Blockchain as the Missing Layer</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Reference to Satoshi Nakamoto&apos;s original vision of Bitcoin: peer-to-peer electronic cash. 
          Blockchain provides two critical mechanisms for solving AI&apos;s sustainability and trust problems.
        </p>
      </div>

      <div className="space-y-8">
        <Card className="bg-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">Satoshi Nakamoto&apos;s Original Vision</CardTitle>
            <CardDescription>
              &quot;A purely peer-to-peer version of electronic cash&quot; - Bitcoin White Paper, 2008
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The original Bitcoin system design enables direct P2P transactions with cryptographic proof 
              instead of trust, allowing any two willing parties to transact directly without a trusted third party.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Micropayments & Attribution</CardTitle>
              <CardDescription>
                Automatic compensation for data contributors at scale
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li>• Every data contributor compensated automatically</li>
                <li>• No middlemen needed; payments are fractions of a cent</li>
                <li>• Real-time attribution and compensation</li>
                <li>• Transparent, verifiable payment records</li>
              </ul>
              <MicropaymentCalculator />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>2. Timestamping & Verification</CardTitle>
              <CardDescription>
                Cryptographic provenance for all content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li>• Every piece of content cryptographically notarized</li>
                <li>• Simplified Payment Verification (SPV) for fast validation</li>
                <li>• Provenance: prove who created what, and when</li>
                <li>• Immutable records of content creation</li>
              </ul>
              <SPVDemonstration />
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-green-500/10 via-green-500/5 to-transparent border-green-500/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-green-500/20 mx-auto flex items-center justify-center">
                <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-500 mb-2">The Solution in Action</h3>
                <p className="text-lg text-foreground max-w-3xl mx-auto">
                  Blockchain technology provides the missing infrastructure for sustainable AI: 
                  <strong> automatic micropayments for data usage</strong> and 
                  <strong> cryptographic timestamping for content verification</strong>. 
                  This creates incentives for creators while establishing provenance for AI-generated content.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}