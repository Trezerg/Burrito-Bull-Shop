import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

export default function Header() {
  const { items } = useCart()
  const itemCount = items.length

  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <div className="flex-1 flex justify-center md:justify-start">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Burrito Bull Logo" width={120} height={60} className="h-14 w-auto" />
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-800 hover:text-orange-600 transition-colors">
            Home
          </Link>
          <Link href="/menu" className="text-gray-800 hover:text-orange-600 transition-colors">
            Menu
          </Link>
          <Link href="/locations" className="text-gray-800 hover:text-orange-600 transition-colors">
            Locations
          </Link>
          <Link href="/about" className="text-gray-800 hover:text-orange-600 transition-colors">
            Our Story
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-gray-800" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <Link
            href="/signin"
            className="hidden md:inline-flex border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/order"
            className="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 transition-colors"
          >
            Order Online
          </Link>
        </div>
      </div>
    </header>
  )
}
