import { ProductSize } from "./ProductDetailCard";

const SIZES: ProductSize[] = ["S", "M", "L", "XL"];

interface SizeSelectorProps {
  selected: ProductSize;
  onSelect: (size: ProductSize) => void;
}

const SizeSelector = ({ selected, onSelect }: SizeSelectorProps) => {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium tracking-wide uppercase text-muted-foreground">Size</span>
      <div className="flex gap-2">
        {SIZES.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={`flex h-12 w-12 items-center justify-center border text-sm font-medium transition-all ${
              size === selected
                ? "border-foreground bg-foreground text-primary-foreground"
                : "border-border bg-background text-foreground hover:border-foreground"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
