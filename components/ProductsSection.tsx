"use client"
import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import ProductCard from "./ProductCard";
import { Slider } from "@/components/ui/slider";
import type { Product } from "./ProductDetailCard";

const MIN_PRICE = 0;
const MAX_PRICE = 30000;

const ProductsSection = ({ products }: { products: Product[] }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  const [priceOpen, setPriceOpen] = useState(false);
  const priceRef = useRef<HTMLDivElement>(null);

  const hasActiveFilter = priceRange[0] !== MIN_PRICE || priceRange[1] !== MAX_PRICE;

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (priceRef.current && !priceRef.current.contains(e.target as Node)) {
        setPriceOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
  }, [priceRange]);

  return (
    <div className="min-h-screen bg-background">

      {/* Filter bar — horizontal chips */}
      <div className="border-b border-border px-6 py-3">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />

          {/* Price chip / dropdown */}
          <div ref={priceRef} className="relative">
            <button
              onClick={() => setPriceOpen(!priceOpen)}
              className={`flex items-center gap-1.5 border px-4 py-1.5 text-sm transition-colors ${
                hasActiveFilter
                  ? "border-foreground bg-foreground text-primary-foreground"
                  : "border-border hover:bg-secondary"
              }`}
            >
              Price
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            {priceOpen && (
              <div className="absolute left-0 top-full z-50 mt-2 w-72 border border-border bg-background p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">Price Range</span>
                  {hasActiveFilter && (
                    <button
                      onClick={() => setPriceRange([MIN_PRICE, MAX_PRICE])}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                      Clear
                    </button>
                  )}
                </div>
                <Slider
                  min={MIN_PRICE}
                  max={MAX_PRICE}
                  step={500}
                  value={priceRange}
                  onValueChange={(val) => setPriceRange(val as [number, number])}
                  className="mb-3"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₦{priceRange[0].toLocaleString("en-NG")}</span>
                  <span>₦{priceRange[1].toLocaleString("en-NG")}</span>
                </div>
              </div>
            )}
          </div>

          {/* Active filter indicator */}
          {hasActiveFilter && (
            <button
              onClick={() => setPriceRange([MIN_PRICE, MAX_PRICE])}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
              Clear all
            </button>
          )}
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-6 py-8">
        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium">All Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Product grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg font-medium">No products found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your price filter
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductsSection;
