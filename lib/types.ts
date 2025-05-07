export type ProductCategory = "burritos" | "tacos" | "bowls" | "quesadillas" | "sides" | "drinks"

export type ProductSize = "regular" | "large"

export interface ProductAddOn {
  id: string
  name: string
  price: number
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: ProductCategory
  image: string
  popular?: boolean
  sizes?: {
    [key in ProductSize]?: number
  }
  addOns?: ProductAddOn[]
}

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  size?: ProductSize
  addOns?: string[]
  specialInstructions?: string
  totalPrice: number
}

export interface OrderDetails {
  firstName: string
  selectedLocation: string
  lastName: string
  email: string
  phone: string
  deliveryMethod: "delivery" | "pickup"
  address?: {
    street: string
    city: string
    postcode: string
  }
  pickupLocation?: string
  paymentMethod: "card" | "cash"
}
