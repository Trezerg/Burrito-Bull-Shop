import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image src="/hero-burrito.jpg" alt="Delicious burrito" fill className="object-cover brightness-75" priority />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-4">Welcome to Burrito Bull Where Bold Flavors Are Rolled Fresh!</h1>
            <p className="text-xl mb-8">
              Handcrafted Burritos, Fresh Ingredients, and Unstoppable Cravings - Ready for Dine-In, Takeaway, or
              Delivery!
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center rounded-md bg-orange-600 px-6 py-3 text-lg font-medium text-white hover:bg-orange-700 transition-colors"
            >
              Order Online
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Most Popular Items</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Try our customer favorites, packed with flavor and made with the freshest ingredients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Item 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image src="/images/bbq-chicken-burrito.jpg" alt="BBQ Chicken Burrito" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">BBQ Chicken Burrito</h3>
                <p className="text-gray-600 mb-4">Grilled chicken, rice, beans, cheese, and our signature BBQ sauce.</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">£8.99</span>
                  <Link
                    href="/menu/burrito-1"
                    className="text-orange-600 hover:text-orange-700 font-medium flex items-center"
                  >
                    Order Now <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Featured Item 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image src="/images/beef-taco.jpg" alt="Classic Beef Taco" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Classic Beef Taco</h3>
                <p className="text-gray-600 mb-4">
                  Crispy corn tortilla, seasoned beef, lettuce, cheese, and pico de gallo.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">£3.99</span>
                  <Link
                    href="/menu/taco-1"
                    className="text-orange-600 hover:text-orange-700 font-medium flex items-center"
                  >
                    Order Now <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Featured Item 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image src="/images/chicken-bowl.jpg" alt="Chicken Burrito Bowl" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Chicken Burrito Bowl</h3>
                <p className="text-gray-600 mb-4">Rice, beans, grilled chicken, cheese, lettuce, and pico de gallo.</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">£9.99</span>
                  <Link
                    href="/menu/bowl-1"
                    className="text-orange-600 hover:text-orange-700 font-medium flex items-center"
                  >
                    Order Now <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center rounded-md border border-orange-600 px-6 py-3 text-lg font-medium text-orange-600 hover:bg-orange-50 transition-colors"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Satisfy your cravings with our delicious Mexican food. Order online for pickup or delivery today!
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-lg font-medium text-orange-600 hover:bg-gray-100 transition-colors"
          >
            Order Now
          </Link>
        </div>
      </section>
    </div>
  )
}
