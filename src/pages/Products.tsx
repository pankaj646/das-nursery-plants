
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import ProductCard from '@/components/products/ProductCard';
import { CartProduct } from '@/components/cart/CartItem';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { allProducts, getProductsByCategory, productCategories } from '@/config/products';
import type { Product } from '@/config/products';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    
    // Get products based on category
    let products = getProductsByCategory(categoryFilter);
    
    // Filter by search term if provided
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      products = products.filter(
        product => 
          product.name.toLowerCase().includes(searchLower) || 
          product.description.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredProducts(products);
    
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
  }, [categoryFilter, searchTerm]);
  
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
    
    toast({
      title: "Direct order initiated",
      description: "You're being redirected to WhatsApp",
    });
  };
  
  // Get category name for display
  const getCategoryTitle = () => {
    if (!categoryFilter) return "All Products";
    
    const category = productCategories.find(cat => cat.id === categoryFilter);
    return category ? category.name : "Products";
  };

  // Filter by category
  const handleCategoryChange = (category: string | null) => {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemsCount={cart.length} />
      <main className="flex-grow pt-24">
        <div className="section-container">
          <h1 className="section-title">{getCategoryTitle()}</h1>
          
          {/* Search input */}
          <div className="mb-6">
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search plants and products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-forest focus-visible:ring-forest"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Category filters */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <div className="flex items-center mr-2">
              <Filter className="h-4 w-4 mr-1 text-forest" />
              <span className="text-sm font-medium">Filter:</span>
            </div>
            {productCategories.map(category => (
              <Button 
                key={category.id}
                variant={categoryFilter === category.id || (category.id === "all" && !categoryFilter) ? "default" : "outline"}
                size="sm"
                className={
                  categoryFilter === category.id || (category.id === "all" && !categoryFilter)
                    ? "bg-forest text-white" 
                    : "border-forest text-forest"
                }
                onClick={() => handleCategoryChange(category.id === "all" ? null : category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
          
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
                  <p className="text-gray-500 mt-2">Try searching for a different category or term</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={handleAddToCart}
                      onDirectOrder={handleDirectOrder}
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
