
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  onImageUploaded?: (imagePath: string) => void;
}

const ImageUploader = ({ onImageUploaded }: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.includes('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, WebP, etc.)",
        variant: "destructive"
      });
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // In a real application, you would upload the file to a server here
    simulateUpload(file);
  };

  const simulateUpload = (file: File) => {
    setUploading(true);
    
    // Simulate upload - in a real app, replace this with actual upload code
    setTimeout(() => {
      setUploading(false);
      // Generate a mock path that would come from your server
      const mockUploadedPath = `/images/products/${file.name}`;
      
      toast({
        title: "Image uploaded successfully",
        description: `File saved to ${mockUploadedPath}`,
      });
      
      if (onImageUploaded) {
        onImageUploaded(mockUploadedPath);
      }
    }, 1500);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition cursor-pointer" onClick={triggerFileInput}>
        <Input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange}
          disabled={uploading}
        />
        
        {previewUrl ? (
          <div className="relative w-full max-w-xs">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-auto rounded-md object-cover mb-2"
            />
            <div className="text-sm text-gray-500 text-center">Click to change image</div>
          </div>
        ) : (
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="mt-1 text-sm text-gray-500">
              Click to upload product image
            </p>
            <p className="text-xs text-gray-400">
              PNG, JPG, WebP up to 5MB
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={triggerFileInput} 
          disabled={uploading}
          className="bg-forest hover:bg-forest/90"
        >
          {uploading ? 'Uploading...' : 'Upload Product Image'}
        </Button>
      </div>
      
      <div className="text-xs text-gray-500 mt-2">
        <p className="font-medium mb-1">Instructions:</p>
        <ol className="list-decimal pl-4 space-y-1">
          <li>Upload product images using this tool</li>
          <li>Images will be stored in the /public/images/products/ folder</li>
          <li>Update the image paths in the src/config/products.ts file</li>
          <li>For production use, consider using a cloud storage service</li>
        </ol>
      </div>
    </div>
  );
};

export default ImageUploader;
