
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ImageUploader from '@/components/admin/ImageUploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { allProducts, productCategories } from '@/config/products';

const Admin = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'products' | 'images'>('products');
  
  // This would typically come from an authentication system
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  // For demo purposes - in a real app, use secure authentication
  const handleLogin = () => {
    if (password === 'admin123') { // A very simple demo password
      setIsAuthenticated(true);
      toast({
        title: "Login successful",
        description: "You now have access to admin features",
      });
    } else {
      toast({
        title: "Invalid password",
        description: "Please try again with the correct password",
        variant: "destructive"
      });
    }
  };
  
  // In a real app, this would actually save to a backend
  const handleSaveChanges = () => {
    toast({
      title: "Changes saved",
      description: "To permanently save changes, update the products.ts file",
    });
  };
  
  // Simple function to handle image upload completion
  const handleImageUploaded = (imagePath: string) => {
    console.log('Image uploaded to:', imagePath);
    // In a real app, you might update a product's image path here
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar cartItemsCount={0} />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-forest mb-6 text-center">Admin Login</h1>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full"
                />
              </div>
              
              <Button 
                onClick={handleLogin} 
                className="w-full bg-forest hover:bg-forest/90"
              >
                Login
              </Button>
              
              <p className="text-xs text-gray-500 mt-2">
                This is a demo admin page. For a real application, implement proper authentication and authorization.
                <br />
                <span className="font-medium">Demo password: admin123</span>
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemsCount={0} />
      <main className="flex-grow pt-24 pb-12">
        <div className="section-container">
          <h1 className="section-title mb-6">Admin Dashboard</h1>
          
          <div className="flex space-x-4 mb-6">
            <Button
              variant={selectedTab === 'products' ? 'default' : 'outline'}
              onClick={() => setSelectedTab('products')}
              className={selectedTab === 'products' ? 'bg-forest' : 'border-forest text-forest'}
            >
              Manage Products
            </Button>
            <Button
              variant={selectedTab === 'images' ? 'default' : 'outline'}
              onClick={() => setSelectedTab('images')}
              className={selectedTab === 'images' ? 'bg-forest' : 'border-forest text-forest'}
            >
              Upload Images
            </Button>
          </div>
          
          {selectedTab === 'products' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium text-forest">Products Configuration</h2>
                <Button onClick={() => navigate('/products')} variant="outline" className="border-forest text-forest">
                  View Products Page
                </Button>
              </div>
              
              <div className="p-4 bg-amber-50 rounded-md mb-6">
                <p className="text-amber-800 text-sm">
                  <strong>Important:</strong> This demo admin interface doesn't actually save changes permanently. 
                  To update your products, edit the <code className="bg-amber-100 px-1 rounded">src/config/products.ts</code> file 
                  directly with your changes.
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Available Categories</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {productCategories.map(category => (
                      <div key={category.id} className="p-2 bg-gray-50 rounded border text-sm">
                        {category.name}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Product List</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {allProducts.map((product) => (
                          <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{product.discountedPrice}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="h-10 w-10 rounded bg-gray-100 overflow-hidden">
                                <img src={product.image.startsWith('/') ? product.image : product.image} alt={product.name} className="h-full w-full object-cover" />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="pt-4 border-t flex justify-end">
                  <Button onClick={handleSaveChanges} className="bg-forest hover:bg-forest/90">
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {selectedTab === 'images' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-medium text-forest mb-4">Upload Product Images</h2>
              
              <ImageUploader onImageUploaded={handleImageUploaded} />
              
              <div className="mt-8">
                <h3 className="font-medium mb-2">Image Management Instructions</h3>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                  <li>Upload your product images using the tool above</li>
                  <li>Images should be stored in your project's <code className="bg-gray-100 px-1 rounded">/public/images/products/</code> folder</li>
                  <li>Create this folder if it doesn't exist already</li>
                  <li>After uploading, update the image paths in <code className="bg-gray-100 px-1 rounded">src/config/products.ts</code></li>
                  <li>For each product, change the image property to point to your uploaded file</li>
                  <li>Example: <code className="bg-gray-100 px-1 rounded">image: "/images/products/your-image.jpg"</code></li>
                  <li>Recommended image dimensions: 800x800 pixels (square)</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
