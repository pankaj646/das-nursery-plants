
import { useState } from 'react';
import { ShoppingBag, TruckIcon } from 'lucide-react';
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
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + (item.discountedPrice * item.quantity), 0);
  const deliveryCharge = subtotal > 500 ? 0 : 50;
  const total = subtotal + deliveryCharge;
  
  const handleCheckout = () => {
    onCheckout(name, address, phone);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-subtle p-6">
      <h2 className="text-xl font-serif font-semibold mb-6 flex items-center gap-2">
        <ShoppingBag className="h-5 w-5 text-forest" />
        Order Summary
      </h2>
      
      {/* Item summary */}
      <div className="space-y-3 mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm">
            <span className="flex-grow">
              {item.name} <span className="text-gray-500">× {item.quantity}</span>
            </span>
            <span className="font-medium">₹{item.discountedPrice * item.quantity}</span>
          </div>
        ))}
      </div>
      
      <Separator className="my-4" />
      
      {/* Pricing breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600 flex items-center gap-1">
            <TruckIcon className="h-3.5 w-3.5" />
            Delivery Fee
          </span>
          {deliveryCharge === 0 ? (
            <span className="text-green-600">FREE</span>
          ) : (
            <span>₹{deliveryCharge}</span>
          )}
        </div>
        
        {subtotal < 500 && (
          <p className="text-xs text-gray-500">
            Add items worth ₹{500 - subtotal} more for free delivery
          </p>
        )}
      </div>
      
      <Separator className="my-4" />
      
      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="font-medium">Total</span>
        <span className="text-xl font-bold text-forest">₹{total}</span>
      </div>
      
      {/* Delivery details */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="text-sm font-medium mb-1 block">Full Name</label>
          <Input
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-gray-200"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Delivery Address</label>
          <Input
            placeholder="Enter your full address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border-gray-200"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Phone Number</label>
          <Input
            placeholder="Enter your phone number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border-gray-200"
          />
        </div>
      </div>
      
      {/* Checkout button */}
      <Button 
        className="w-full bg-forest hover:bg-forest/90"
        disabled={cartItems.length === 0 || !name || !address || !phone}
        onClick={handleCheckout}
      >
        Place Order via WhatsApp
      </Button>
    </div>
  );
};

export default CartSummary;
