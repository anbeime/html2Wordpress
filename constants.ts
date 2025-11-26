import { ProductData } from './types';

export const MOCK_RELATED_PRODUCTS: ProductData[] = [
  {
    id: 'mock-1',
    title: 'Porcelain Cyber-Arm',
    tagline: 'Ming Dynasty Aesthetics meets 2077 Technology',
    description: 'A decorative sculptural piece featuring intricate blue and white porcelain patterns fused with mechanical hydraulic joints. A perfect conversation starter for the modern surrealist home.',
    price: 129.99,
    features: ['Hand-painted ceramic finish', 'Articulated joints', 'LED accents'],
    imageUrl: 'https://picsum.photos/seed/cyberpot/400/400',
    amazonSearchTerm: 'Porcelain Steampunk Sculpture',
    category: 'Home Decor'
  },
  {
    id: 'mock-2',
    title: 'Dragon-Skin Sneaker',
    tagline: 'Ancient Myth, Streetwear Comfort',
    description: 'High-top sneakers featuring textured scales reminiscent of mythical dragons, combined with modern air-cushion soles. The ultimate fusion of folklore and urban fashion.',
    price: 89.50,
    features: ['Breathable scale mesh', 'Gold embroidery', 'Ergonomic sole'],
    imageUrl: 'https://picsum.photos/seed/dragonshoe/400/400',
    amazonSearchTerm: 'Dragon Scale Sneakers',
    category: 'Fashion'
  },
  {
    id: 'mock-3',
    title: 'Jade Circuit Board',
    tagline: 'Digital Zen Garden',
    description: 'A functioning wireless charger carved from faux jade, designed to look like an ancient tablet but etched with computer circuitry patterns.',
    price: 45.00,
    features: ['Fast wireless charging', 'Cool-touch surface', 'Ambient glow'],
    imageUrl: 'https://picsum.photos/seed/jadeboard/400/400',
    amazonSearchTerm: 'Jade Wireless Charger',
    category: 'Electronics'
  }
];