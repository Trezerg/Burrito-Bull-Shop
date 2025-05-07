"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { CartItem, Product, ProductSize } from "@/lib/types"
import { PRODUCTS } from "@/lib/data"

interface CartContextType {
  items: CartItem[]
  addItem: (
    product: Product,
    quantity: number,
    size?: ProductSize,
    addOns?: string[],
    specialInstructions?: string,
  ) => void
  updateItem: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
  subtotal: number
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error)
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items, mounted])

  const calculateItemPrice = (product: Product, quantity: number, size?: ProductSize, addOns?: string[]) => {
    let price = product.price

    // Apply size price if available
    if (size && product.sizes && product.sizes[size]) {
      price = product.sizes[size] || price
    }

    // Add price of add-ons
    let addOnTotal = 0
    if (addOns && addOns.length > 0 && product.addOns) {
      addOns.forEach((addOnId) => {
        const addOn = product.addOns?.find((a) => a.id === addOnId)
        if (addOn) {
          addOnTotal += addOn.price
        }
      })
    }

    return (price + addOnTotal) * quantity
  }

  const addItem = (
    product: Product,
    quantity: number,
    size?: ProductSize,
    addOns?: string[],
    specialInstructions?: string,
  ) => {
    const totalPrice = calculateItemPrice(product, quantity, size, addOns)

    setItems((prev) => {
      // Check if item with same options already exists
      const existingItemIndex = prev.findIndex(
        (item) =>
          item.productId === product.id &&
          item.size === size &&
          JSON.stringify(item.addOns?.sort()) === JSON.stringify(addOns?.sort()) &&
          item.specialInstructions === specialInstructions,
      )

      if (existingItemIndex !== -1) {
        // Update existing item
        const updatedItems = [...prev]
        const existingItem = updatedItems[existingItemIndex]
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + quantity,
          totalPrice: calculateItemPrice(product, existingItem.quantity + quantity, size, addOns),
        }
        return updatedItems
      } else {
        // Add new item
        return [
          ...prev,
          {
            id: `${product.id}-${Date.now()}`,
            productId: product.id,
            name: product.name,
            price: product.sizes && size ? product.sizes[size] || product.price : product.price,
            quantity,
            size,
            addOns,
            specialInstructions,
            totalPrice,
          },
        ]
      }
    })
  }

  const updateItem = (id: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.id !== id)
      }

      return prev.map((item) => {
        if (item.id === id) {
          const product = PRODUCTS.find((p) => p.id === item.productId)
          if (!product) return item

          return {
            ...item,
            quantity,
            totalPrice: calculateItemPrice(product, quantity, item.size, item.addOns),
          }
        }
        return item
      })
    })
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setItems([])
  }

  const subtotal = items.reduce((total, item) => total + item.totalPrice, 0)
  const deliveryFee = 2.99
  const total = subtotal + deliveryFee

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateItem,
        removeItem,
        clearCart,
        subtotal,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
