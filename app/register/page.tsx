"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
		const router = useRouter()
		const [businessName, setBusinessName] = useState("")
		const [email, setEmail] = useState("")
		const [password, setPassword] = useState("")
		const [confirmPassword, setConfirmPassword] = useState("")
		const [isLoading, setIsLoading] = useState(false)

		const handleSubmit = async (e: React.FormEvent) => {
				e.preventDefault()
				setIsLoading(true)

				// In a real app, you would register with your backend here
				// For demo purposes, we'll just redirect to the dashboard
				setTimeout(() => {
						router.push("/dashboard")
						setIsLoading(false)
				}, 1000)
		}

		return (
				<div className="flex min-h-screen items-center justify-center px-4 py-12">
						<Card className="w-full max-w-md">
								<CardHeader className="space-y-1">
										<CardTitle className="text-2xl font-bold">Create an account</CardTitle>
										<CardDescription>Enter your information to get started</CardDescription>
								</CardHeader>
								<form onSubmit={handleSubmit}>
										<CardContent className="space-y-4">
												<div className="space-y-2">
														<Label htmlFor="business-name">Business Name</Label>
														<Input
																id="business-name"
																placeholder="Your Business Name"
																value={businessName}
																onChange={(e) => setBusinessName(e.target.value)}
																required
														/>
												</div>
												<div className="space-y-2">
														<Label htmlFor="email">Email</Label>
														<Input
																id="email"
																type="email"
																placeholder="m@example.com"
																value={email}
																onChange={(e) => setEmail(e.target.value)}
																required
														/>
												</div>
												<div className="space-y-2">
														<Label htmlFor="password">Password</Label>
														<Input
																id="password"
																type="password"
																value={password}
																onChange={(e) => setPassword(e.target.value)}
																required
														/>
												</div>
												<div className="space-y-2">
														<Label htmlFor="confirm-password">Confirm Password</Label>
														<Input
																id="confirm-password"
																type="password"
																value={confirmPassword}
																onChange={(e) => setConfirmPassword(e.target.value)}
																required
														/>
												</div>
										</CardContent>
										<CardFooter className="flex flex-col">
												<Button type="submit" className="w-full" disabled={isLoading}>
														{isLoading ? "Creating account..." : "Create account"}
												</Button>
												<p className="mt-4 text-center text-sm text-muted-foreground">
														Already have an account?{" "}
														<Link href="/login" className="text-primary underline-offset-4 hover:underline">
																Login
														</Link>
												</p>
										</CardFooter>
								</form>
						</Card>
				</div>
		)
}
