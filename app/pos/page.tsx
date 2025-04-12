"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Check,
  CreditCard,
  DollarSign,
  Minus,
  Plus,
  ScanBarcodeIcon as BarcodeScan,
  Search,
  ShoppingCart,
  Trash2,
  User,
} from "lucide-react"

// Sample product data
const products = [
  {
    id: "1",
    name: "Apples",
    price: 2.99,
    unit: "kg",
    category: "Fruits",
  },
  {
    id: "2",
    name: "Milk",
    price: 3.49,
    unit: "liter",
    category: "Dairy",
  },
  {
    id: "3",
    name: "Bread",
    price: 2.29,
    unit: "piece",
    category: "Bakery",
  },
  {
    id: "4",
    name: "Chicken Breast",
    price: 8.99,
    unit: "kg",
    category: "Meat",
  },
  {
    id: "5",
    name: "Red Wine",
    price: 12.99,
    unit: "bottle",
    category: "Beverages",
  },
  {
    id: "6",
    name: "Cheese",
    price: 5.99,
    unit: "kg",
    category: "Dairy",
  },
  {
    id: "7",
    name: "Tomatoes",
    price: 3.99,
    unit: "kg",
    category: "Vegetables",
  },
  {
    id: "8",
    name: "Orange Juice",
    price: 4.49,
    unit: "liter",
    category: "Beverages",
  },
]

// Sample customer data
const customers = [
  { id: "1", name: "John Doe", phone: "555-1234" },
  { id: "2", name: "Jane Smith", phone: "555-5678" },
  { id: "3", name: "Bob Johnson", phone: "555-9012" },
]

