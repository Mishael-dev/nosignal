"use client"
import { useState } from "react";
import Link from "next/link";
import { Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import QuantitySelector from "@/components/QuantitySelector";
import { removeFromCart, increaseCartProductQuantity, decreaseCartProductQuantity, clearCartItems} from "@/lib/db/order";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface CartProduct {
  id: string;
  name: string;
  size: string;
  color: string;
  price: number;
  pictures: string[];
  description: string;
}

interface CartItem {
  id: string;
  quantity: number;
  product: CartProduct;
}


const Cart = ({items}: {items: CartItem[]}) => {
  
  const {data: session} = useSession()
  const userId = session?.user?.id!

  const router = useRouter();

  const  removeItem = async (cartItemId: string) => {
    await removeFromCart(userId, cartItemId)
    router.refresh()
  };

  

  const updateQuantity = async (orderItemId: string, newQuantity: number, currentQuantity: number) => {
    console.log("nq", newQuantity)
  try {
    if (newQuantity > currentQuantity) {
      // increment by 1
      await increaseCartProductQuantity(userId, orderItemId);
    } else if (newQuantity < currentQuantity) {
      // decrement by 1
      await decreaseCartProductQuantity(userId, orderItemId);
    }
    // Optionally, refresh server component or update local state
    router.refresh();
  } catch (err) {
    console.error("Failed to update quantity:", err);
  }
};

  const clearCart = async () => {
   await clearCartItems(userId)
   router.refresh();
  };

  const totalAmount = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-[0.2em] uppercase">
            No Signal
          </Link>
          <Link href="/products" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="mb-10 text-2xl font-medium">Cart ({items.length})</h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-6 py-20">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/40" />
            <p className="text-muted-foreground">Your cart is empty</p>
            <Link
              href="/products"
              className="bg-foreground px-8 py-3 text-sm font-medium uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-80"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
            {/* Items */}
            <div className="flex flex-col">
              {/* Column headers */}
              <div className="hidden border-b border-border pb-4 text-xs font-medium uppercase tracking-wide text-muted-foreground sm:grid sm:grid-cols-[1fr_140px_100px_40px] sm:gap-6">
                <span>Product</span>
                <span>Quantity</span>
                <span className="text-right">Total</span>
                <span />
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[80px_1fr] gap-4 border-b border-border py-6 sm:grid-cols-[80px_1fr_140px_100px_40px] sm:gap-6"
                >
                  {/* Image */}
                  <Link href={`/product/${item.product.id}`} className="aspect-[3/4] overflow-hidden bg-secondary">
                    <img
                      src={item.product.pictures[0]}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex flex-col gap-1 sm:justify-center">
                    <Link href={`/product/${item.product.id}`} className="text-sm font-medium hover:underline">
                      {item.product.name}
                    </Link>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 border border-border"
                        style={{ backgroundColor: item.product.color }}
                      />
                      <span className="text-xs text-muted-foreground">{item.product.size}</span>
                    </div>
                    <span className="text-sm font-semibold sm:hidden">
                      ₦{(item.product.price * item.quantity).toLocaleString("en-NG")}
                    </span>
                    {/* Mobile quantity & remove */}
                    <div className="mt-2 flex items-center gap-4 sm:hidden">
                      <QuantitySelector
  quantity={item.quantity}
  max={99}
  onChange={(q) => updateQuantity(item.id, q, item.quantity)}
/>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Quantity — desktop */}
                  <div className="hidden items-center sm:flex">
                    <QuantitySelector
                      quantity={item.quantity}
                      max={99}
                       onChange={(q) => updateQuantity(item.id, q, item.quantity)}
                    />
                  </div>

                  {/* Line total — desktop */}
                  <div className="hidden items-center justify-end sm:flex">
                    <span className="text-sm font-semibold">
                      ₦{(item.product.price * item.quantity).toLocaleString("en-NG")}
                    </span>
                  </div>

                  {/* Remove — desktop */}
                  <div className="hidden items-center sm:flex">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="mt-4 self-start text-xs text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
              >
                Clear cart
              </button>
            </div>

            {/* Summary */}
            <div className="lg:sticky lg:top-10 lg:self-start">
              <div className="border border-border p-6">
                <h2 className="mb-6 text-sm font-medium uppercase tracking-wide">Order Summary</h2>

                <div className="flex flex-col gap-3 border-b border-border pb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₦{totalAmount.toLocaleString("en-NG")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-muted-foreground">Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between py-6 text-base font-semibold">
                  <span>Total</span>
                  <span>₦{totalAmount.toLocaleString("en-NG")}</span>
                </div>

                <button className="w-full bg-foreground py-4 text-sm font-medium uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-80">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
