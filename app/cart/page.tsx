"use client"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { PRODUCTS } from "@/lib/data"

export default function CartPage() {
  const router = useRouter()
  const { items, updateItem, removeItem, subtotal, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link
            href="/menu"
            className="inline-flex items-center justify-center rounded-md bg-orange-600 px-6 py-3 text-lg font-medium text-white hover:bg-orange-700 transition-colors"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Order Summary</h2>
            </div>

            <ul className="divide-y">
              {items.map((item) => {
                const product = PRODUCTS.find((p) => p.id === item.productId)

                return (
                  <li key={item.id} className="p-6">
                    <div className="flex flex-col sm:flex-row">
                      {/* Product Image */}
                      {product && (
                        <div className="relative h-24 w-24 rounded-md overflow-hidden mb-4 sm:mb-0 sm:mr-6">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-bold">{item.name}</h3>
                          <p className="font-bold">£{item.totalPrice.toFixed(2)}</p>
                        </div>

                        {/* Size */}
                        {item.size && (
                          <p className="text-gray-600 text-sm">
                            Size: {item.size.charAt(0).toUpperCase() + item.size.slice(1)}
                          </p>
                        )}

                        {/* Add-ons */}
                        {item.addOns && item.addOns.length > 0 && product?.addOns && (
                          <div className="text-gray-600 text-sm mt-1">
                            <p>Add-ons:</p>
                            <ul className="list-disc list-inside ml-2">
                              {item.addOns.map((addOnId) => {
                                const addOn = product.addOns?.find((a) => a.id === addOnId)
                                return addOn ? (
                                  <li key={addOnId}>
                                    {addOn.name} (+£{addOn.price.toFixed(2)})
                                  </li>
                                ) : null
                              })}
                            </ul>
                          </div>
                        )}

                        {/* Special Instructions */}
                        {item.specialInstructions && (
                          <p className="text-gray-600 text-sm mt-1">
                            <span className="font-medium">Special instructions:</span> {item.specialInstructions}
                          </p>
                        )}

                        {/* Quantity Controls */}
                        <div className="flex items-center mt-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateItem(item.id, item.quantity - 1)}
                              className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => updateItem(item.id, item.quantity + 1)}
                              className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-4 text-red-600 hover:text-red-800 flex items-center"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="p-6 border-t">
              <Link href="/menu" className="text-orange-600 hover:text-orange-700 flex items-center">
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-8">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Order Total</h2>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>£2.99</span>
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>£{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