export default function POSPage() {
  const [cart, setCart] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [barcodeInput, setBarcodeInput] = useState("")
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [quantityDialogOpen, setQuantityDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [quantity, setQuantity] = useState("1")
  const [successMessage, setSuccessMessage] = useState("")

  const addToCart = (product, qty) => {
    const quantityValue = Number.parseFloat(qty)
    if (isNaN(quantityValue) || quantityValue <= 0) return

    const existingItemIndex = cart.findIndex((item) => item.id === product.id)

    if (existingItemIndex >= 0) {
      const updatedCart = [...cart]
      updatedCart[existingItemIndex].quantity += quantityValue
      setCart(updatedCart)
    } else {
      setCart([...cart, { ...product, quantity: quantityValue }])
    }

    // Show brief success message
    setSuccessMessage(`Added: ${product.name}`)
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    const quantityValue = Number.parseFloat(newQuantity)
    if (isNaN(quantityValue) || quantityValue <= 0) return

    setCart(cart.map((item) => (item.id === productId ? { ...item, quantity: quantityValue } : item)))
  }

  const incrementQuantity = (productId) => {
    setCart(
      cart.map((item) => {
        if (item.id === productId) {
          const step = item.unit === "piece" ? 1 : 0.1
          return { ...item, quantity: Math.round((item.quantity + step) * 100) / 100 }
        }
        return item
      }),
    )
  }

  const decrementQuantity = (productId) => {
    setCart(
      cart.map((item) => {
        if (item.id === productId) {
          const step = item.unit === "piece" ? 1 : 0.1
          const newQuantity = Math.max(Math.round((item.quantity - step) * 100) / 100, step)
          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    )
  }

  const handleProductSearch = (e) => {
    e.preventDefault()

    // Find product by name (case insensitive)
    const foundProduct = products.find((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))

    if (foundProduct) {
      if (foundProduct.unit === "piece") {
        addToCart(foundProduct, 1)
      } else {
        setSelectedProduct(foundProduct)
        setQuantity("1")
        setQuantityDialogOpen(true)
      }
      setSearchTerm("")
    }
  }

  const handleBarcodeSearch = (e) => {
    e.preventDefault()
    // Simulate barcode scanning by searching for product by ID
    const product = products.find((p) => p.id === barcodeInput)
    if (product) {
      if (product.unit === "piece") {
        addToCart(product, 1)
      } else {
        setSelectedProduct(product)
        setQuantity("1")
        setQuantityDialogOpen(true)
      }
      setBarcodeInput("")
    }
  }

  const handleAddQuantity = () => {
    addToCart(selectedProduct, quantity)
    setQuantityDialogOpen(false)
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const formatUnitLabel = (unit, quantity) => {
    if (unit === "piece") return quantity > 1 ? "pieces" : "piece"
    return unit
  }

  const handleCheckout = () => {
    if (paymentMethod === "credit" && !selectedCustomer) {
      return // Require customer for credit sales
    }

    // Process the sale
    const total = calculateTotal()
    console.log("Sale completed:", {
      items: cart,
      total,
      paymentMethod,
      customer: selectedCustomer,
      timestamp: new Date(),
    })

    // Reset the cart and show success
    setCart([])
    setSuccessMessage(`Sale completed: $${total.toFixed(2)}`)
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header with search and barcode scan */}
      <div className="p-6 border-b border-border/10 bg-card shadow-sm">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Point of Sale</h1>
            <div className="flex items-center gap-2">
              {successMessage && (
                <div className="bg-green-50 text-green-600 text-sm py-1 px-3 rounded-full flex items-center">
                  <Check className="h-3.5 w-3.5 mr-1" />
                  {successMessage}
                </div>
              )}
              <Button
                variant={selectedCustomer ? "default" : "outline"}
                className={`flex gap-2 ${selectedCustomer ? "bg-primary hover:bg-primary/90" : "border-border/20 hover:bg-muted"}`}
                onClick={() => setCustomerDialogOpen(true)}
              >
                <User className="h-4 w-4" />
                {selectedCustomer ? selectedCustomer.name : "Select Customer"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form onSubmit={handleProductSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-9 h-11 border-border/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
            <form onSubmit={handleBarcodeSearch} className="relative">
              <BarcodeScan className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Scan barcode..."
                className="w-full pl-9 h-11 border-border/20"
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>

      {/* Cart Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium flex items-center gap-2 text-foreground">
                <ShoppingCart className="h-5 w-5" />
                Current Sale
                {cart.length > 0 && (
                  <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                    {cart.length} {cart.length === 1 ? "item" : "items"}
                  </Badge>
                )}
              </h2>
            </div>

            {cart.length === 0 ? (
              <Card className="border-dashed border-border/20 shadow-sm">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                  <p className="text-muted-foreground mb-2">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground">Search for products or scan barcodes to add items</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <Card key={item.id} className="overflow-hidden border-border/10 shadow-sm">
                    <CardContent className="p-0">
                      <div className="flex items-center p-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate text-foreground">{item.name}</h3>
                          <div className="text-sm text-muted-foreground mt-0.5">
                            ${item.price.toFixed(2)} / {item.unit}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 ml-4">
                          <div className="flex items-center border rounded-md overflow-hidden border-border/20">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none border-r border-border/20 hover:bg-muted"
                              onClick={() => decrementQuantity(item.id)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, e.target.value)}
                              className="w-16 h-8 border-0 text-center"
                              min="0.01"
                              step={item.unit === "piece" ? "1" : "0.1"}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none border-l border-border/20 hover:bg-muted"
                              onClick={() => incrementQuantity(item.id)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="w-16 text-sm text-muted-foreground">
                            {formatUnitLabel(item.unit, item.quantity)}
                          </div>
                          <div className="w-24 text-right font-medium text-foreground">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-red-600 hover:bg-muted"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-border/10 bg-card p-6 shadow-sm">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 items-end">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-method" className="text-foreground">
                    Payment Method
                  </Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger id="payment-method" className="h-11 border-border/20">
                      <SelectValue placeholder="Payment Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Cash
                        </div>
                      </SelectItem>
                      <SelectItem value="card">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Card
                        </div>
                      </SelectItem>
                      <SelectItem value="credit">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Store Credit
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {paymentMethod === "credit" && !selectedCustomer && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-600">
                    Please select a customer for credit sales
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-border/20 hover:bg-muted"
                    onClick={() => setCart([])}
                    disabled={cart.length === 0}
                  >
                    Clear Sale
                  </Button>
                  <Button
                    className="flex-1 h-11 bg-primary hover:bg-primary/90"
                    disabled={cart.length === 0 || (paymentMethod === "credit" && !selectedCustomer)}
                    onClick={handleCheckout}
                  >
                    Complete Sale
                  </Button>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-4 space-y-3 border border-border/10">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="text-foreground">${(calculateTotal() * 0.1).toFixed(2)}</span>
                </div>
                <Separator className="bg-border/20" />
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">${(calculateTotal() * 1.1).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quantity Dialog */}
      <Dialog open={quantityDialogOpen} onOpenChange={setQuantityDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-card border-border/10 shadow-sm">
          <DialogHeader>
            <DialogTitle className="text-foreground">Enter Quantity</DialogTitle>
            <DialogDescription>
              {selectedProduct && `Enter the quantity of ${selectedProduct.name} (${selectedProduct.unit})`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="quantity" className="text-foreground">
                Quantity ({selectedProduct?.unit})
              </Label>
              <div className="flex">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-r-none border-border/20"
                  onClick={() => {
                    const current = Number.parseFloat(quantity)
                    if (!isNaN(current) && current > 0.1) {
                      setQuantity((current - 0.1).toFixed(1))
                    }
                  }}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="0.01"
                  step={selectedProduct?.unit === "piece" ? "1" : "0.1"}
                  className="rounded-none text-center border-x-0 border-border/20"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-l-none border-border/20"
                  onClick={() => {
                    const current = Number.parseFloat(quantity)
                    if (!isNaN(current)) {
                      setQuantity((current + 0.1).toFixed(1))
                    } else {
                      setQuantity("0.1")
                    }
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setQuantityDialogOpen(false)} className="border-border/20">
              Cancel
            </Button>
            <Button onClick={handleAddQuantity} className="bg-primary hover:bg-primary/90">
              Add to Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Customer Dialog */}
      <Dialog open={customerDialogOpen} onOpenChange={setCustomerDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-card border-border/10 shadow-sm">
          <DialogHeader>
            <DialogTitle className="text-foreground">Select Customer</DialogTitle>
            <DialogDescription>Select a customer for this sale or continue as a guest.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="customer-search" className="text-foreground">
                Search Customers
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="customer-search"
                  placeholder="Search by name or phone..."
                  className="pl-9 border-border/20"
                />
              </div>
            </div>
            <div className="max-h-[200px] overflow-auto border rounded-md divide-y border-border/20 divide-border/20">
              {customers.map((customer) => (
                <div
                  key={customer.id}
                  className="p-3 hover:bg-muted cursor-pointer transition-colors"
                  onClick={() => {
                    setSelectedCustomer(customer)
                    setCustomerDialogOpen(false)
                  }}
                >
                  <div className="font-medium text-foreground">{customer.name}</div>
                  <div className="text-sm text-muted-foreground">{customer.phone}</div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              className="sm:flex-1 border-border/20 hover:bg-muted"
              onClick={() => {
                setSelectedCustomer(null)
                setCustomerDialogOpen(false)
              }}
            >
              Continue as Guest
            </Button>
            <Button className="sm:flex-1 bg-primary hover:bg-primary/90">Add New Customer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
