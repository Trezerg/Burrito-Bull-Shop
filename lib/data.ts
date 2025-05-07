import type { Product, ProductCategory } from "./types"

export const PRODUCTS: Product[] = [
  {
    id: "burrito-1",
    name: "BBQ Chicken Burrito",
    description: "Grilled chicken, rice, beans, cheese, and our signature BBQ sauce.",
    price: 8.99,
    category: "burritos",
    image: "/images/bbq-chicken-burrito.jpg",
    popular: true,
    sizes: {
      regular: 8.99,
      large: 10.99,
    },
    addOns: [
      { id: "extra-cheese", name: "Extra Cheese", price: 1.5 },
      { id: "guacamole", name: "Guacamole", price: 2.0 },
      { id: "sour-cream", name: "Sour Cream", price: 1.0 },
      { id: "extra-chicken", name: "Extra Chicken", price: 2.5 },
    ],
  },
  {
    id: "burrito-2",
    name: "Beef & Bean Burrito",
    description: "Seasoned ground beef, refried beans, rice, cheese, and pico de gallo.",
    price: 9.49,
    category: "burritos",
    image: "/images/beef-bean-burrito.jpg",
    sizes: {
      regular: 9.49,
      large: 11.49,
    },
    addOns: [
      { id: "extra-cheese", name: "Extra Cheese", price: 1.5 },
      { id: "guacamole", name: "Guacamole", price: 2.0 },
      { id: "sour-cream", name: "Sour Cream", price: 1.0 },
      { id: "extra-beef", name: "Extra Beef", price: 2.5 },
    ],
  },
  {
    id: "burrito-3",
    name: "Veggie Delight Burrito",
    description: "Grilled peppers, onions, mushrooms, rice, beans, and cheese.",
    price: 8.49,
    category: "burritos",
    image: "/images/veggie-burrito.jpg",
    sizes: {
      regular: 8.49,
      large: 10.49,
    },
    addOns: [
      { id: "extra-cheese", name: "Extra Cheese", price: 1.5 },
      { id: "guacamole", name: "Guacamole", price: 2.0 },
      { id: "sour-cream", name: "Sour Cream", price: 1.0 },
      { id: "extra-veggies", name: "Extra Veggies", price: 1.5 },
    ],
  },
  {
    id: "taco-1",
    name: "Classic Beef Taco",
    description: "Crispy corn tortilla, seasoned beef, lettuce, cheese, and pico de gallo.",
    price: 3.99,
    category: "tacos",
    image: "/images/beef-taco.jpg",
    popular: true,
    addOns: [
      { id: "extra-cheese", name: "Extra Cheese", price: 0.75 },
      { id: "guacamole", name: "Guacamole", price: 1.5 },
      { id: "sour-cream", name: "Sour Cream", price: 0.75 },
    ],
  },
  {
    id: "taco-2",
    name: "Grilled Chicken Taco",
    description: "Soft flour tortilla, grilled chicken, lettuce, cheese, and avocado.",
    price: 4.49,
    category: "tacos",
    image: "/images/chicken-taco.jpg",
    addOns: [
      { id: "extra-cheese", name: "Extra Cheese", price: 0.75 },
      { id: "guacamole", name: "Guacamole", price: 1.5 },
      { id: "sour-cream", name: "Sour Cream", price: 0.75 },
    ],
  },
  {
    id: "bowl-1",
    name: "Chicken Burrito Bowl",
    description: "Rice, beans, grilled chicken, cheese, lettuce, and pico de gallo.",
    price: 9.99,
    category: "bowls",
    image: "/images/chicken-bowl.jpg",
    popular: true,
    sizes: {
      regular: 9.99,
      large: 11.99,
    },
    addOns: [
      { id: "extra-cheese", name: "Extra Cheese", price: 1.5 },
      { id: "guacamole", name: "Guacamole", price: 2.0 },
      { id: "sour-cream", name: "Sour Cream", price: 1.0 },
      { id: "extra-chicken", name: "Extra Chicken", price: 2.5 },
    ],
  },
  {
    id: "quesadilla-1",
    name: "Cheese Quesadilla",
    description: "Large flour tortilla filled with melted cheese, served with salsa and sour cream.",
    price: 6.99,
    category: "quesadillas",
    image: "/images/cheese-quesadilla.jpg",
    addOns: [
      { id: "chicken", name: "Add Chicken", price: 2.5 },
      { id: "beef", name: "Add Beef", price: 2.5 },
      { id: "guacamole", name: "Guacamole", price: 2.0 },
    ],
  },
  {
    id: "side-1",
    name: "Loaded Nachos",
    description: "Tortilla chips topped with cheese, jalapeños, pico de gallo, and sour cream.",
    price: 7.99,
    category: "sides",
    image: "/images/loaded-nachos.jpg",
    addOns: [
      { id: "chicken", name: "Add Chicken", price: 2.5 },
      { id: "beef", name: "Add Beef", price: 2.5 },
      { id: "guacamole", name: "Guacamole", price: 2.0 },
    ],
  },
  {
    id: "drink-1",
    name: "Mexican Coca-Cola",
    description: "Authentic Mexican Coca-Cola made with real cane sugar.",
    price: 2.99,
    category: "drinks",
    image: "/images/mexican-coke.jpg",
    sizes: {
      regular: 2.99,
      large: 3.99,
    },
  },
]

export const CATEGORIES: { id: ProductCategory; name: string }[] = [
  { id: "burritos", name: "Burritos" },
  { id: "tacos", name: "Tacos" },
  { id: "bowls", name: "Burrito Bowls" },
  { id: "quesadillas", name: "Quesadillas" },
  { id: "sides", name: "Sides" },
  { id: "drinks", name: "Drinks" },
]

export const LOCATIONS = [
  {
    id: "bognor",
    name: "Bognor Regis",
    address: "7 York Rd, Bognor Regis PO21 1LW",
    phone: "(124) 386-5656",
    email: "burritobull@gmail.com",
  },
  {
    id: "gosport",
    name: "Gosport",
    address: "73 Forton Rd, Gosport PO12 4TD",
    phone: "N/A",
    email: "burritobull@gmail.com",
  },
]
