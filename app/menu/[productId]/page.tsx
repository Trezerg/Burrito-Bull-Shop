"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { PRODUCTS } from "@/lib/data"
import { useCart } from "@/hooks/use-cart"
import type { ProductSize } from "@/lib/types"

export default function ProductPage({ params }: { params: { productId: string } }) {
  const router = useRouter()
  const { addItem } = useCart()
  const product = PRODUCTS.find((p) => p.id === params.productId)

  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState<ProductSize | undefined>(product?.sizes ? "regular" : undefined)
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [specialInstructions, setSpecialInstructions] = useState("")

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="mb-8">Sorry, the product you're looking for doesn't exist.</p>
        <button onClick={() => router.push("/menu")} className="btn-primary">
          Back to Menu
        </button>
      </div>
    )
  }

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, value))
  }

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns((prev) => (prev.includes(addOnId) ? prev.filter((id) => id !== addOnId) : [...prev, addOnId]))
  }

  const calculatePrice = () => {
    let basePrice = product.price

    // Apply size price if available
    if (size && product.sizes && product.sizes[size]) {
      basePrice = product.sizes[size] || basePrice
    }

    // Add price of add-ons
    let addOnTotal = 0
    if (selectedAddOns.length > 0 && product.addOns) {
      selectedAddOns.forEach((addOnId) => {
        const addOn = product.addOns?.find((a) => a.id === addOnId)
        if (addOn) {
          addOnTotal += addOn.price
        }
      })
    }

    return (basePrice + addOnTotal) * quantity
  }

  const handleAddToCart = () => {
    addItem(product, quantity, size, selectedAddOns, specialInstructions || undefined)
    router.push("/cart")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          {/* Size Selection */}
          {product.sizes && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Size</h3>
              <div className="flex space-x-4">
                <button
                  className={`px-4 py-2 rounded-md border ${
                    size === "regular"
                      ? "bg-orange-600 text-white border-orange-600"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => setSize("regular")}
                >
                  Regular (£{product.sizes.regular?.toFixed(2)})
                </button>
                <button
                  className={`px-4 py-2 rounded-md border ${
                    size === "large" ? "bg-orange-600 text-white border-orange-600" : "border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => setSize("large")}
                >
                  Large (£{product.sizes.large?.toFixed(2)})
                </button>
              </div>
            </div>
          )}

          {/* Add-ons */}
          {product.addOns && product.addOns.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Add-ons</h3>
              <div className="space-y-2">
                {product.addOns.map((addOn) => (
                  <label key={addOn.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedAddOns.includes(addOn.id)}
                      onChange={() => handleAddOnToggle(addOn.id)}
                      className="rounded text-orange-600 focus:ring-orange-500 h-4 w-4"
                    />
                    <span>
                      {addOn.name} (+£{addOn.price.toFixed(2)})
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Special Instructions</h3>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Any special requests? (e.g., no onions, extra spicy)"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows={3}
            />
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Quantity</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="p-2 rounded-md border border-gray-300 hover:bg-gray-50"
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-xl font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="p-2 rounded-md border border-gray-300 hover:bg-gray-50"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between mt-8">
            <div className="text-2xl font-bold">£{calculatePrice().toFixed(2)}</div>
            <button
              onClick={handleAddToCart}
              className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
