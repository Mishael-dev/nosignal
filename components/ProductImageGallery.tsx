import { useState } from "react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-[3/4] w-full overflow-hidden bg-secondary">
        <img
          src={images[selectedIndex]}
          alt={productName}
          className="h-full w-full object-cover object-top"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`aspect-[3/4] w-20 overflow-hidden border-2 transition-all ${
                i === selectedIndex
                  ? "border-foreground"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`${productName} ${i + 1}`} className="h-full w-full object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
