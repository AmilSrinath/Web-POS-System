import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Package2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Sidebar() {
  return (
    <div className="flex h-full w-full flex-col border-r border-[#27374D] bg-[#0B192C]">
      <div className="flex h-16 items-center border-b border-[#27374D] px-6">
        <div className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#50577A]">
            <Package2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg text-white">SuperPOS</span>
        </div>
        <div className="ml-auto">
          <ModeToggle />
        </div>
      </div>
      <div className="flex-1 overflow-auto py-4 px-4">
        <MainNav />
      </div>
      <div className="border-t border-[#27374D] p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start p-2 hover:bg-[#27374D]">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-[#50577A]/20 text-white">JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-sm">
                <span className="font-medium text-white">John Doe</span>
                <span className="text-xs text-gray-400">Admin</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#27374D] border-[#50577A]/30 text-white">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#50577A]/30" />
            <DropdownMenuItem className="hover:bg-[#50577A]/20 focus:bg-[#50577A]/20">Profile</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#50577A]/20 focus:bg-[#50577A]/20">Settings</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#50577A]/30" />
            <DropdownMenuItem className="hover:bg-[#50577A]/20 focus:bg-[#50577A]/20">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
