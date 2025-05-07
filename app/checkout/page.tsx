"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useCart } from "@/hooks/use-cart"
import { LOCATIONS } from "@/lib/data"
import type { OrderDetails } from "@/lib/types"
import { ArrowLeft, CreditCard, MapPin, Truck } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, total, clearCart } = useCart()

  const [formData, setFormData] = useState<OrderDetails>({
    firstName: "",
    lastName: "",
    selectedLocation: "", // Add this line
    email: "",
    phone: "",
    deliveryMethod: "delivery",
    address: {
      street: "",
      city: "",
      postcode: "",
    },
    paymentMethod: "card",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof OrderDetails],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Basic validation
    if (!formData.firstName) newErrors.firstName = "First name is required"
    if (!formData.lastName) newErrors.lastName = "Last name is required"
    if (!formData.selectedLocation) newErrors.selectedLocation = "Please select a location to order from" // Add this line
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.phone) newErrors.phone = "Phone number is required"

    // Delivery address validation
    if (formData.deliveryMethod === "delivery") {
      if (!formData.address?.street) newErrors["address.street"] = "Street address is required"
      if (!formData.address?.city) newErrors["address.city"] = "City is required"
      if (!formData.address?.postcode) newErrors["address.postcode"] = "Postcode is required"
    } else if (formData.deliveryMethod === "pickup" && !formData.pickupLocation) {
      newErrors.pickupLocation = "Please select a pickup location"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate order processing
    setTimeout(() => {
      // In a real app, you would send the order to your backend here
      clearCart()
      router.push("/order-confirmation")
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Location Selection */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Select Location</h2>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label htmlFor="selectedLocation" className="block text-sm font-medium text-gray-700 mb-1">
                    Which Burrito Bull location would you like to order from?*
                  </label>
                  <select
                    id="selectedLocation"
                    name="selectedLocation"
                    value={formData.selectedLocation}
                    onChange={handleInputChange}
                    className={`w-full border ${errors.selectedLocation ? "border-red-500" : "border-gray-300"} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  >
                    <option value="">Select a location</option>
                    {LOCATIONS.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name} - {location.address}
                      </option>
                    ))}
                  </select>
                  {errors.selectedLocation && <p className="text-red-500 text-sm mt-1">{errors.selectedLocation}</p>}
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Personal Information</h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full border ${errors.firstName ? "border-red-500" : "border-gray-300"} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full border ${errors.lastName ? "border-red-500" : "border-gray-300"} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Delivery Method</h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="delivery"
                      checked={formData.deliveryMethod === "delivery"}
                      onChange={handleInputChange}
                      className="text-orange-600 focus:ring-orange-500 h-4 w-4"
                    />
                    <span className="flex items-center">
                      <Truck className="h-5 w-5 mr-1" />
                      Delivery
                    </span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={formData.deliveryMethod === "pickup"}
                      onChange={handleInputChange}
                      className="text-orange-600 focus:ring-orange-500 h-4 w-4"
                    />
                    <span className="flex items-center">
                      <MapPin className="h-5 w-5 mr-1" />
                      Pickup
                    </span>
                  </label>
                </div>

                {formData.deliveryMethod === "delivery" ? (
                  <div className="space-y-4 mt-4">
                    <div>
                      <label htmlFor="address.street" className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address*
                      </label>
                      <input
                        type="text"
                        id="address.street"
                        name="address.street"
                        value={formData.address?.street || ""}
                        onChange={handleInputChange}
                        className={`w-full border ${errors["address.street"] ? "border-red-500" : "border-gray-300"} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                      />
                      {errors["address.street"] && (
                        <p className="text-red-500 text-sm mt-1">{errors["address.street"]}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="address.city" className="block text-sm font-medium text-gray-700 mb-1">
                          City*
                        </label>
                        <input
                          type="text"
                          id="address.city"
                          name="address.city"
                          value={formData.address?.city || ""}
                          onChange={handleInputChange}
                          className={`w-full border ${errors["address.city"] ? "border-red-500" : "border-gray-300"} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                        />
                        {errors["address.city"] && (
                          <p className="text-red-500 text-sm mt-1">{errors["address.city"]}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="address.postcode" className="block text-sm font-medium text-gray-700 mb-1">
                          Postcode*
                        </label>
                        <input
                          type="text"
                          id="address.postcode"
                          name="address.postcode"
                          value={formData.address?.postcode || ""}
                          onChange={handleInputChange}
                          className={`w-full border ${errors["address.postcode"] ? "border-red-500" : "border-gray-300"} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                        />
                        {errors["address.postcode"] && (
                          <p className="text-red-500 text-sm mt-1">{errors["address.postcode"]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4">
                    <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-1">
                      Pickup Location*
                    </label>
                    <select
                      id="pickupLocation"
                      name="pickupLocation"
                      value={formData.pickupLocation || ""}
                      onChange={handleInputChange}
                      className={`w-full border ${errors.pickupLocation ? "border-red-500" : "border-gray-300"} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    >
                      <option value="">Select a location</option>
                      {LOCATIONS.map((location) => (
                        <option key={location.id} value={location.id}>
                          {location.name} - {location.address}
                        </option>
                      ))}
                    </select>
                    {errors.pickupLocation && <p className="text-red-500 text-sm mt-1">{errors.pickupLocation}</p>}
                  </div>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Payment Method</h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleInputChange}
                      className="text-orange-600 focus:ring-orange-500 h-4 w-4"
                    />
                    <span className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-1" />
                      Pay by Card
                    </span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === "cash"}
                      onChange={handleInputChange}
                      className="text-orange-600 focus:ring-orange-500 h-4 w-4"
                    />
                    <span>Pay with Cash on Delivery/Pickup</span>
                  </label>
                </div>

                {formData.paymentMethod === "card" && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <p className="text-gray-600">
                      You will be redirected to our secure payment processor after placing your order.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <Link href="/cart" className="flex items-center text-orange-600 hover:text-orange-700">
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>Back to Cart</span>
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-md transition-colors disabled:opacity-70"
              >
                {isSubmitting ? "Processing..." : "Place Order"}
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-8">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Order Summary</h2>
            </div>

            <div className="p-6">
              <ul className="divide-y mb-4">
                {items.map((item) => (
                  <li key={item.id} className="py-2 flex justify-between">
                    <div>
                      <span className="font-medium">{item.quantity}x </span>
                      {item.name}
                      {item.size && <span className="text-sm text-gray-600"> ({item.size})</span>}
                    </div>
                    <span>£{item.totalPrice.toFixed(2)}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>£2.99</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>£{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
