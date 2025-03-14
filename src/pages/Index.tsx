
import { useState } from 'react';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategorySection from '@/components/home/CategorySection';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import { Product } from '@/components/products/ProductCard';
import { CartProduct } from '@/components/cart/CartItem';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  // Cart state will be managed at the top level and passed down
  const [cart, setCart] = useState<CartProduct[]>([]);
  
  const handleAddToCart = (product: Product) => {
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      // Update quantity if already in cart
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
      toast({
        title: "Quantity updated",
        description: `${product.name} quantity has been increased`,
      });
    } else {
      // Add new item with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    // Save to localStorage
    localStorage.setItem('dasNurseryCart', JSON.stringify(
      existingItem 
        ? cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...cart, { ...product, quantity: 1 }]
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <Hero />
        <FeaturedProducts onAddToCart={handleAddToCart} />
        <CategorySection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
