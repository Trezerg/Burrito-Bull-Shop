import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/">
              <Image src="/logo.png" alt="Burrito Bull Logo" width={120} height={60} className="h-14 w-auto mb-4" />
            </Link>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-600 hover:text-orange-600 transition-colors">
                  News
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/menu" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Order Online
                </Link>
              </li>
              <li>
                <Link href="/catering" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Catering
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-orange-600 transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-orange-600 transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600">© Burrito Bull {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}
