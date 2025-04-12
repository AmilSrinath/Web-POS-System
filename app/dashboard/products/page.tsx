"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Package, Plus, Search, Trash2 } from "lucide-react"

// Sample product data
const initialProducts = [
  {
    id: "1",
    name: "Apples",
    price: 2.99,
    unit: "kg",
    stock: 150,
    category: "Fruits",
  },
  {
    id: "2",
    name: "Milk",
    price: 3.49,
    unit: "liter",
    stock: 75,
    category: "Dairy",
  },
  {
    id: "3",
    name: "Bread",
    price: 2.29,
    unit: "piece",
    stock: 50,
    category: "Bakery",
  },
  {
    id: "4",
    name: "Chicken Breast",
    price: 8.99,
    unit: "kg",
    stock: 45,
    category: "Meat",
  },
  {
    id: "5",
    name: "Red Wine",
    price: 12.99,
    unit: "bottle",
    stock: 30,
    category: "Beverages",
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts)
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    unit: "piece",
    stock: "",
    category: "",
  })

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleAddProduct = () => {
    const productToAdd = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: Number.parseFloat(newProduct.price),
      unit: newProduct.unit,
      stock: Number.parseInt(newProduct.stock),
      category: newProduct.category,
    }

    setProducts([...products, productToAdd])
    setNewProduct({
      name: "",
      price: "",
      unit: "piece",
      stock: "",
      category: "",
    })
    setOpen(false)
  }

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your inventory and product catalog.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Add a new product to your inventory.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-3">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="h-10"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="h-10"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="unit">Unit</Label>
                  <Select
                    value={newProduct.unit}
                    onValueChange={(value) => setNewProduct({ ...newProduct, unit: value })}
                  >
                    <SelectTrigger id="unit" className="h-10">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="piece">Piece</SelectItem>
                      <SelectItem value="kg">Kilogram (kg)</SelectItem>
                      <SelectItem value="g">Gram (g)</SelectItem>
                      <SelectItem value="liter">Liter</SelectItem>
                      <SelectItem value="ml">Milliliter (ml)</SelectItem>
                      <SelectItem value="bottle">Bottle (750ml)</SelectItem>
                      <SelectItem value="half_bottle">Half Bottle (375ml)</SelectItem>
                      <SelectItem value="quarter_bottle">Quarter Bottle (187ml)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="h-10"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="h-10"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddProduct}>Add Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Product Inventory</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <CardDescription>Manage your product catalog and inventory levels.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.unit}</TableCell>
                      <TableCell>
                        <Badge
                          variant={product.stock > 50 ? "default" : product.stock > 20 ? "outline" : "destructive"}
                        >
                          {product.stock}
                        </Badge>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredProducts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No products found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Summary</CardTitle>
            <CardDescription>Overview of your product inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Products</span>
                  <span className="font-medium">{products.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Low Stock Items</span>
                  <span className="font-medium">{products.filter((p) => p.stock <= 20).length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Out of Stock</span>
                  <span className="font-medium">{products.filter((p) => p.stock === 0).length}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Categories</h4>
                <div className="space-y-2">
                  {Array.from(new Set(products.map((p) => p.category))).map((category) => (
                    <div key={category} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{category}</span>
                      <span className="font-medium">{products.filter((p) => p.category === category).length}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  <Package className="mr-2 h-4 w-4" />
                  Generate Inventory Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
