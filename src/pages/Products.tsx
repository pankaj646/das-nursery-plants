
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import ProductCard, { Product } from '@/components/products/ProductCard';
import { CartProduct } from '@/components/cart/CartItem';
import { toast } from '@/hooks/use-toast';

// Mock products data
const allProducts: Product[] = [
  // Indoor Plants
  {
    id: 1,
    name: "Areca Palm",
    description: "Air-purifying indoor plant",
    image: "https://images.unsplash.com/photo-1602923668104-8f9e03e77eff?q=80&w=1740&auto=format&fit=crop",
    originalPrice: 799,
    discountedPrice: 599,
    discountPercentage: 25,
    category: "indoor"
  },
  {
    id: 2,
    name: "Snake Plant",
    description: "Low-maintenance, air-purifying plant",
    image: "https://images.unsplash.com/photo-1620127682229-33388276e540?q=80&w=1587&auto=format&fit=crop",
    originalPrice: 599,
    discountedPrice: 499,
    discountPercentage: 17,
    category: "indoor"
  },
  {
    id: 3,
    name: "Money Plant",
    description: "Decorative trailing houseplant",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=1664&auto=format&fit=crop",
    originalPrice: 349,
    discountedPrice: 299,
    discountPercentage: 14,
    category: "indoor"
  },
  {
    id: 4,
    name: "Peace Lily",
    description: "Elegant flowering indoor plant",
    image: "https://images.unsplash.com/photo-1616679312573-27f996b623fb?q=80&w=1664&auto=format&fit=crop",
    originalPrice: 499,
    discountedPrice: 449,
    discountPercentage: 10,
    category: "indoor"
  },
  {
    id: 5,
    name: "Rubber Plant",
    description: "Statement indoor plant with glossy leaves",
    image: "https://images.unsplash.com/photo-1602409339188-95d178a611a0?q=80&w=1587&auto=format&fit=crop",
    originalPrice: 899,
    discountedPrice: 799,
    discountPercentage: 11,
    category: "indoor"
  },
  
  // Outdoor Plants
  {
    id: 6,
    name: "Bougainvillea",
    description: "Colorful flowering outdoor plant",
    image: "https://images.unsplash.com/photo-1615831390443-dc0c32f6cf9a?q=80&w=1740&auto=format&fit=crop",
    originalPrice: 499,
    discountedPrice: 399,
    discountPercentage: 20,
    category: "outdoor"
  },
  {
    id: 7,
    name: "Hibiscus",
    description: "Tropical flowering shrub",
    image: "https://images.unsplash.com/photo-1579446435120-746cdbb8e5fe?q=80&w=1664&auto=format&fit=crop",
    originalPrice: 399,
    discountedPrice: 349,
    discountPercentage: 13,
    category: "outdoor"
  },
  {
    id: 8,
    name: "Marigold",
    description: "Vibrant yellow & orange flowers",
    image: "https://images.unsplash.com/photo-1630679332478-6459e4a2f8b9?q=80&w=1770&auto=format&fit=crop",
    originalPrice: 249,
    discountedPrice: 199,
    discountPercentage: 20,
    category: "outdoor"
  },
  
  // Succulents
  {
    id: 9,
    name: "Aloe Vera",
    description: "Medicinal succulent with thick leaves",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?q=80&w=1749&auto=format&fit=crop",
    originalPrice: 299,
    discountedPrice: 249,
    discountPercentage: 17,
    category: "succulents"
  },
  {
    id: 10,
    name: "Echeveria",
    description: "Rosette-forming succulent",
    image: "https://images.unsplash.com/photo-1520302630591-fd1c66d0641f?q=80&w=1742&auto=format&fit=crop",
    originalPrice: 249,
    discountedPrice: 199,
    discountPercentage: 20,
    category: "succulents"
  },
  
  // Bonsai
  {
    id: 11,
    name: "Ficus Bonsai",
    description: "Indoor bonsai tree with small leaves",
    image: "https://images.unsplash.com/photo-1610173827043-609816f2cc66?q=80&w=1664&auto=format&fit=crop",
    originalPrice: 1499,
    discountedPrice: 1299,
    discountPercentage: 13,
    category: "bonsai"
  },
  
  // Fertilizers
  {
    id: 12,
    name: "Organic Compost",
    description: "Rich, natural fertilizer for all plants",
    image: "https://images.unsplash.com/photo-1632239346203-191de3a2cbda?q=80&w=1736&auto=format&fit=crop",
    originalPrice: 399,
    discountedPrice: 349,
    discountPercentage: 13,
    category: "fertilizers"
  },
  
  // Pots & Planters
  {
    id: 13,
    name: "Ceramic White Pot",
    description: "Elegant pot for indoor plants",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1744&auto=format&fit=crop",
    originalPrice: 499,
    discountedPrice: 399,
    discountPercentage: 20,
    category: "pots"
  },
  {
    id: 14,
    name: "Terracotta Pot Set",
    description: "Set of 3 classic terracotta planters",
    image: "https://images.unsplash.com/photo-1622579522120-93eabdb1fe2b?q=80&w=1664&auto=format&fit=crop",
    originalPrice: 799,
    discountedPrice: 599,
    discountPercentage: 25,
    category: "pots"
  },
  
  // Accessories
  {
    id: 15,
    name: "Gardening Tool Set",
    description: "Essential tools for plant care",
    image: "https://images.unsplash.com/photo-1622484212772-a25fe0c752b5?q=80&w=1740&auto=format&fit=crop",
    originalPrice: 899,
    discountedPrice: 749,
    discountPercentage: 17,
    category: "accessories"
  }
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    
    // Filter products based on category parameter
    if (categoryFilter) {
      setFilteredProducts(allProducts.filter(product => product.category === categoryFilter));
    } else {
      setFilteredProducts(allProducts);
    }
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('dasNurseryCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    
    // Simulate API delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [categoryFilter]);
  
  const handleAddToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      const updatedCart = cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
      setCart(updatedCart);
      localStorage.setItem('dasNurseryCart', JSON.stringify(updatedCart));
      
      toast({
        title: "Quantity updated",
        description: `${product.name} quantity has been increased`,
      });
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem('dasNurseryCart', JSON.stringify(updatedCart));
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
    }
  };
  
  // Get category name for display
  const getCategoryTitle = () => {
    if (!categoryFilter) return "All Products";
    
    const categoryMap: {[key: string]: string} = {
      indoor: "Indoor Plants",
      outdoor: "Outdoor Plants",
      succulents: "Succulents",
      bonsai: "Bonsai Plants",
      fertilizers: "Fertilizers",
      pots: "Pots & Planters",
      accessories: "Gardening Accessories"
    };
    
    return categoryMap[categoryFilter] || "Products";
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="section-container">
          <h1 className="section-title">{getCategoryTitle()}</h1>
          
          {isLoading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-subtle animate-pulse">
                  <div className="aspect-square bg-gray-200" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-1/4 mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <h3 className="text-xl font-medium text-gray-600">No products found</h3>
                  <p className="text-gray-500 mt-2">Try searching for a different category</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={handleAddToCart} 
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Products;
