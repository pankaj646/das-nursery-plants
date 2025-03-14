
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'Indoor Plants',
    image: 'https://images.unsplash.com/photo-1602923668104-8f9e03e77eff?q=80&w=1740&auto=format&fit=crop',
    count: 45,
    link: '/products?category=indoor'
  },
  {
    id: 2,
    name: 'Outdoor Plants',
    image: 'https://images.unsplash.com/photo-1599685315640-4a5487fdb2e8?q=80&w=1742&auto=format&fit=crop',
    count: 37,
    link: '/products?category=outdoor'
  },
  {
    id: 3,
    name: 'Succulents',
    image: 'https://images.unsplash.com/photo-1622163642998-1ea12775bfe7?q=80&w=1664&auto=format&fit=crop',
    count: 22,
    link: '/products?category=succulents'
  },
  {
    id: 4,
    name: 'Bonsai',
    image: 'https://images.unsplash.com/photo-1610173827043-609816f2cc66?q=80&w=1664&auto=format&fit=crop',
    count: 15,
    link: '/products?category=bonsai'
  },
  {
    id: 5,
    name: 'Fertilizers',
    image: 'https://images.unsplash.com/photo-1632239346203-191de3a2cbda?q=80&w=1736&auto=format&fit=crop',
    count: 18,
    link: '/products?category=fertilizers'
  },
  {
    id: 6,
    name: 'Pots & Planters',
    image: 'https://images.unsplash.com/photo-1622579522120-93eabdb1fe2b?q=80&w=1664&auto=format&fit=crop',
    count: 32,
    link: '/products?category=pots'
  },
  {
    id: 7,
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1622484212772-a25fe0c752b5?q=80&w=1740&auto=format&fit=crop',
    count: 24,
    link: '/products?category=accessories'
  }
];

const CategorySection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('category-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="category-section" 
      className="section-container bg-leaf-50 py-20 my-12"
    >
      <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="section-title mb-12">Explore Our Collections</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 stagger-children">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={category.link}
              className="group relative rounded-lg overflow-hidden shadow-subtle hover:shadow-hover transition-all duration-500"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <h3 className="font-serif text-xl md:text-2xl font-semibold mb-1 group-hover:scale-105 transition-transform duration-300">
                    {category.name}
                  </h3>
                  <p className="text-white/80 text-sm">{category.count} Products</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
