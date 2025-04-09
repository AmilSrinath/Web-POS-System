"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Plus, Search, Trash2 } from "lucide-react"

// Sample inventory data
const initialInventory = [
		{ id: 1, name: "T-Shirt", category: "Clothing", price: 19.99, stock: 45, sku: "CLO-TS-001" },
		{ id: 2, name: "Coffee Mug", category: "Kitchenware", price: 12.99, stock: 32, sku: "KIT-MG-002" },
		{ id: 3, name: "Notebook", category: "Stationery", price: 4.99, stock: 120, sku: "STA-NB-003" },
		{ id: 4, name: "Headphones", category: "Electronics", price: 59.99, stock: 18, sku: "ELE-HP-004" },
		{ id: 5, name: "Water Bottle", category: "Kitchenware", price: 14.99, stock: 65, sku: "KIT-WB-005" },
]

export default function InventoryPage() {
		const [inventory, setInventory] = useState(initialInventory)
		const [searchTerm, setSearchTerm] = useState("")
		const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
		const [newItem, setNewItem] = useState({
				name: "",
				category: "",
				price: "",
				stock: "",
				sku: "",
		})

		const filteredInventory = inventory.filter(
				(item) =>
						item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
						item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
						item.sku.toLowerCase().includes(searchTerm.toLowerCase()),
		)

		const handleAddItem = () => {
				const newItemWithId = {
						id: inventory.length + 1,
						name: newItem.name,
						category: newItem.category,
						price: Number.parseFloat(newItem.price),
						stock: Number.parseInt(newItem.stock),
						sku: newItem.sku,
				}

				setInventory([...inventory, newItemWithId])
				setNewItem({ name: "", category: "", price: "", stock: "", sku: "" })
				setIsAddDialogOpen(false)
		}

		const handleDeleteItem = (id: number) => {
				setInventory(inventory.filter((item) => item.id !== id))
		}

		return (
				<div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
						<div className="flex items-center justify-between">
								<h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
								<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
										<DialogTrigger asChild>
												<Button>
														<Plus className="mr-2 h-4 w-4" />
														Add Item
												</Button>
										</DialogTrigger>
										<DialogContent>
												<DialogHeader>
														<DialogTitle>Add New Item</DialogTitle>
														<DialogDescription>Add a new item to your inventory. Click save when you're done.</DialogDescription>
												</DialogHeader>
												<div className="grid gap-4 py-4">
														<div className="grid grid-cols-4 items-center gap-4">
																<Label htmlFor="name" className="text-right">
																		Name
																</Label>
																<Input
																		id="name"
																		value={newItem.name}
																		onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
																		className="col-span-3"
																/>
														</div>
														<div className="grid grid-cols-4 items-center gap-4">
																<Label htmlFor="category" className="text-right">
																		Category
																</Label>
																<Select value={newItem.category} onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
																		<SelectTrigger className="col-span-3">
																				<SelectValue placeholder="Select category" />
																		</SelectTrigger>
																		<SelectContent>
																				<SelectItem value="Clothing">Clothing</SelectItem>
																				<SelectItem value="Electronics">Electronics</SelectItem>
																				<SelectItem value="Kitchenware">Kitchenware</SelectItem>
																				<SelectItem value="Stationery">Stationery</SelectItem>
																				<SelectItem value="Food">Food</SelectItem>
																				<SelectItem value="Other">Other</SelectItem>
																		</SelectContent>
																</Select>
														</div>
														<div className="grid grid-cols-4 items-center gap-4">
																<Label htmlFor="price" className="text-right">
																		Price
																</Label>
																<Input
																		id="price"
																		type="number"
																		step="0.01"
																		value={newItem.price}
																		onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
																		className="col-span-3"
																/>
														</div>
														<div className="grid grid-cols-4 items-center gap-4">
																<Label htmlFor="stock" className="text-right">
																		Stock
																</Label>
																<Input
																		id="stock"
																		type="number"
																		value={newItem.stock}
																		onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
																		className="col-span-3"
																/>
														</div>
														<div className="grid grid-cols-4 items-center gap-4">
																<Label htmlFor="sku" className="text-right">
																		SKU
																</Label>
																<Input
																		id="sku"
																		value={newItem.sku}
																		onChange={(e) => setNewItem({ ...newItem, sku: e.target.value })}
																		className="col-span-3"
																/>
														</div>
												</div>
												<DialogFooter>
														<Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
																Cancel
														</Button>
														<Button onClick={handleAddItem}>Save</Button>
												</DialogFooter>
										</DialogContent>
								</Dialog>
						</div>
						<Tabs defaultValue="all" className="space-y-4">
								<div className="flex items-center justify-between">
										<TabsList>
												<TabsTrigger value="all">All Items</TabsTrigger>
												<TabsTrigger value="low-stock">Low Stock</TabsTrigger>
										</TabsList>
										<div className="relative w-64">
												<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
												<Input
														placeholder="Search inventory..."
														className="pl-8"
														value={searchTerm}
														onChange={(e) => setSearchTerm(e.target.value)}
												/>
										</div>
								</div>
								<TabsContent value="all" className="space-y-4">
										<Card>
												<CardHeader>
														<CardTitle>All Inventory Items</CardTitle>
														<CardDescription>
																Manage your inventory items. You have {inventory.length} items in total.
														</CardDescription>
												</CardHeader>
												<CardContent>
														<Table>
																<TableHeader>
																		<TableRow>
																				<TableHead>Name</TableHead>
																				<TableHead>Category</TableHead>
																				<TableHead>Price</TableHead>
																				<TableHead>Stock</TableHead>
																				<TableHead>SKU</TableHead>
																				<TableHead className="text-right">Actions</TableHead>
																		</TableRow>
																</TableHeader>
																<TableBody>
																		{filteredInventory.map((item) => (
																				<TableRow key={item.id}>
																						<TableCell className="font-medium">{item.name}</TableCell>
																						<TableCell>{item.category}</TableCell>
																						<TableCell>${item.price.toFixed(2)}</TableCell>
																						<TableCell>{item.stock}</TableCell>
																						<TableCell>{item.sku}</TableCell>
																						<TableCell className="text-right">
																								<Button variant="ghost" size="icon">
																										<Edit className="h-4 w-4" />
																								</Button>
																								<Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)}>
																										<Trash2 className="h-4 w-4" />
																								</Button>
																						</TableCell>
																				</TableRow>
																		))}
																</TableBody>
														</Table>
												</CardContent>
										</Card>
								</TabsContent>
								<TabsContent value="low-stock" className="space-y-4">
										<Card>
												<CardHeader>
														<CardTitle>Low Stock Items</CardTitle>
														<CardDescription>Items that are running low and may need to be restocked soon.</CardDescription>
												</CardHeader>
												<CardContent>
														<Table>
																<TableHeader>
																		<TableRow>
																				<TableHead>Name</TableHead>
																				<TableHead>Category</TableHead>
																				<TableHead>Price</TableHead>
																				<TableHead>Stock</TableHead>
																				<TableHead>SKU</TableHead>
																				<TableHead className="text-right">Actions</TableHead>
																		</TableRow>
																</TableHeader>
																<TableBody>
																		{filteredInventory
																				.filter((item) => item.stock < 20)
																				.map((item) => (
																						<TableRow key={item.id}>
																								<TableCell className="font-medium">{item.name}</TableCell>
																								<TableCell>{item.category}</TableCell>
																								<TableCell>${item.price.toFixed(2)}</TableCell>
																								<TableCell className="text-red-500 font-medium">{item.stock}</TableCell>
																								<TableCell>{item.sku}</TableCell>
																								<TableCell className="text-right">
																										<Button variant="ghost" size="icon">
																												<Edit className="h-4 w-4" />
																										</Button>
																										<Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)}>
																												<Trash2 className="h-4 w-4" />
																										</Button>
																								</TableCell>
																						</TableRow>
																				))}
																</TableBody>
														</Table>
												</CardContent>
										</Card>
								</TabsContent>
						</Tabs>
				</div>
		)
}
