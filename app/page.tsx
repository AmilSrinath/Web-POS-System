import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CreditCard, Package, ShoppingCart, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B192C]">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#50577A]/20 mb-6">
          <ShoppingCart className="h-8 w-8 text-[#50577A]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">SuperPOS System</h1>
        <p className="text-xl mb-10 max-w-2xl text-gray-400">
          A complete point of sale solution for supermarkets with inventory management, variable unit sales, and
          customer credit tracking.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button asChild size="lg" className="px-8 bg-[#50577A] hover:bg-[#50577A]/90 text-white">
            <Link href="/login">
              Sign In
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-[#50577A]/30 text-[#50577A] hover:bg-[#50577A]/10"
          >
            <Link href="/register">Create Account</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
          <FeatureCard
            icon={Package}
            title="Inventory Management"
            description="Manage products with different units of measurement"
          />
          <FeatureCard
            icon={ShoppingCart}
            title="Fast Checkout"
            description="Streamlined POS interface with barcode scanning"
          />
          <FeatureCard
            icon={Users}
            title="Customer Tracking"
            description="Keep records of all your customers and their purchases"
          />
          <FeatureCard
            icon={CreditCard}
            title="Credit Sales"
            description="Allow customers to buy on credit with payment tracking"
          />
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-[#27374D] border border-[#50577A]/20 rounded-xl p-6 text-left hover:shadow-md transition-shadow">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#50577A]/20 mb-4">
        <Icon className="h-6 w-6 text-[#50577A]" />
      </div>
      <h3 className="text-lg font-medium mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}
