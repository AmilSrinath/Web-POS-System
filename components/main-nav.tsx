"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, CreditCard, Home, Package, Settings, ShoppingCart, Users } from "lucide-react"

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    name: "POS",
    href: "/pos",
    icon: ShoppingCart,
  },
  {
    name: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    name: "Credit Sales",
    href: "/dashboard/credit",
    icon: CreditCard,
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1 w-full">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all",
              isActive ? "bg-[#50577A] text-white" : "text-gray-400 hover:bg-[#27374D] hover:text-white",
            )}
          >
            <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-gray-400")} />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
