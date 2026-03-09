"use client"
import { useState } from "react";
import { Heart, Share2 } from "lucide-react";
import ProductImageGallery from "@/components/ProductImageGallery";
import QuantitySelector from "@/components/QuantitySelector";
import {toast} from "sonner"
import { addToCart } from "@/lib/db/order"
import { useSession, signIn, signOut } from "next-auth/react";

export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  color: string;
  pictures: string[];
  size: ProductSize;
  stock_quantity: number;
  created_at: string;
};

const ProductDetailCard = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);
  
  const { data: session } = useSession();

  return (
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left - Images */}
          <ProductImageGallery images={product.pictures} productName={product.name} />
          {/* Right - Info */}
          <div className="flex flex-col gap-8 lg:pt-2">
            {/* Title & Actions */}
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl font-medium leading-tight">{product.name}</h1>
              <div className="flex gap-3 pt-1">
                <button className="text-muted-foreground transition-colors hover:text-foreground">
                  <Share2 className="h-5 w-5" />
                </button>
                <button className="text-muted-foreground transition-colors hover:text-foreground">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Color */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Color</span>
              <div
                className="h-6 w-6 border border-border"
                style={{ backgroundColor: product.color }}
              />
            </div>

            {/* Size */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium tracking-wide uppercase text-muted-foreground">Size</span>
              <span className="text-sm font-medium">{product.size}</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold">
                ₦{product.price.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
              </span>
            </div>

            {/* Stock & Quantity */}
            <div className="flex items-center gap-6">
              <QuantitySelector quantity={quantity} max={product.stock_quantity} onChange={setQuantity} />
              <span className="text-sm text-muted-foreground">
                {product.stock_quantity} in stock
              </span>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() =>
    toast.promise(
      addToCart(session?.user?.id!, product.id, quantity),
      {
        loading: "Adding to cart...",
        success: `Added ${quantity}x ${product.name} (${product.size})`,
        error: "Failed to add item"
      }
    )
  }
              className="w-full bg-foreground py-4 text-sm font-medium uppercase tracking-widest text-white transition-opacity hover:opacity-80"
            >
              Add to Cart
            </button>

            {/* Description */}
            <div className="border-t border-border pt-8">
              <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Description
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </main>
  );
};

export default ProductDetailCard