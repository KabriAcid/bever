export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Water' | 'Soft Drinks' | 'Juices' | 'Energy Drinks';
  packaging: 'Sachet' | 'Bottle' | 'Can';
  volume: string;
  unit: 'Pack' | 'Piece';
  packSize?: number;
  price: number;
  image: string;
  inStock: boolean;
  description?: string;
}

export const products: Product[] = [
  // Water Products
  {
    id: 'eva-water-75cl-pack',
    name: 'Eva Water',
    brand: 'Eva',
    category: 'Water',
    packaging: 'Bottle',
    volume: '75cl',
    unit: 'Pack',
    packSize: 12,
    price: 2400,
    image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg',
    inStock: true,
    description: 'Pure table water in convenient 75cl bottles'
  },
  {
    id: 'eva-water-75cl-piece',
    name: 'Eva Water',
    brand: 'Eva',
    category: 'Water',
    packaging: 'Bottle',
    volume: '75cl',
    unit: 'Piece',
    price: 200,
    image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg',
    inStock: true
  },
  {
    id: 'eva-water-1.5l-pack',
    name: 'Eva Water',
    brand: 'Eva',
    category: 'Water',
    packaging: 'Bottle',
    volume: '1.5L',
    unit: 'Pack',
    packSize: 12,
    price: 3600,
    image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg',
    inStock: true
  },
  {
    id: 'ragolis-water-sachet-pack',
    name: 'Ragolis Water',
    brand: 'Ragolis',
    category: 'Water',
    packaging: 'Sachet',
    volume: '50cl',
    unit: 'Pack',
    packSize: 20,
    price: 800,
    image: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg',
    inStock: true
  },
  {
    id: 'swan-water-1l-pack',
    name: 'Swan Water',
    brand: 'Swan',
    category: 'Water',
    packaging: 'Bottle',
    volume: '1L',
    unit: 'Pack',
    packSize: 12,
    price: 3000,
    image: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg',
    inStock: true
  },
  {
    id: 'aquafina-water-75cl-pack',
    name: 'Aquafina Water',
    brand: 'Aquafina',
    category: 'Water',
    packaging: 'Bottle',
    volume: '75cl',
    unit: 'Pack',
    packSize: 12,
    price: 2800,
    image: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg',
    inStock: true
  },

  // Soft Drinks
  {
    id: 'coca-cola-33cl-pack',
    name: 'Coca-Cola',
    brand: 'Coca-Cola',
    category: 'Soft Drinks',
    packaging: 'Can',
    volume: '33cl',
    unit: 'Pack',
    packSize: 24,
    price: 7200,
    image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg',
    inStock: true
  },
  {
    id: 'coca-cola-50cl-pack',
    name: 'Coca-Cola',
    brand: 'Coca-Cola',
    category: 'Soft Drinks',
    packaging: 'Bottle',
    volume: '50cl',
    unit: 'Pack',
    packSize: 12,
    price: 3600,
    image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg',
    inStock: true
  },
  {
    id: 'pepsi-33cl-pack',
    name: 'Pepsi',
    brand: 'Pepsi',
    category: 'Soft Drinks',
    packaging: 'Can',
    volume: '33cl',
    unit: 'Pack',
    packSize: 24,
    price: 7000,
    image: 'https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg',
    inStock: true
  },
  {
    id: 'fanta-35cl-pack',
    name: 'Fanta Orange',
    brand: 'Fanta',
    category: 'Soft Drinks',
    packaging: 'Bottle',
    volume: '35cl',
    unit: 'Pack',
    packSize: 12,
    price: 3000,
    image: 'https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg',
    inStock: true
  },
  {
    id: 'sprite-35cl-pack',
    name: 'Sprite',
    brand: 'Sprite',
    category: 'Soft Drinks',
    packaging: 'Bottle',
    volume: '35cl',
    unit: 'Pack',
    packSize: 12,
    price: 3000,
    image: 'https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg',
    inStock: true
  },
  {
    id: '7up-35cl-pack',
    name: '7UP',
    brand: '7UP',
    category: 'Soft Drinks',
    packaging: 'Bottle',
    volume: '35cl',
    unit: 'Pack',
    packSize: 12,
    price: 3000,
    image: 'https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg',
    inStock: true
  },

  // Juices
  {
    id: 'chivita-1l-pack',
    name: 'Chivita Active Orange',
    brand: 'Chivita',
    category: 'Juices',
    packaging: 'Bottle',
    volume: '1L',
    unit: 'Pack',
    packSize: 12,
    price: 4800,
    image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg',
    inStock: true
  },
  {
    id: 'five-alive-1l-pack',
    name: 'Five Alive Citrus',
    brand: 'Five Alive',
    category: 'Juices',
    packaging: 'Bottle',
    volume: '1L',
    unit: 'Pack',
    packSize: 12,
    price: 5200,
    image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg',
    inStock: true
  },
  {
    id: 'hollandia-1l-pack',
    name: 'Hollandia Yoghurt',
    brand: 'Hollandia',
    category: 'Juices',
    packaging: 'Bottle',
    volume: '1L',
    unit: 'Pack',
    packSize: 12,
    price: 6000,
    image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg',
    inStock: true
  },

  // Energy Drinks
  {
    id: 'monster-50cl-pack',
    name: 'Monster Energy',
    brand: 'Monster',
    category: 'Energy Drinks',
    packaging: 'Can',
    volume: '50cl',
    unit: 'Pack',
    packSize: 24,
    price: 14400,
    image: 'https://images.pexels.com/photos/3008456/pexels-photo-3008456.jpeg',
    inStock: true
  },
  {
    id: 'redbull-25cl-pack',
    name: 'Red Bull',
    brand: 'Red Bull',
    category: 'Energy Drinks',
    packaging: 'Can',
    volume: '25cl',
    unit: 'Pack',
    packSize: 24,
    price: 16800,
    image: 'https://images.pexels.com/photos/3008456/pexels-photo-3008456.jpeg',
    inStock: true
  },
  {
    id: 'fearless-35cl-pack',
    name: 'Fearless Energy',
    brand: 'Fearless',
    category: 'Energy Drinks',
    packaging: 'Bottle',
    volume: '35cl',
    unit: 'Pack',
    packSize: 12,
    price: 4800,
    image: 'https://images.pexels.com/photos/3008456/pexels-photo-3008456.jpeg',
    inStock: true
  }
];

export const categories = ['Water', 'Soft Drinks', 'Juices', 'Energy Drinks'] as const;

export const brands = {
  Water: ['Eva', 'Ragolis', 'Swan', 'Aquafina'],
  'Soft Drinks': ['Coca-Cola', 'Pepsi', 'Fanta', 'Sprite', '7UP', 'Mirinda'],
  Juices: ['Chivita', 'Five Alive', 'Hollandia'],
  'Energy Drinks': ['Monster', 'Red Bull', 'Fearless']
};

export const volumes = ['25cl', '33cl', '35cl', '50cl', '75cl', '1L', '1.5L', '2L'];
export const packagingTypes = ['Sachet', 'Bottle', 'Can'];
export const units = ['Pack', 'Piece'];