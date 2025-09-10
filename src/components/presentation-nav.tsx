"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ChevronLeft, ChevronRight, Home, Menu, Lightbulb, UserX, ShieldX, Link as LinkIcon, Bitcoin, Network, Target, AlertTriangle } from "lucide-react"

const sections = [
  { href: "/", title: "Overview", description: "AI → Blockchain → IPv6", icon: Home },
  { href: "/introduction", title: "Introduction", description: "Why This Matters", icon: Lightbulb },
  { href: "/data-exploitation", title: "Problem 1", description: "Data Exploitation", icon: UserX },
  { href: "/trust-crisis", title: "Problem 2", description: "Trust Crisis", icon: ShieldX },
  { href: "/competitive-solutions", title: "Analysis", description: "Why Solutions Fail", icon: AlertTriangle },
  { href: "/blockchain-solution", title: "Solution", description: "Blockchain Layer", icon: LinkIcon },
  { href: "/bsv-advantages", title: "BSV", description: "Why BSV Specifically", icon: Bitcoin },
  { href: "/ipv6-layer", title: "IPv6", description: "Network Foundation", icon: Network },
  { href: "/conclusion", title: "Conclusion", description: "Three Musketeers", icon: Target },
]

export default function PresentationNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const currentIndex = sections.findIndex(section => section.href === pathname)
  const progress = ((currentIndex + 1) / sections.length) * 100

  const previousSection = currentIndex > 0 ? sections[currentIndex - 1] : null
  const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden h-10 w-10"
                aria-label="Open navigation menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 pt-16">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon
                  const isActive = pathname === section.href
                  
                  return (
                    <Link
                      key={section.href}
                      href={section.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <div className="flex-1">
                        <div className="font-medium">{section.title}</div>
                        <div className="text-xs opacity-70">{section.description}</div>
                      </div>
                      {isActive && <Badge variant="secondary">Current</Badge>}
                    </Link>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo/Title */}
          <Link href="/" className="flex items-center space-x-2">
            <Home className="h-5 w-5 hidden sm:block" />
            <span className="font-bold text-sm sm:text-lg">AI → Blockchain → IPv6</span>
          </Link>

          {/* Progress - Hidden on mobile, visible on desktop */}
          <div className="hidden sm:flex flex-1 max-w-md mx-4 lg:mx-8">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {currentIndex + 1} of {sections.length}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {sections[currentIndex]?.title || "Overview"}
                </Badge>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          {/* Navigation Buttons - Optimized for mobile */}
          <div className="flex items-center gap-2">
            {previousSection && (
              <Button 
                variant="outline" 
                size="default" 
                className="h-10 px-3 sm:px-4"
                asChild
              >
                <Link href={previousSection.href}>
                  <ChevronLeft className="h-4 w-4 sm:mr-1" />
                  <span className="hidden sm:inline">Previous</span>
                </Link>
              </Button>
            )}
            {nextSection && (
              <Button 
                size="default" 
                className="h-10 px-3 sm:px-4"
                asChild
              >
                <Link href={nextSection.href}>
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-4 w-4 sm:ml-1" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}