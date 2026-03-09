'use client'
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  max: number;
  onChange: (q: number) => void;
}

const QuantitySelector = ({ quantity, max, onChange }: QuantitySelectorProps) => {
  return (
    <div className="flex items-center border border-border">
      <button
        onClick={() => onChange(Math.max(1, quantity - 1))}
        disabled={quantity <= 1}
        className="flex h-12 w-12 items-center justify-center text-foreground transition-colors hover:bg-secondary disabled:opacity-30"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="flex h-12 w-12 items-center justify-center border-x border-border text-sm font-medium">
        {quantity}
      </span>
      <button
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        className="flex h-12 w-12 items-center justify-center text-foreground transition-colors hover:bg-secondary disabled:opacity-30"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};

export default QuantitySelector;
