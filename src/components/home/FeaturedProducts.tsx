
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductCard, { Product } from '@/components/products/ProductCard';

// Sample featured products data
const featuredProducts: Product[] = [
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
    name: "Ceramic White Pot",
    description: "Elegant pot for indoor plants",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1744&auto=format&fit=crop",
    originalPrice: 499,
    discountedPrice: 399,
    discountPercentage: 20,
    category: "pots"
  }
];

interface FeaturedProductsProps {
  onAddToCart: (product: Product) => void;
}

const FeaturedProducts = ({ onAddToCart }: FeaturedProductsProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('featured-products');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="featured-products" className="section-container">
      <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-forest">
            Featured Products
          </h2>
          <Link to="/products">
            <Button variant="ghost" className="text-forest hover:text-leaf-500 hover:bg-leaf-50 group">
              View All
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
