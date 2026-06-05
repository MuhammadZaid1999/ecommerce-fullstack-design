export type Product = {
  id: string
  name: string
  brand: string
  parentCategory: string
  category: string
  price: number
  rating: number
  image: string
  description: string
  details: string[]
  featured?: boolean
  newest?: boolean
}

export type CartItem = {
  productId: string
  quantity: number
}

export type Navigate = (path: string) => void
