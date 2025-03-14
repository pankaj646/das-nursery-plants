
import { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Send } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      setName('');
      setEmail('');
      setMessage('');
      
      toast({
        title: "Message sent",
        description: "We'll get back to you soon via WhatsApp!",
      });
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-semibold mb-8">
            Contact Us
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <div className="bg-white shadow-subtle rounded-lg p-6 mb-8">
                <h2 className="text-xl font-medium mb-6">Store Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-leaf-100 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-forest" />
                    </div>
                    <div>
                      <h3 className="font-medium">Our Location</h3>
                      <p className="text-gray-600">123 Green Street, Garden City, State - 700001</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-leaf-100 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-forest" />
                    </div>
                    <div>
                      <h3 className="font-medium">Business Hours</h3>
                      <p className="text-gray-600">Monday - Saturday: 9AM - 8PM</p>
                      <p className="text-gray-600">Sunday: 10AM - 6PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-leaf-100 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-forest" />
                    </div>
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-gray-600">+91 9876543210</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-leaf-100 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-forest" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-gray-600">contact@dasnursery.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Google Maps */}
              <div className="bg-white shadow-subtle rounded-lg p-6">
                <h2 className="text-xl font-medium mb-4">Find Us On Map</h2>
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14736.291556006792!2d88.38774863063918!3d22.572844426501675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277a67052d105%3A0xab0a228d896e0ee!2sNew%20Market%2C%20Dharmatala%2C%20Taltala%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1654235625930!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Das Nursery Location"
                  ></iframe>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white shadow-subtle rounded-lg p-6">
              <h2 className="text-xl font-medium mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    rows={5}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-forest hover:bg-forest/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>Sending<span className="loading-dots">...</span></>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
              
              {/* Reviews Section */}
              <div className="mt-12">
                <h2 className="text-xl font-medium mb-6">Customer Reviews</h2>
                <div className="space-y-4">
                  {[
                    {
                      name: 'Rahul Sharma',
                      message: 'Great selection of plants! The aloe vera I bought is thriving in my balcony.',
                      rating: 5
                    },
                    {
                      name: 'Priya Patel',
                      message: 'Excellent customer service. They helped me choose the right plants for my apartment.',
                      rating: 5
                    },
                    {
                      name: 'Ankit Gupta',
                      message: 'Fast delivery and plants were packed carefully. Will definitely order again!',
                      rating: 4
                    }
                  ].map((review, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-leaf-200 flex items-center justify-center mr-3">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-medium">{review.name}</h4>
                          <div className="flex text-yellow-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg 
                                key={i} 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} 
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">{review.message}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Subscribe Section */}
              <div className="mt-12 p-6 bg-leaf-50 rounded-lg border border-leaf-100">
                <h3 className="font-medium text-lg mb-2">Subscribe to WhatsApp Updates</h3>
                <p className="text-gray-600 mb-4">Get notified about new plants & discounts!</p>
                <div className="flex gap-2">
                  <Input
                    type="tel"
                    placeholder="Your WhatsApp number"
                    className="flex-grow"
                  />
                  <Button className="bg-forest hover:bg-forest/90 shrink-0">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Contact;
