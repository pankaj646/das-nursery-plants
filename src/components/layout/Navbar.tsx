
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Home, Leaf, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  cartItemsCount?: number;
}

const Navbar = ({ cartItemsCount = 0 }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-subtle py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2"
          onClick={closeMenu}
        >
          <div className="relative h-10 w-10 rounded-full bg-leaf-300 flex items-center justify-center">
            <Leaf className="h-5 w-5 text-white absolute" />
          </div>
          <div className="font-serif font-semibold text-xl md:text-2xl text-forest">
            Das Nursery
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            <span className="flex items-center gap-1.5">
              <Home className="h-4 w-4" /> Home
            </span>
          </Link>
          <Link to="/products" className={`nav-link ${isActive('/products') ? 'active' : ''}`}>
            <span className="flex items-center gap-1.5">
              <Leaf className="h-4 w-4" /> Plants
            </span>
          </Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
            <span className="flex items-center gap-1.5">
              <PhoneCall className="h-4 w-4" /> Contact
            </span>
          </Link>
        </nav>

        {/* Cart Button */}
        <div className="flex items-center gap-4">
          <Link to="/cart">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2 border-leaf-300 text-forest hover:bg-leaf-100 transition-all duration-300 group"
            >
              <ShoppingCart className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
              <span className="hidden sm:inline">Cart</span>
              {cartItemsCount > 0 && (
                <span className="ml-1 bg-leaf-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out pt-20 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <nav className="flex flex-col items-center space-y-6 p-8">
          <Link 
            to="/" 
            className="text-lg font-medium flex items-center gap-2"
            onClick={closeMenu}
          >
            <Home className="h-5 w-5" /> Home
          </Link>
          <Link 
            to="/products" 
            className="text-lg font-medium flex items-center gap-2"
            onClick={closeMenu}
          >
            <Leaf className="h-5 w-5" /> Plants
          </Link>
          <Link 
            to="/contact" 
            className="text-lg font-medium flex items-center gap-2"
            onClick={closeMenu}
          >
            <PhoneCall className="h-5 w-5" /> Contact
          </Link>
          <Link 
            to="/cart" 
            className="text-lg font-medium flex items-center gap-2"
            onClick={closeMenu}
          >
            <ShoppingCart className="h-5 w-5" /> Cart
            {cartItemsCount > 0 && (
              <span className="ml-1 bg-leaf-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
