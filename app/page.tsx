import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
      <div className="flex min-h-screen flex-col">
        <header className="bg-background border-b">
          <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 font-semibold">
              <span className="text-xl">BusinessPOS</span>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <Link href="/login">
                <Button variant="outline">Log in</Button>
              </Link>
              <Link href="/register">
                <Button>Sign up</Button>
              </Link>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Point of Sale System for Your Business
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                      A complete POS solution that helps you manage inventory, process sales, and grow your business.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link href="/register">
                      <Button size="lg">Get Started</Button>
                    </Link>
                    <Link href="/demo">
                      <Button size="lg" variant="outline">
                        View Demo
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <img
                      alt="POS System Dashboard"
                      className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                      src="/placeholder.svg?height=550&width=800"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Key Features</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Everything you need to run your business efficiently
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Inventory Management</CardTitle>
                    <CardDescription>Add, edit, and track your inventory with ease</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Manage your products, set prices, track stock levels, and receive low inventory alerts.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Sales Processing</CardTitle>
                    <CardDescription>Fast and efficient checkout experience</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Process sales quickly, apply discounts, and handle various payment methods with our intuitive
                      interface.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Business Insights</CardTitle>
                    <CardDescription>Data-driven decision making</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Access sales reports, analyze customer behavior, and identify trends to grow your business.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>
        <footer className="border-t py-6 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2025 BusinessPOS. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                Privacy
              </Link>
            </div>
          </div>
        </footer>
      </div>
  )
}
