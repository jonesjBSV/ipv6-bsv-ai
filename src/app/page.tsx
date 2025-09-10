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
      <div className="mb-8 sm:mb-12 text-center px-4 sm:px-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          AI requires Blockchain requires IPv6
        </h1>
        <p className="text-sm sm:text-base lg:text-xl text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
          An interactive exploration of the interdependent technologies that will shape 
          sustainable AI development and preserve trust in our digital future.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-4">
            <Badge variant="outline" className="text-sm sm:text-base lg:text-lg px-3 sm:px-4 py-1 sm:py-2">AI</Badge>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-muted-foreground" />
            <Badge variant="outline" className="text-sm sm:text-base lg:text-lg px-3 sm:px-4 py-1 sm:py-2">Blockchain</Badge>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-muted-foreground rotate-90 sm:rotate-0" />
            <Badge variant="outline" className="text-sm sm:text-base lg:text-lg px-3 sm:px-4 py-1 sm:py-2">IPv6</Badge>
          </div>
        </div>
        <Button size="lg" asChild className="min-h-[48px] px-6 text-base">
          <Link href="/introduction">
            Start Presentation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.href} className="hover:shadow-lg transition-shadow touch-manipulation">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  <Badge 
                    variant={
                      section.status === "Problem" ? "destructive" :
                      section.status === "Solution" ? "default" :
                      section.status === "Analysis" ? "outline" :
                      "secondary"
                    }
                    className="text-xs sm:text-sm"
                  >
                    {section.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg sm:text-xl leading-tight">{section.title}</CardTitle>
                <CardDescription className="text-sm sm:text-base leading-relaxed">{section.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <Button className="w-full min-h-[44px] text-sm sm:text-base" variant="outline" asChild>
                  <Link href={section.href}>
                    View Section
                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="bg-card rounded-lg p-4 sm:p-6 lg:p-8 text-center">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4">Interactive Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm sm:text-base text-muted-foreground">
          <div className="bg-background rounded-lg p-3 sm:p-4">
            <h3 className="font-semibold text-foreground text-sm sm:text-base">Live BSV Data</h3>
            <p className="text-xs sm:text-sm">Real-time blockchain transactions and comparisons</p>
          </div>
          <div className="bg-background rounded-lg p-3 sm:p-4">
            <h3 className="font-semibold text-foreground text-sm sm:text-base">Data Visualizations</h3>
            <p className="text-xs sm:text-sm">Interactive charts and metrics supporting the thesis</p>
          </div>
          <div className="bg-background rounded-lg p-3 sm:p-4 sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-foreground text-sm sm:text-base">Network Demonstrations</h3>
            <p className="text-xs sm:text-sm">IPv6 adoption maps and P2P topology examples</p>
          </div>
        </div>
      </div>
    </div>
  );
}
