"use client"
import Link from "next/link";
import { ArrowLeft, Package, Check, Truck, CreditCard, Clock } from "lucide-react";
import { toast } from "sonner";
import { updateOrderStatus } from "@/lib/db/order";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type OrderStatus = "pending" | "paid" | "shipped" | "delivered";

interface OrderProduct {
  id: string;
  name: string;
  size: string;
  color: string;
  price: number;
  pictures: string[];
  description: string;
}

interface OrderItem {
  id: string;
  quantity: number;
  product: OrderProduct;
}

interface Order {
  id: string;
  status: OrderStatus;
  created_at: string;
  shippingAddress: string;
  order_items: OrderItem[];
}

const STATUS_STEPS: { key: OrderStatus; label: string; icon: React.ElementType }[] = [
  { key: "pending", label: "Pending", icon: Clock },
  { key: "paid", label: "Paid", icon: CreditCard },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: Check },
];

const Orders = ({orders}: {orders: Order[]}) => {
  const {data:session} = useSession()
  const router = useRouter()

  const handleConfirmDelivery = (orderId: string) => {
    updateOrderStatus(orderId, "delivered")
    toast.success("Delivery confirmed! Thank you.");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-[0.2em] uppercase">
            No Signal
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8 flex items-center gap-3">
          <Package className="h-5 w-5" />
          <h1 className="text-xl font-semibold">My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">You haven't placed any orders yet.</p>
            <Link href="/products" className="mt-4 inline-block text-sm underline underline-offset-4 hover:text-foreground">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} onConfirmDelivery={handleConfirmDelivery} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

/* ── Order Card ── */

const OrderCard = ({
  order,
  onConfirmDelivery,
}: {
  order: Order;
  onConfirmDelivery: (id: string) => void;
}) => {
  const totalAmount = order.order_items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const statusIndex = STATUS_STEPS.findIndex((s) => s.key === order.status);

  return (
    <div className="border border-border">
      {/* Order header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-6 py-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold">{order.id}</span>
          
<span className="text-xs text-muted-foreground">
  {new Date(order.created_at.replace(" ", "T")).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
</span>

        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold">₦{totalAmount.toLocaleString("en-NG")}</span>
          <span
            className={`px-2.5 py-1 text-xs font-medium uppercase tracking-wide ${
              order.status === "delivered"
                ? "bg-foreground text-primary-foreground"
                : order.status === "shipped"
                ? "bg-secondary text-foreground"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-6 py-6">
        <div className="flex items-center">
          {STATUS_STEPS.map((step, i) => {
            const isCompleted = i <= statusIndex;
            const Icon = step.icon;

            return (
              <div key={step.key} className="flex flex-1 items-center">
                {/* Step circle */}
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`flex h-8 w-8 items-center justify-center transition-colors ${
                      isCompleted
                        ? "bg-foreground text-primary-foreground"
                        : "border border-border text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span
                    className={`text-[10px] font-medium uppercase tracking-wide ${
                      isCompleted ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connector line */}
                {i < STATUS_STEPS.length - 1 && (
                  <div
                    className={`mx-1 h-px flex-1 transition-colors ${
                      i < statusIndex ? "bg-foreground" : "bg-border"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Items */}
      <div className="border-t border-border px-6 py-4">
        <div className="flex flex-col gap-3">
          {order.order_items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="h-14 w-11 flex-shrink-0 overflow-hidden bg-secondary">
                <img
                  src={item.product.pictures[0]}
                  alt={item.product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm font-medium">{item.product.name}</span>
                <div className="flex items-center gap-2">
                  <div
                    className="h-2.5 w-2.5 border border-border"
                    style={{ backgroundColor: item.product.color }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {item.product.size} · Qty {item.quantity}
                  </span>
                </div>
              </div>
              <span className="text-sm font-semibold">
                ₦{(item.product.price * item.quantity).toLocaleString("en-NG")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping address */}
      <div className="border-t border-border px-6 py-4">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">Ships to</span>
        <p className="mt-1 text-sm">{order.shippingAddress}</p>
      </div>

      {/* Confirm delivery button */}
      {order.status === "shipped" && (
        <div className="border-t border-border px-6 py-4">
          <button
            onClick={() => onConfirmDelivery(order.id)}
            className="w-full bg-foreground py-3.5 text-sm font-medium uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-80"
          >
            I Have Received the Delivery
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;
