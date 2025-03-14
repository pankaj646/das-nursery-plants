
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/products/ProductCard';
import { getFeaturedProducts } from '@/config/products';
import type { Product } from '@/config/products';

interface FeaturedProductsProps {
  onAddToCart: (product: Product) => void;
}

const FeaturedProducts = ({ onAddToCart }: FeaturedProductsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  // Get featured products from our config file
  const featuredProducts = getFeaturedProducts();

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

  const handleDirectOrder = (product: Product) => {
    // Format direct order message for WhatsApp
    const orderMessage = `
🌿 I'd like to order:
${product.name} - ${product.discountPercentage > 0 ? `~~₹${product.originalPrice}~~ ` : ''}₹${product.discountedPrice} ${product.discountPercentage > 0 ? `(${product.discountPercentage}% OFF)` : ''}

Please provide details for delivery.
    `;
    
    // Generate WhatsApp URL
    const phoneNumber = '+919876543210'; // Replace with actual WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderMessage.trim())}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

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
              onDirectOrder={handleDirectOrder}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
