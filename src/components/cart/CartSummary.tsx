
import { useState } from 'react';
import { ShoppingBag, TruckIcon, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CartProduct } from './CartItem';
import { Separator } from '@/components/ui/separator';

interface CartSummaryProps {
  cartItems: CartProduct[];
  onCheckout: (name: string, address: string, phone: string) => void;
}

const CartSummary = ({ cartItems, onCheckout }: CartSummaryProps) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [formFocused, setFormFocused] = useState<string | null>(null);
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + (item.discountedPrice * item.quantity), 0);
  const deliveryCharge = subtotal > 500 ? 0 : 50;
  const total = subtotal + deliveryCharge;
  
  const handleCheckout = () => {
    onCheckout(name, address, phone);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-subtle transition-all duration-300 hover:shadow-hover p-6 animate-fade-in">
      <h2 className="text-xl font-serif font-semibold mb-6 flex items-center gap-2 bg-gradient-to-r from-forest to-leaf-500 bg-clip-text text-transparent">
        <ShoppingBag className="h-5 w-5 text-forest" />
        Order Summary
      </h2>
      
      {/* Item summary */}
      <div className="space-y-3 mb-6 stagger-children">
        {cartItems.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center justify-between text-sm bg-leaf-50 p-2 rounded-md transition-all duration-300 hover:bg-leaf-100"
          >
            <span className="flex-grow font-medium text-charcoal">
              {item.name} <span className="text-gray-500">× {item.quantity}</span>
            </span>
            <span className="font-bold text-forest">₹{item.discountedPrice * item.quantity}</span>
          </div>
        ))}
      </div>
      
      <Separator className="my-4 bg-leaf-100" />
      
      {/* Pricing breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">₹{subtotal}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600 flex items-center gap-1">
            <TruckIcon className="h-3.5 w-3.5" />
            Delivery Fee
          </span>
          {deliveryCharge === 0 ? (
            <span className="text-green-600 font-medium flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5" />
              FREE
            </span>
          ) : (
            <span>₹{deliveryCharge}</span>
          )}
        </div>
        
        {subtotal < 500 && (
          <p className="text-xs text-gray-500 bg-leaf-50 p-2 rounded animate-pulse">
            Add items worth ₹{500 - subtotal} more for free delivery
          </p>
        )}
      </div>
      
      <Separator className="my-4 bg-leaf-100" />
      
      {/* Total */}
      <div className="flex justify-between items-center mb-6 bg-leaf-50 p-3 rounded-md">
        <span className="font-medium">Total</span>
        <span className="text-xl font-bold bg-gradient-to-r from-forest to-leaf-600 bg-clip-text text-transparent">₹{total}</span>
      </div>
      
      {/* Delivery details */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="text-sm font-medium mb-1 block text-forest">Full Name</label>
          <Input
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setFormFocused('name')}
            onBlur={() => setFormFocused(null)}
            className={`border-gray-200 transition-all duration-300 ${
              formFocused === 'name' ? 'border-forest ring-1 ring-forest/20' : ''
            }`}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block text-forest">Delivery Address</label>
          <Input
            placeholder="Enter your full address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onFocus={() => setFormFocused('address')}
            onBlur={() => setFormFocused(null)}
            className={`border-gray-200 transition-all duration-300 ${
              formFocused === 'address' ? 'border-forest ring-1 ring-forest/20' : ''
            }`}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block text-forest">Phone Number</label>
          <Input
            placeholder="Enter your phone number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onFocus={() => setFormFocused('phone')}
            onBlur={() => setFormFocused(null)}
            className={`border-gray-200 transition-all duration-300 ${
              formFocused === 'phone' ? 'border-forest ring-1 ring-forest/20' : ''
            }`}
          />
        </div>
      </div>
      
      {/* Checkout button */}
      <Button 
        className="w-full bg-forest hover:bg-forest/90 hover:scale-[1.01] transition-all duration-300 group relative overflow-hidden"
        disabled={cartItems.length === 0 || !name || !address || !phone}
        onClick={handleCheckout}
      >
        <span className="relative z-10 flex items-center gap-2">
          <ShoppingBag className="h-4 w-4 transition-transform group-hover:rotate-12" />
          Place Order via WhatsApp
        </span>
        <span className="absolute inset-0 bg-green-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
      </Button>
    </div>
  );
};

export default CartSummary;
