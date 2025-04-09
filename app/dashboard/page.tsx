import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, DollarSign, Package, ShoppingCart, Users } from "lucide-react"

export default function DashboardPage() {
		return (
				<div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
						<div className="flex items-center justify-between">
								<h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
						</div>
						<Tabs defaultValue="overview" className="space-y-4">
								<TabsList>
										<TabsTrigger value="overview">Overview</TabsTrigger>
										<TabsTrigger value="analytics">Analytics</TabsTrigger>
								</TabsList>
								<TabsContent value="overview" className="space-y-4">
										<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
												<Card>
														<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
																<CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
																<DollarSign className="h-4 w-4 text-muted-foreground" />
														</CardHeader>
														<CardContent>
																<div className="text-2xl font-bold">$45,231.89</div>
																<p className="text-xs text-muted-foreground">+20.1% from last month</p>
														</CardContent>
												</Card>
												<Card>
														<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
																<CardTitle className="text-sm font-medium">Sales</CardTitle>
																<ShoppingCart className="h-4 w-4 text-muted-foreground" />
														</CardHeader>
														<CardContent>
																<div className="text-2xl font-bold">+573</div>
																<p className="text-xs text-muted-foreground">+12.4% from last month</p>
														</CardContent>
												</Card>
												<Card>
														<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
																<CardTitle className="text-sm font-medium">Products</CardTitle>
																<Package className="h-4 w-4 text-muted-foreground" />
														</CardHeader>
														<CardContent>
																<div className="text-2xl font-bold">128</div>
																<p className="text-xs text-muted-foreground">+4 new products added</p>
														</CardContent>
												</Card>
												<Card>
														<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
																<CardTitle className="text-sm font-medium">Customers</CardTitle>
																<Users className="h-4 w-4 text-muted-foreground" />
														</CardHeader>
														<CardContent>
																<div className="text-2xl font-bold">+2350</div>
																<p className="text-xs text-muted-foreground">+10.1% from last month</p>
														</CardContent>
												</Card>
										</div>
										<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
												<Card className="col-span-4">
														<CardHeader>
																<CardTitle>Sales Overview</CardTitle>
																<CardDescription>View your sales performance over time</CardDescription>
														</CardHeader>
														<CardContent className="pl-2">
																<div className="h-[200px] w-full flex items-center justify-center">
																		<BarChart className="h-16 w-16 text-muted-foreground" />
																		<span className="ml-2 text-muted-foreground">Sales chart will appear here</span>
																</div>
														</CardContent>
												</Card>
												<Card className="col-span-3">
														<CardHeader>
																<CardTitle>Recent Sales</CardTitle>
																<CardDescription>You made 265 sales this month</CardDescription>
														</CardHeader>
														<CardContent>
																<div className="space-y-8">
																		{[1, 2, 3].map((i) => (
																				<div key={i} className="flex items-center">
																						<Avatar className="h-9 w-9">
																								<AvatarFallback>{`C${i}`}</AvatarFallback>
																						</Avatar>
																						<div className="ml-4 space-y-1">
																								<p className="text-sm font-medium leading-none">Customer {i}</p>
																								<p className="text-sm text-muted-foreground">customer{i}@example.com</p>
																						</div>
																						<div className="ml-auto font-medium">${(Math.random() * 100).toFixed(2)}</div>
																				</div>
																		))}
																</div>
														</CardContent>
												</Card>
										</div>
								</TabsContent>
								<TabsContent value="analytics" className="space-y-4">
										<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
												<Card className="col-span-1">
														<CardHeader>
																<CardTitle>Sales by Category</CardTitle>
																<CardDescription>Top performing product categories</CardDescription>
														</CardHeader>
														<CardContent className="pl-2">
																<div className="h-[300px] w-full flex items-center justify-center">
																		<BarChart className="h-16 w-16 text-muted-foreground" />
																		<span className="ml-2 text-muted-foreground">Category chart will appear here</span>
																</div>
														</CardContent>
												</Card>
												<Card className="col-span-1">
														<CardHeader>
																<CardTitle>Customer Demographics</CardTitle>
																<CardDescription>Breakdown of customer segments</CardDescription>
														</CardHeader>
														<CardContent className="pl-2">
																<div className="h-[300px] w-full flex items-center justify-center">
																		<BarChart className="h-16 w-16 text-muted-foreground" />
																		<span className="ml-2 text-muted-foreground">Demographics chart will appear here</span>
																</div>
														</CardContent>
												</Card>
										</div>
								</TabsContent>
						</Tabs>
				</div>
		)
}

// Avatar component for the dashboard
function Avatar({ className, children }: { className?: string; children: React.ReactNode }) {
		return <div className={`${className} flex items-center justify-center rounded-full bg-muted`}>{children}</div>
}

function AvatarFallback({ children }: { children: React.ReactNode }) {
		return <div className="text-sm font-medium">{children}</div>
}
