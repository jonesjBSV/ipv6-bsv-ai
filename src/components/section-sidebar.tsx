"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { 
  Home, 
  Lightbulb, 
  UserX, 
  ShieldX, 
  Link as LinkIcon, 
  Bitcoin, 
  Network, 
  Target 
} from "lucide-react"

const sections = [
  { href: "/", title: "Overview", icon: Home, badge: "Start" },
  { href: "/introduction", title: "Introduction", icon: Lightbulb, badge: "1" },
  { href: "/data-exploitation", title: "Data Exploitation", icon: UserX, badge: "2" },
  { href: "/trust-crisis", title: "Trust Crisis", icon: ShieldX, badge: "3" },
  { href: "/blockchain-solution", title: "Blockchain Solution", icon: LinkIcon, badge: "4" },
  { href: "/bsv-advantages", title: "BSV Advantages", icon: Bitcoin, badge: "5" },
  { href: "/ipv6-layer", title: "IPv6 Layer", icon: Network, badge: "6" },
  { href: "/conclusion", title: "Conclusion", icon: Target, badge: "7" },
]

export default function SectionSidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed left-0 top-16 bottom-0 w-64 bg-card border-r overflow-y-auto">
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-4">Presentation Sections</h2>
        <nav className="space-y-2">
          {sections.map((section) => {
            const Icon = section.icon
            const isActive = pathname === section.href
            
            return (
              <Button
                key={section.href}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-primary text-primary-foreground"
                )}
                asChild
              >
                <Link href={section.href}>
                  <Icon className="h-4 w-4 mr-3" />
                  <span className="flex-1 text-left">{section.title}</span>
                  <Badge 
                    variant={isActive ? "secondary" : "outline"}
                    className="ml-2"
                  >
                    {section.badge}
                  </Badge>
                </Link>
              </Button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}