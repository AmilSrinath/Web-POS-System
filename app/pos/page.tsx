"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Minus, Plus, Search, ShoppingCart, Trash2 } from "lucide-react"

// Sample product data
const products = [
		{ id: 1, name: "T-Shirt", category: "Clothing", price: 19.99, image: "/placeholder.svg" },
		{ id: 2, name: "Coffee Mug", category: "Kitchenware", price: 12.99, image: "/placeholder.svg" },
		{ id: 3, name: "Notebook", category: "Stationery", price: 4.99, image: "/placeholder.svg" },
		{ id: 4, name: "Headphones", category: "Electronics", price: 59.99, image: "/placeholder.svg" },
		{ id: 5, name: "Water Bottle", category: "Kitchenware", price: 14.99, image: "/placeholder.svg" },
		{ id: 6, name: "Phone Case", category: "Electronics", price: 24.99, image: "/placeholder.svg" },
		{ id: 7, name: "Sunglasses", category: "Accessories", price: 29.99, image: "/placeholder.svg" },
		{ id: 8, name: "Backpack", category: "Accessories", price: 49.99, image: "/placeholder.svg" },
]

// Product categories
const categories = ["All", "Clothing", "Kitchenware", "Stationery", "Electronics", "Accessories"]

export default function POSPage() {
		const [cart, setCart] = useState<Array<{ product: (typeof products)[0]; quantity: number }>>([])
		const [searchTerm, setSearchTerm] = useState("")
		const [activeCategory, setActiveCategory] = useState("All")

		const filteredProducts = products.filter(
				(product) =>
						(activeCategory === "All" || product.category === activeCategory) &&
						product.name.toLowerCase().includes(searchTerm.toLowerCase()),
		)

		const addToCart = (product: (typeof products)[0]) => {
				const existingItem = cart.find((item) => item.product.id === product.id)

				if (existingItem) {
						setCart(cart.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
				} else {
						setCart([...cart, { product, quantity: 1 }])
				}
		}

		const removeFromCart = (productId: number) => {
				setCart(cart.filter((item) => item.product.id !== productId))
		}

		const updateQuantity = (productId: number, newQuantity: number) => {
				if (newQuantity <= 0) {
						removeFromCart(productId)
						return
				}

				setCart(cart.map((item) => (item.product.id === productId ? { ...item, quantity: newQuantity } : item)))
		}

		const calculateTotal = () => {
				return cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
		}

		const handleCheckout = () => {
				alert(`Checkout completed! Total: $${calculateTotal().toFixed(2)}`)
				setCart([])
		}

		return (
				<div className="flex min-h-screen">
						<div className="flex-1 p-4 pt-6 md:p-8">
								<div className="flex items-center justify-between mb-6">
										<h2 className="text-3xl font-bold tracking-tight">Point of Sale</h2>
										<div className="relative w-64">
												<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
												<Input
														placeholder="Search products..."
														className="pl-8"
														value={searchTerm}
														onChange={(e) => setSearchTerm(e.target.value)}
												/>
										</div>
								</div>

								<Tabs defaultValue="All" className="space-y-4">
										<TabsList className="flex flex-wrap">
												{categories.map((category) => (
														<TabsTrigger key={category} value={category} onClick={() => setActiveCategory(category)}>
																{category}
														</TabsTrigger>
												))}
										</TabsList>

										{categories.map((category) => (
												<TabsContent key={category} value={category} className="space-y-4">
														<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
																{filteredProducts.map((product) => (
																		<Card
																				key={product.id}
																				className="cursor-pointer hover:bg-muted/50 transition-colors"
																				onClick={() => addToCart(product)}
																		>
																				<CardContent className="p-4">
																						<div className="aspect-square relative mb-2">
																								<img
																										src={product.image || "/placeholder.svg"}
																										alt={product.name}
																										className="object-cover w-full h-full rounded-md"
																								/>
																						</div>
																						<h3 className="font-medium">{product.name}</h3>
																						<div className="flex justify-between items-center mt-1">
																								<span className="text-sm text-muted-foreground">{product.category}</span>
																								<span className="font-medium">${product.price.toFixed(2)}</span>
																						</div>
																				</CardContent>
																		</Card>
																))}
														</div>
												</TabsContent>
										))}
								</Tabs>
						</div>

						<div className="w-96 border-l bg-muted/20 p-4">
								<Card className="h-full flex flex-col">
										<CardHeader>
												<CardTitle className="flex items-center">
														<ShoppingCart className="mr-2 h-5 w-5" />
														Current Sale
												</CardTitle>
												<CardDescription>{cart.length === 0 ? "Cart is empty" : `${cart.length} item(s) in cart`}</CardDescription>
										</CardHeader>
										<CardContent className="flex-1 overflow-auto">
												{cart.length === 0 ? (
														<div className="flex flex-col items-center justify-center h-full text-muted-foreground">
																<ShoppingCart className="h-12 w-12 mb-2" />
																<p>Add items to the cart</p>
														</div>
												) : (
														<div className="space-y-4">
																{cart.map((item) => (
																		<div key={item.product.id} className="flex items-center justify-between border-b pb-2">
																				<div className="flex items-center">
																						<img
																								src={item.product.image || "/placeholder.svg"}
																								alt={item.product.name}
																								className="w-12 h-12 rounded-md object-cover mr-3"
																						/>
																						<div>
																								<h4 className="font-medium">{item.product.name}</h4>
																								<p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
																						</div>
																				</div>
																				<div className="flex items-center">
																						<Button
																								variant="outline"
																								size="icon"
																								className="h-8 w-8"
																								onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
																						>
																								<Minus className="h-3 w-3" />
																						</Button>
																						<span className="w-8 text-center">{item.quantity}</span>
																						<Button
																								variant="outline"
																								size="icon"
																								className="h-8 w-8"
																								onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
																						>
																								<Plus className="h-3 w-3" />
																						</Button>
																						<Button
																								variant="ghost"
																								size="icon"
																								className="h-8 w-8 ml-2"
																								onClick={() => removeFromCart(item.product.id)}
																						>
																								<Trash2 className="h-4 w-4" />
																						</Button>
																				</div>
																		</div>
																))}
														</div>
												)}
										</CardContent>
										<CardFooter className="flex-col border-t pt-4">
												<div className="w-full space-y-1 mb-4">
														<div className="flex justify-between">
																<span>Subtotal</span>
																<span>${calculateTotal().toFixed(2)}</span>
														</div>
														<div className="flex justify-between">
																<span>Tax (10%)</span>
																<span>${(calculateTotal() * 0.1).toFixed(2)}</span>
														</div>
														<div className="flex justify-between font-bold text-lg pt-2 border-t">
																<span>Total</span>
																<span>${(calculateTotal() * 1.1).toFixed(2)}</span>
														</div>
												</div>
												<Button className="w-full" size="lg" disabled={cart.length === 0} onClick={handleCheckout}>
														<CreditCard className="mr-2 h-4 w-4" />
														Checkout
												</Button>
										</CardFooter>
								</Card>
						</div>
				</div>
		)
}
