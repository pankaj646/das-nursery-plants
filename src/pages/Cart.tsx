
import { useState, useEffect } from 'react';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartItem, { CartProduct } from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import { toast } from '@/hooks/use-toast';

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('dasNurseryCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  
  const handleUpdateQuantity = (id: number, quantity: number) => {
    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    );
    
    setCartItems(updatedItems);
    localStorage.setItem('dasNurseryCart', JSON.stringify(updatedItems));
  };
  
  const handleRemoveItem = (id: number) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    
    setCartItems(updatedItems);
    localStorage.setItem('dasNurseryCart', JSON.stringify(updatedItems));
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    });
  };
  
  const handleCheckout = (address: string, phone: string) => {
    // Format the order message for WhatsApp
    const orderItems = cartItems.map(item => {
      const originalPrice = item.discountPercentage > 0 
        ? `~~₹${item.originalPrice}~~ ` 
        : '';
      
      return `${item.quantity}x ${item.name} – ${originalPrice}₹${item.discountedPrice} ${
        item.discountPercentage > 0 ? `(${item.discountPercentage}% OFF)` : ''
      }`;
    }).join('\n');
    
    const subtotal = cartItems.reduce((total, item) => 
      total + (item.discountedPrice * item.quantity), 0
    );
    
    const deliveryCharge = subtotal > 500 ? 0 : 50;
    const total = subtotal + deliveryCharge;
    
    const orderMessage = `
🛒 Order from Das Nursery
🌿 Items Ordered:
${orderItems}
💰 Total Price: ₹${subtotal}
🚚 Delivery Charge: ₹${deliveryCharge} ${deliveryCharge === 0 ? '(Free above ₹500)' : ''}
💵 Final Amount: ₹${total}
📍 Delivery Address: ${address}
📞 Phone Number: ${phone}
    `;
    
    // Generate WhatsApp URL
    const phoneNumber = '+919876543210'; // Replace with actual WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderMessage.trim())}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Clear cart after order is placed
    localStorage.removeItem('dasNurseryCart');
    setCartItems([]);
    
    toast({
      title: "Order placed",
      description: "Your order has been sent via WhatsApp",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemsCount={cartItems.length} />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-semibold mb-8 flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            Shopping Cart
          </h1>
          
          {isLoading ? (
            // Loading skeleton
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-grow space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 animate-pulse">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-gray-200 rounded-md" />
                      <div className="flex-grow space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/3" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                        <div className="h-3 bg-gray-200 rounded w-1/4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="lg:w-96 h-96 bg-white rounded-lg animate-pulse" />
            </div>
          ) : (
            <>
              {cartItems.length === 0 ? (
                <div className="text-center py-16 space-y-6">
                  <div className="mx-auto w-24 h-24 bg-leaf-100 rounded-full flex items-center justify-center">
                    <ShoppingCart className="h-10 w-10 text-leaf-500" />
                  </div>
                  <h2 className="text-2xl font-serif font-medium">Your cart is empty</h2>
                  <p className="text-gray-500 max-w-sm mx-auto">
                    Looks like you haven't added any plants to your cart yet.
                  </p>
                  <Link to="/products">
                    <Button className="bg-forest hover:bg-forest/90 mt-4">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Cart Items */}
                  <div className="flex-grow">
                    <div className="bg-white rounded-lg p-4 mb-4 shadow-subtle">
                      <div className="flex items-center justify-between">
                        <h2 className="font-medium">Shopping Cart ({cartItems.length} items)</h2>
                        <Link to="/products" className="text-forest text-sm flex items-center hover:underline">
                          <ArrowLeft className="mr-1 h-4 w-4" />
                          Continue Shopping
                        </Link>
                      </div>
                    </div>
                    
                    {cartItems.map(item => (
                      <CartItem 
                        key={item.id} 
                        item={item} 
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemove={handleRemoveItem}
                      />
                    ))}
                  </div>
                  
                  {/* Order Summary */}
                  <div className="lg:w-96">
                    <CartSummary 
                      cartItems={cartItems}
                      onCheckout={handleCheckout}
                    />
                  </div>
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

export default Cart;
