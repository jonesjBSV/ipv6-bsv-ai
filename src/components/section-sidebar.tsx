"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
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
  { href: "/", title: "Overview", icon: Home },
  { href: "/introduction", title: "Introduction", icon: Lightbulb },
  { href: "/data-exploitation", title: "Data Exploitation", icon: UserX },
  { href: "/trust-crisis", title: "Trust Crisis", icon: ShieldX },
  { href: "/blockchain-solution", title: "Blockchain Solution", icon: LinkIcon },
  { href: "/bsv-advantages", title: "BSV Advantages", icon: Bitcoin },
  { href: "/ipv6-layer", title: "IPv6 Layer", icon: Network },
  { href: "/conclusion", title: "Conclusion", icon: Target },
]

export default function SectionSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 bg-card border-r overflow-y-auto z-40">
      <div className="p-4">
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
                </Link>
              </Button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}