"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Home } from "lucide-react"

const sections = [
  { href: "/", title: "Overview", description: "AI → Blockchain → IPv6" },
  { href: "/introduction", title: "Introduction", description: "Why This Matters" },
  { href: "/data-exploitation", title: "Problem 1", description: "Data Exploitation" },
  { href: "/trust-crisis", title: "Problem 2", description: "Trust Crisis" },
  { href: "/blockchain-solution", title: "Solution", description: "Blockchain Layer" },
  { href: "/bsv-advantages", title: "BSV", description: "Why BSV Specifically" },
  { href: "/ipv6-layer", title: "IPv6", description: "Network Foundation" },
  { href: "/conclusion", title: "Conclusion", description: "Three Musketeers" },
]

export default function PresentationNav() {
  const pathname = usePathname()
  const currentIndex = sections.findIndex(section => section.href === pathname)
  const progress = ((currentIndex + 1) / sections.length) * 100

  const previousSection = currentIndex > 0 ? sections[currentIndex - 1] : null
  const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <Link href="/" className="flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span className="font-bold text-lg">AI → Blockchain → IPv6</span>
          </Link>

          {/* Progress */}
          <div className="flex-1 max-w-md mx-8">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-sm text-muted-foreground">
                {currentIndex + 1} of {sections.length}
              </span>
              <Badge variant="secondary" className="text-xs">
                {sections[currentIndex]?.title || "Overview"}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-2">
            {previousSection && (
              <Button variant="outline" size="sm" asChild>
                <Link href={previousSection.href}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Link>
              </Button>
            )}
            {nextSection && (
              <Button size="sm" asChild>
                <Link href={nextSection.href}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}