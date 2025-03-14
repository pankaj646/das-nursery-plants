
import { useState } from 'react';
import { ShoppingCart, Heart, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  onDirectOrder?: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart, onDirectOrder }: ProductCardProps) => {
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

  const handleDirectOrder = () => {
    if (onDirectOrder) {
      onDirectOrder(product);
    } else {
      // Fallback direct order via WhatsApp if no handler is provided
      const message = `
🌿 I'd like to order:
${product.name} - ₹${product.discountedPrice} ${product.discountPercentage > 0 ? `(${product.discountPercentage}% OFF)` : ''}
      `;
      
      const phoneNumber = '+919876543210'; // Replace with actual WhatsApp number
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message.trim())}`;
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Direct order initiated",
        description: "You're being redirected to WhatsApp",
      });
    }
  };

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: `${product.name} has been ${isLiked ? "removed from" : "added to"} your favorites`,
    });
  };

  // Plant care tips based on category
  const getCareInfo = () => {
    switch (product.category) {
      case "indoor":
        return {
          water: "Water once a week",
          light: "Indirect sunlight",
          care: "Keep away from cold drafts"
        };
      case "outdoor": 
        return {
          water: "Water 2-3 times a week",
          light: "Full to partial sunlight",
          care: "Protect from heavy rain & wind"
        };
      case "succulents":
        return {
          water: "Water sparingly, once in 2 weeks",
          light: "Bright, indirect light",
          care: "Well-draining soil essential"
        };
      case "bonsai":
        return {
          water: "Keep soil slightly moist",
          light: "Bright, indirect sunlight",
          care: "Regular pruning recommended"
        };
      default:
        return null;
    }
  };

  const careInfo = getCareInfo();

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
          onError={(e) => {
            // Fallback for broken images
            e.currentTarget.src = "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1740&auto=format&fit=crop";
          }}
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
          className={`absolute inset-0 bg-black/20 flex items-center justify-center gap-3 transition-opacity duration-300 ${
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
          <Button 
            onClick={handleDirectOrder}
            className="bg-forest text-white hover:bg-forest/90 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
          >
            <Send className="h-4 w-4 mr-2" />
            Order Now
          </Button>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-lg text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1 mb-2">{product.description}</p>

        {/* Plant details */}
        {careInfo && (
          <div className="mt-2 mb-4">
            <Tabs defaultValue="care" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-8 bg-leaf-50">
                <TabsTrigger value="care" className="text-xs">Care</TabsTrigger>
                <TabsTrigger value="specs" className="text-xs">Details</TabsTrigger>
              </TabsList>
              <TabsContent value="care" className="pt-2">
                <ul className="text-xs text-gray-600 space-y-1">
                  <li className="flex items-center">
                    <span className="w-4 h-4 mr-2 rounded-full bg-blue-100 flex items-center justify-center">💧</span>
                    {careInfo.water}
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 mr-2 rounded-full bg-yellow-100 flex items-center justify-center">☀️</span>
                    {careInfo.light}
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 mr-2 rounded-full bg-green-100 flex items-center justify-center">🌱</span>
                    {careInfo.care}
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="specs" className="pt-2">
                <ul className="text-xs text-gray-600 space-y-1">
                  <li className="flex items-center">
                    <span className="font-semibold mr-1">Type:</span>
                    {product.category === "indoor" ? "Indoor Plant" : 
                     product.category === "outdoor" ? "Outdoor Plant" : 
                     product.category === "succulents" ? "Succulent" : 
                     product.category === "bonsai" ? "Bonsai" : 
                     "Other"}
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold mr-1">Size:</span>
                    Medium
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold mr-1">Benefits:</span>
                    {product.category === "indoor" ? "Air purification" : 
                     product.category === "outdoor" ? "Enhances garden" : 
                     product.category === "succulents" ? "Low maintenance" : 
                     product.category === "bonsai" ? "Decorative & meditative" : 
                     "Aesthetic"}
                  </li>
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        )}
        
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
