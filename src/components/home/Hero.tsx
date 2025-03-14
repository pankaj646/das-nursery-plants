
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Slideshow data for banner
const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=1740&auto=format&fit=crop',
    title: 'Premium Indoor Plants',
    subtitle: 'Transform your space with our premium selection',
    cta: 'Shop Indoor Plants',
    link: '/products'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1591454371758-644f9d123a81?q=80&w=1740&auto=format&fit=crop',
    title: 'Exclusive Ceramic Planters',
    subtitle: 'Handcrafted planters for your green friends',
    cta: 'Explore Collection',
    link: '/products'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?q=80&w=1740&auto=format&fit=crop',
    title: 'Summer Sale',
    subtitle: 'Up to 30% off on all succulents',
    cta: 'Shop Now',
    link: '/products'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fadeState, setFadeState] = useState('fade-in');

  useEffect(() => {
    if (isPaused) return;
    
    const timer = setTimeout(() => {
      setFadeState('fade-out');
      setTimeout(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        setFadeState('fade-in');
      }, 500);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [currentSlide, isPaused]);

  const handleDotClick = (index: number) => {
    setFadeState('fade-out');
    setTimeout(() => {
      setCurrentSlide(index);
      setFadeState('fade-in');
    }, 500);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide 
              ? fadeState === 'fade-in' 
                ? 'opacity-100 z-10' 
                : 'opacity-0 z-0' 
              : 'opacity-0 z-0'
          }`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Background Image with overlay gradient */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="container mx-auto px-4 text-center md:text-left">
              <div className="max-w-2xl mx-auto md:mx-0 space-y-6">
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight transition-transform duration-700 ${
                  fadeState === 'fade-in' ? 'translate-y-0' : 'translate-y-10'
                }`}>
                  {slide.title}
                </h1>
                <p className={`text-xl md:text-2xl text-white/90 transition-transform duration-700 delay-100 ${
                  fadeState === 'fade-in' ? 'translate-y-0' : 'translate-y-10'
                }`}>
                  {slide.subtitle}
                </p>
                <div className={`transition-transform duration-700 delay-200 ${
                  fadeState === 'fade-in' ? 'translate-y-0' : 'translate-y-10'
                }`}>
                  <Link to={slide.link}>
                    <Button 
                      size="lg" 
                      className="bg-white text-forest hover:bg-forest hover:text-white transition-colors duration-300 group"
                    >
                      {slide.cta}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Welcome Banner */}
      <div className="absolute bottom-8 left-0 right-0 z-20 mx-auto max-w-5xl">
        <div className="glass-card mx-4 py-4 px-6">
          <p className="text-center text-forest font-serif text-xl md:text-2xl">
            Welcome to Das Nursery – Your one-stop shop for plants & gardening!
          </p>
        </div>
      </div>
      
      {/* Slide navigation dots */}
      <div className="absolute bottom-32 left-0 right-0 z-20 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
