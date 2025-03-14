
import { useState } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/components/products/ProductCard';

interface CartItemProps {
  item: CartProduct;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export interface CartProduct extends Product {
  quantity: number;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };
  
  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };
  
  const handleRemove = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onRemove(item.id);
    }, 300);
  };
  
  const subtotal = item.discountedPrice * item.quantity;
  
  return (
    <div 
      className={`bg-white rounded-lg p-4 mb-4 shadow-subtle flex flex-col sm:flex-row gap-4 transform transition-all duration-500 ${
        isDeleting ? 'opacity-0 -translate-x-full' : 'opacity-100'
      }`}
    >
      {/* Product Image */}
      <div className="w-full sm:w-24 h-24 rounded-md overflow-hidden shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Details */}
      <div className="flex-grow flex flex-col sm:flex-row items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-medium text-gray-800">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.description}</p>
          <div className="flex items-center">
            {item.discountPercentage > 0 && (
              <span className="text-gray-500 line-through text-sm mr-2">₹{item.originalPrice}</span>
            )}
            <span className="text-forest font-semibold">₹{item.discountedPrice}</span>
            {item.discountPercentage > 0 && (
              <span className="ml-2 bg-forest/10 text-forest text-xs px-2 py-0.5 rounded-full">
                {item.discountPercentage}% OFF
              </span>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {/* Quantity Controller */}
          <div className="flex items-center border border-gray-200 rounded-md">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none text-gray-500"
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="h-8 w-12 flex items-center justify-center text-sm border-x border-gray-200">
              {item.quantity}
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none text-gray-500"
              onClick={handleIncrement}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          {/* Subtotal & Remove */}
          <div className="flex items-center justify-between gap-4 w-full sm:w-auto">
            <span className="font-medium">₹{subtotal}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50"
              onClick={handleRemove}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
