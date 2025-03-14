
import { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = () => {
    onAddToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: `${product.name} has been ${isLiked ? "removed from" : "added to"} your favorites`,
    });
  };

  return (
    <div 
      className="group bg-white rounded-lg overflow-hidden shadow-subtle hover:shadow-hover transition-all duration-500 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        
        {/* Discount badge */}
        {product.discountPercentage > 0 && (
          <span className="badge-discount">
            {product.discountPercentage}% OFF
          </span>
        )}
        
        {/* Favorite button */}
        <button 
          className={`absolute top-3 left-3 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isLiked 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-500 hover:text-red-500'
          }`}
          onClick={handleLikeToggle}
        >
          <Heart className="h-4 w-4" fill={isLiked ? 'currentColor' : 'none'} />
        </button>
        
        {/* Hover overlay */}
        <div 
          className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Button 
            onClick={handleAddToCart}
            className="bg-white text-forest hover:bg-forest hover:text-white transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-lg text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1 mb-2">{product.description}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            {product.discountPercentage > 0 && (
              <span className="price-original">₹{product.originalPrice}</span>
            )}
            <span className="price-discounted">₹{product.discountedPrice}</span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="border-leaf-200 text-forest hover:bg-leaf-100"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
