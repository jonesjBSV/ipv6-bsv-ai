import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Lightbulb, UserX, ShieldX, AlertTriangle, Link as LinkIcon, Bitcoin, Network, Target } from "lucide-react";

export default function Home() {
  const sections = [
    {
      title: "Introduction",
      description: "Why This Matters - AI's explosive growth and the challenge ahead",
      icon: Lightbulb,
      href: "/introduction",
      status: "Start Here"
    },
    {
      title: "Data Exploitation",
      description: "Problem 1 - How AI companies used human data without compensation",
      icon: UserX,
      href: "/data-exploitation",
      status: "Problem"
    },
    {
      title: "Trust Crisis",
      description: "Problem 2 - Deepfakes collapsing societal trust in content",
      icon: ShieldX,
      href: "/trust-crisis",
      status: "Problem"
    },
    {
      title: "Why Current Solutions Fail",
      description: "Analysis - Examining existing approaches and their fundamental limitations",
      icon: AlertTriangle,
      href: "/competitive-solutions",
      status: "Analysis"
    },
    {
      title: "Blockchain Solution",
      description: "The Missing Layer - Satoshi's vision for micropayments and verification",
      icon: LinkIcon,
      href: "/blockchain-solution",
      status: "Solution"
    },
    {
      title: "BSV Advantages",
      description: "Why BSV - Original Bitcoin system design for global scale",
      icon: Bitcoin,
      href: "/bsv-advantages",
      status: "Technical"
    },
    {
      title: "IPv6 Layer",
      description: "Network Foundation - True peer-to-peer communication",
      icon: Network,
      href: "/ipv6-layer",
      status: "Infrastructure"
    },
    {
      title: "Conclusion",
      description: "The Three Musketeers - How AI, Blockchain, and IPv6 work together",
      icon: Target,
      href: "/conclusion",
      status: "Summary"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">
          AI requires Blockchain requires IPv6
        </h1>
        <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
          An interactive exploration of the interdependent technologies that will shape 
          sustainable AI development and preserve trust in our digital future.
        </p>
        <div className="flex justify-center items-center space-x-4 mb-8">
          <Badge variant="outline" className="text-lg px-4 py-2">AI</Badge>
          <ArrowRight className="h-6 w-6 text-muted-foreground" />
          <Badge variant="outline" className="text-lg px-4 py-2">Blockchain</Badge>
          <ArrowRight className="h-6 w-6 text-muted-foreground" />
          <Badge variant="outline" className="text-lg px-4 py-2">IPv6</Badge>
        </div>
        <Button size="lg" asChild>
          <Link href="/introduction">
            Start Presentation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.href} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Icon className="h-8 w-8 text-primary" />
                  <Badge 
                    variant={
                      section.status === "Problem" ? "destructive" :
                      section.status === "Solution" ? "default" :
                      section.status === "Analysis" ? "outline" :
                      "secondary"
                    }
                  >
                    {section.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline" asChild>
                  <Link href={section.href}>
                    View Section
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="bg-card rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Interactive Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
          <div className="bg-background rounded-lg p-4">
            <h3 className="font-semibold text-foreground">Live BSV Data</h3>
            <p>Real-time blockchain transactions and comparisons</p>
          </div>
          <div className="bg-background rounded-lg p-4">
            <h3 className="font-semibold text-foreground">Data Visualizations</h3>
            <p>Interactive charts and metrics supporting the thesis</p>
          </div>
          <div className="bg-background rounded-lg p-4">
            <h3 className="font-semibold text-foreground">Network Demonstrations</h3>
            <p>IPv6 adoption maps and P2P topology examples</p>
          </div>
        </div>
      </div>
    </div>
  );
}
