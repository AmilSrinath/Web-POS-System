import type React from "react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"

export default function DashboardLayout({
																						children,
																				}: {
		children: React.ReactNode
}) {
		return (
				<div className="flex min-h-screen flex-col">
						<header className="sticky top-0 z-50 border-b bg-background">
								<div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
										<div className="mr-4 flex items-center md:mr-6">
												<span className="text-xl font-semibold">BusinessPOS</span>
										</div>
										<MainNav className="mx-6 hidden md:flex" />
										<div className="ml-auto flex items-center space-x-4">
												<UserNav />
										</div>
								</div>
						</header>
						<main className="flex-1">{children}</main>
				</div>
		)
}
