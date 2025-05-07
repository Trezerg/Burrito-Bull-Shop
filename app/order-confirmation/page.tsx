"use client"

import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function OrderConfirmationPage() {
  const orderNumber = `BB-${Math.floor(100000 + Math.random() * 900000)}`
  const estimatedTime = 30 + Math.floor(Math.random() * 15)

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="max-w-md mx-auto">
        <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your order. We've received your order and will begin preparing it right away.
        </p>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-lg font-bold mb-2">Order Details</h2>
              <p className="text-gray-600">
                Order Number: <span className="font-medium">{orderNumber}</span>
              </p>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-bold mb-2">Estimated Time</h2>
              <p className="text-gray-600">
                Your order will be ready in approximately <span className="font-medium">{estimatedTime} minutes</span>
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/menu"
          className="inline-flex items-center justify-center rounded-md bg-orange-600 px-6 py-3 text-lg font-medium text-white hover:bg-orange-700 transition-colors"
        >
          Order More Food
        </Link>
      </div>
    </div>
  )
}
