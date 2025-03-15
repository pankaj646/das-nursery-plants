
// This file contains all product data that can be easily modified
// You can update product information, prices, categories, and descriptions here

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  category: string;
  careInfo?: {
    water: string;
    light: string;
    care: string;
  };
  specs?: {
    type: string;
    size: string;
    benefits: string;
  };
}

// All available product categories
export const productCategories = [
  { id: "all", name: "All Products" },
  { id: "indoor", name: "Indoor Plants" },
  { id: "outdoor", name: "Outdoor Plants" },
  { id: "succulents", name: "Succulents" },
  { id: "bonsai", name: "Bonsai Plants" },
  { id: "fertilizers", name: "Fertilizers" },
  { id: "pots", name: "Pots & Planters" },
  { id: "accessories", name: "Gardening Accessories" }
];

// All products data
export const allProducts: Product[] = [
  // Indoor Plants
  {
    id: 1,
    name: "Areca Palm",
    description: "Air-purifying indoor plant",
    image: "/images/products/areca-palm.jpg", // This will use local images (update path after uploading)
    originalPrice: 799,
    discountedPrice: 599,
    discountPercentage: 25,
    category: "indoor",
    careInfo: {
      water: "Water once a week",
      light: "Indirect sunlight",
      care: "Keep away from cold drafts"
    },
    specs: {
      type: "Indoor Plant",
      size: "Medium",
      benefits: "Air purification"
    }
  },
  {
    id: 2,
    name: "Snake Plant",
    description: "Low-maintenance, air-purifying plant",
    image: "/images/products/snake-plant.jpg",
    originalPrice: 599,
    discountedPrice: 499,
    discountPercentage: 17,
    category: "indoor",
    careInfo: {
      water: "Water every 2-3 weeks",
      light: "Low to bright indirect light",
      care: "Tolerates neglect well"
    },
    specs: {
      type: "Indoor Plant",
      size: "Medium",
      benefits: "Air purification, low maintenance"
    }
  },
  {
    id: 3,
    name: "Money Plant",
    description: "Decorative trailing houseplant",
    image: "/images/products/money-plant.jpg",
    originalPrice: 349,
    discountedPrice: 299,
    discountPercentage: 14,
    category: "indoor",
    careInfo: {
      water: "Water when top soil is dry",
      light: "Moderate indirect light",
      care: "Prune regularly for bushy growth"
    },
    specs: {
      type: "Indoor Plant",
      size: "Small to Medium",
      benefits: "Air purification, easy to propagate"
    }
  },
  {
    id: 4,
    name: "Money Plant",
    description: "Decorative trailing houseplant",
    image: "/images/products/money-plant.jpg",
    originalPrice: 349,
    discountedPrice: 299,
    discountPercentage: 14,
    category: "indoor",
    careInfo: {
      water: "Water when top soil is dry",
      light: "Moderate indirect light",
      care: "Prune regularly for bushy growth"
    },
    specs: {
      type: "Indoor Plant",
      size: "Small to Medium",
      benefits: "Air purification, easy to propagate"
    }
  },
  {
    id: 5,
    name: "Money Plant",
    description: "Decorative trailing houseplant",
    image: "/images/products/money-plant.jpg",
    originalPrice: 349,
    discountedPrice: 299,
    discountPercentage: 14,
    category: "indoor",
    careInfo: {
      water: "Water when top soil is dry",
      light: "Moderate indirect light",
      care: "Prune regularly for bushy growth"
    },
    specs: {
      type: "Indoor Plant",
      size: "Small to Medium",
      benefits: "Air purification, easy to propagate"
    }
  },
  {
    id: 6,
    name: "Money Plant",
    description: "Decorative trailing houseplant",
    image: "/images/products/money-plant.jpg",
    originalPrice: 349,
    discountedPrice: 299,
    discountPercentage: 14,
    category: "indoor",
    careInfo: {
      water: "Water when top soil is dry",
      light: "Moderate indirect light",
      care: "Prune regularly for bushy growth"
    },
    specs: {
      type: "Indoor Plant",
      size: "Small to Medium",
      benefits: "Air purification, easy to propagate"
    }
  },
  // ... more products can be added here following the same format
];

// Function to get products by category
export const getProductsByCategory = (category: string | null): Product[] => {
  if (!category || category === "all") {
    return allProducts;
  }
  return allProducts.filter(product => product.category === category);
};

// Function to get featured products (modify this according to your needs)
export const getFeaturedProducts = (): Product[] => {
  // Return 4 hand-picked products or first 4 from different categories
  return allProducts.slice(0, 4);
};

// Function to get product by ID
export const getProductById = (id: number): Product | undefined => {
  return allProducts.find(product => product.id === id);
};
