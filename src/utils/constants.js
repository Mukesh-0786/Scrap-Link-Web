export const SCRAP_CATEGORIES = [
  {
    id: 'newspaper',
    name: 'Newspaper',
    price_per_kg: 12,
    icon: '📰',
    description: 'Old newspapers, magazines, books, notebooks',
    unit: 'kg'
  },
  {
    id: 'plastic',
    name: 'Plastic',
    price_per_kg: 18,
    icon: '♻️',
    description: 'PET bottles, containers, packaging materials',
    unit: 'kg'
  },
  {
    id: 'metal',
    name: 'Metal',
    price_per_kg: 35,
    icon: '⚙️',
    description: 'Steel, iron, aluminum items, utensils',
    unit: 'kg'
  },
  {
    id: 'copper',
    name: 'Copper Wire',
    price_per_kg: 250,
    icon: '🔌',
    description: 'Electrical wires, cables, transformers',
    unit: 'kg'
  },
  {
    id: 'ewaste',
    name: 'E-Waste',
    price_per_kg: 45,
    icon: '💻',
    description: 'Old electronics, batteries, circuit boards',
    unit: 'kg'
  },
  {
    id: 'cardboard',
    name: 'Cardboard',
    price_per_kg: 8,
    icon: '📦',
    description: 'Cardboard boxes, packaging materials',
    unit: 'kg'
  },
  {
    id: 'glass',
    name: 'Glass',
    price_per_kg: 5,
    icon: '🍶',
    description: 'Glass bottles, jars, broken glass',
    unit: 'kg'
  },
  {
    id: 'fabric',
    name: 'Fabric',
    price_per_kg: 10,
    icon: '👕',
    description: 'Old clothes, textiles, curtains',
    unit: 'kg'
  }
]

export const USER_ROLES = {
  CUSTOMER: 'customer',
  COLLECTOR: 'collector',
  ADMIN: 'admin'
}

export const REQUEST_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
}