import Link from "next/link"
import Image from "next/image"
import { PRODUCTS, CATEGORIES } from "@/lib/data"

export default function MenuPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Menu</h1>

      {/* Category Navigation */}
      <div className="flex overflow-x-auto pb-4 mb-8 sticky top-0 bg-white z-10 pt-4 border-b">
        <div className="flex space-x-4 mx-auto">
          {CATEGORIES.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="whitespace-nowrap px-4 py-2 rounded-full bg-orange-100 text-orange-800 hover:bg-orange-200 transition-colors"
            >
              {category.name}
            </a>
          ))}
        </div>
      </div>

      {/* Menu Categories */}
      <div className="space-y-16">
        {CATEGORIES.map((category) => {
          const categoryProducts = PRODUCTS.filter((product) => product.category === category.id)

          return (
            <section key={category.id} id={category.id} className="scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6 border-b pb-2">{category.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/menu/${product.id}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      {product.popular && (
                        <div className="absolute top-2 right-2 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded">
                          Popular
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">£{product.price.toFixed(2)}</span>
                        <span className="text-orange-600 font-medium">Order Now</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
