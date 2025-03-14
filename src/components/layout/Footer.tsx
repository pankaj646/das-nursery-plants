
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Clock, MapPin, Phone, Send, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-leaf-50 border-t border-leaf-100">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative h-10 w-10 rounded-full bg-leaf-300 flex items-center justify-center">
                <div className="h-5 w-5 text-white absolute">🌱</div>
              </div>
              <div className="font-serif font-semibold text-xl text-forest">
                Das Nursery
              </div>
            </div>
            <p className="text-gray-600 mt-4">
              Your one-stop shop for premium plants, planters, and gardening accessories. 
              Bringing nature to your doorstep since 2015.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-leaf-100 transition-colors duration-300"
              >
                <Instagram className="h-4 w-4 text-forest" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-leaf-100 transition-colors duration-300"
              >
                <Facebook className="h-4 w-4 text-forest" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-forest">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-forest transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-forest transition-colors duration-300">Products</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-forest transition-colors duration-300">Contact</Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-forest transition-colors duration-300">Cart</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-forest">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-leaf-500 mt-0.5" />
                <span className="text-gray-600">123 Green Street, Garden City, State - 123456</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-leaf-500" />
                <span className="text-gray-600">+91 9876543210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-leaf-500" />
                <span className="text-gray-600">info@dasnursery.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-leaf-500" />
                <span className="text-gray-600">9:00 AM - 8:00 PM (Every Day)</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-forest">Get Updates</h3>
            <p className="text-gray-600">
              Subscribe to receive updates on new arrivals and special offers.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white border-leaf-200"
              />
              <Button variant="default" size="icon" className="bg-forest hover:bg-forest/90">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" className="w-full border-leaf-300 text-forest hover:bg-leaf-100 flex items-center gap-2 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="h-4 w-4">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
              Subscribe on WhatsApp
            </Button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-leaf-100 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>© {currentYear} Das Nursery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
