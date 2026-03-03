import { Heart } from "lucide-react";
import Link from "next/link";
import type { Product } from "./ProductDetailCard";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group flex flex-col">
      {/* Image */}
      <Link href={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <img
          src={product.pictures[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Wishlist */}
        <button
          className="absolute right-3 top-3 z-10 text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Heart className="h-5 w-5" />
        </button>

        {/* Description overlay — starts at 50%, fades to bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-1/2 flex flex-col justify-end translate-y-full opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          {/* Gradient fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

          {/* Content */}
          <div className="pointer-events-auto relative flex flex-col gap-2 px-4 pb-4 pt-10">
            <p className="line-clamp-3 text-xs leading-relaxed text-white/85">
              {product.description}
            </p>
            <span className="text-xs font-medium uppercase tracking-wide text-white underline underline-offset-2">
              Show more
            </span>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col gap-1 pt-3">
        {/* Color swatch */}
        <div className="flex items-center gap-2">
          <div
            className="h-4 w-4 border border-border"
            style={{ backgroundColor: product.color }}
          />
          <span className="text-xs uppercase text-muted-foreground">{product.size}</span>
        </div>

         <Link href={`/product/${product.id}`} className="hover:underline">
          <h3 className="text-sm font-medium leading-snug">{product.name}</h3>
        </Link>

        <span className="text-sm font-semibold">
          ₦{product.price.toLocaleString("en-NG")}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
