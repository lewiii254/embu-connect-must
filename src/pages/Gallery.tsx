import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ImageIcon, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Gallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const { data: images, isLoading } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handlePrevious = () => {
    if (selectedImageIndex !== null && images) {
      setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length);
    }
  };

  const handleNext = () => {
    if (selectedImageIndex !== null && images) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <ImageIcon className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">Gallery</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Capturing moments and memories from our community events
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading gallery...</div>
          ) : images && images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map((image, index) => (
                <Card 
                  key={image.id} 
                  className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={image.image_url}
                      alt={image.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{image.title}</h3>
                    {image.description && (
                      <p className="text-sm text-muted-foreground">{image.description}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="max-w-md mx-auto">
              <CardContent className="pt-6 text-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No images in the gallery yet. Check back soon for exciting photos from our events!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={() => setSelectedImageIndex(null)}>
        <DialogContent className="max-w-7xl w-full p-0 bg-black/95 border-none">
          <div className="relative w-full h-[90vh] flex items-center justify-center">
            {selectedImageIndex !== null && images && (
              <>
                <img
                  src={images[selectedImageIndex].image_url}
                  alt={images[selectedImageIndex].title}
                  className="max-w-full max-h-full object-contain"
                />
                
                {/* Navigation Buttons */}
                {images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white h-12 w-12 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevious();
                      }}
                    >
                      <ChevronLeft className="h-8 w-8" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white h-12 w-12 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                    >
                      <ChevronRight className="h-8 w-8" />
                    </Button>
                  </>
                )}

                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-white text-xl font-semibold mb-2">
                    {images[selectedImageIndex].title}
                  </h3>
                  {images[selectedImageIndex].description && (
                    <p className="text-white/80">{images[selectedImageIndex].description}</p>
                  )}
                  <p className="text-white/60 text-sm mt-2">
                    {selectedImageIndex + 1} / {images.length}
                  </p>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
