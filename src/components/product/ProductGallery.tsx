import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, Pause, Play } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Slider } from "@/components/ui/slider";
interface ProductGalleryProps {
  images: string[];
  thumbnails: string[];
}
export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  thumbnails
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const [scrollSpeed, setScrollSpeed] = useState(3); // Default to 3 seconds

  const handleThumbnailClick = (index: number) => {
    setCurrentImage(index);
  };
  const nextImage = useCallback(() => {
    setCurrentImage(prev => prev < images.length - 1 ? prev + 1 : 0);
  }, [images.length]);
  const prevImage = () => {
    setCurrentImage(prev => prev > 0 ? prev - 1 : images.length - 1);
  };
  const handleSpeedChange = (value: number[]) => {
    // Convert slider value to seconds (1-5 seconds)
    setScrollSpeed(value[0]);
  };
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoScroll && !isZoomed) {
      interval = setInterval(() => {
        nextImage();
      }, scrollSpeed * 1000); // Convert to milliseconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoScroll, isZoomed, nextImage, scrollSpeed]);
  const toggleAutoScroll = () => {
    setAutoScroll(!autoScroll);
  };
  return <div className="mb-0">
      <div className="relative w-full h-[329px] mb-4 overflow-hidden rounded-xl shadow-md">
        {images.map((image, index) => <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${index === currentImage ? "opacity-100" : "opacity-0"}`}>
            <img src={image} alt={`Product view ${index + 1}`} className={`w-full h-full object-cover rounded-xl ${isZoomed ? "scale-125 cursor-zoom-out" : "cursor-zoom-in"} transition-transform duration-300`} onClick={() => setIsZoomed(!isZoomed)} />
          </div>)}
        
        <div className="absolute inset-0 flex items-center justify-between opacity-0 hover:opacity-100 transition-opacity duration-200 px-[16px]">
          <button className="w-9 h-9 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors" onClick={prevImage} aria-label="Previous image">
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors" onClick={nextImage} aria-label="Next image">
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
        
        <div className="absolute bottom-3 left-3 flex space-x-2">
          <button className="w-9 h-9 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors" aria-label={autoScroll ? "Pause auto-scroll" : "Start auto-scroll"} onClick={toggleAutoScroll}>
            {autoScroll ? <Pause className="w-4 h-4 text-gray-700" /> : <Play className="w-4 h-4 text-gray-700" />}
          </button>
        </div>
      </div>

      <Carousel className="w-full max-w-[342px] mx-auto">
        <CarouselContent className="gap-2 px-[24px] py-[5px]">
          {thumbnails.map((thumbnail, index) => <CarouselItem key={index} className="basis-1/4 pl-1 px-[2px]">
              <button className={`relative w-full aspect-square rounded-lg overflow-hidden transition-all duration-300 ${index === currentImage ? "ring-2 ring-black scale-105" : "opacity-70 hover:opacity-100"}`} onClick={() => handleThumbnailClick(index)}>
                <img src={thumbnail} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                {index === currentImage && <div className="absolute inset-0 bg-black/10" />}
              </button>
            </CarouselItem>)}
        </CarouselContent>
      </Carousel>
      
      
    </div>;
};