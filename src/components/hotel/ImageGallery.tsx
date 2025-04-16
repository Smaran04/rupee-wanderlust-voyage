
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Maximize } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ImageGalleryProps {
  images: string[];
  name: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, name }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  return (
    <>
      <div className="relative rounded-lg overflow-hidden">
        {/* Main Image */}
        <div className="relative h-80 md:h-96 w-full">
          <img 
            src={images[currentIndex]} 
            alt={`${name} - Image ${currentIndex + 1}`} 
            className="w-full h-full object-cover"
          />
          
          <button 
            onClick={() => setIsFullScreen(true)}
            className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
            aria-label="View full screen"
          >
            <Maximize size={18} />
          </button>
          
          {/* Navigation arrows */}
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <button 
              onClick={prevImage}
              className="bg-white/70 hover:bg-white/90 text-gray-800 p-2 rounded-full transition-colors"
              aria-label="Previous image"
            >
              <ArrowLeft size={20} />
            </button>
            <button 
              onClick={nextImage}
              className="bg-white/70 hover:bg-white/90 text-gray-800 p-2 rounded-full transition-colors"
              aria-label="Next image"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
        
        {/* Thumbnails */}
        <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-20 h-16 overflow-hidden rounded ${
                index === currentIndex ? 'ring-2 ring-travel-500' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <img 
                src={image} 
                alt={`${name} - Thumbnail ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
      
      {/* Fullscreen Modal */}
      <Dialog open={isFullScreen} onOpenChange={setIsFullScreen}>
        <DialogContent className="max-w-5xl bg-black/95 border-none p-0 sm:p-0">
          <div className="relative w-full h-[80vh]">
            <img 
              src={images[currentIndex]} 
              alt={`${name} - Fullscreen ${currentIndex + 1}`} 
              className="w-full h-full object-contain"
            />
            
            {/* Navigation arrows */}
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <button 
                onClick={prevImage}
                className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                aria-label="Previous image"
              >
                <ArrowLeft size={24} />
              </button>
              <button 
                onClick={nextImage}
                className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                aria-label="Next image"
              >
                <ArrowRight size={24} />
              </button>
            </div>
            
            {/* Image counter */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;
