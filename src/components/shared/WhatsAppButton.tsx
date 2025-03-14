
import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const phoneNumber = '+919876543210'; // Replace with actual phone number
  
  useEffect(() => {
    const showButton = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', showButton);
    
    // Animation interval
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 5000);
    
    return () => {
      window.removeEventListener('scroll', showButton);
      clearInterval(interval);
    };
  }, []);
  
  const openWhatsApp = () => {
    const message = "Hello! I'm interested in your plants.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <div 
      className={`fixed bottom-6 right-6 z-40 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      <Button
        onClick={openWhatsApp}
        className={`h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#22c55e] text-white shadow-lg flex items-center justify-center transition-all duration-300 ${
          isAnimating ? 'animate-bounce' : ''
        }`}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      <span className="absolute -top-12 right-0 bg-white px-3 py-2 rounded-lg shadow-md text-sm whitespace-nowrap font-medium animate-fade-in">
        Chat with us!
      </span>
    </div>
  );
};

export default WhatsAppButton;
