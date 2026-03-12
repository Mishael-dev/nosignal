'use client'
import { useState } from "react";
import { ArrowLeft, Check, MapPin, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";
import { addOrderDetails } from "@/lib/db/order";
import { useSession } from "next-auth/react";
import PaymentsButton from "./PaymentsButton";

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

interface AddressForm {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

const OrderCreate = ({orderItems}: {orderItems: CartItem[]}) => {
  const [step, setStep] = useState<1 | 2>(1);

  const {data:session} = useSession()

  const [address, setAddress] = useState<AddressForm>({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const [isPaying, setIsPaying] = useState(false);

  const totalAmount = orderItems.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  const updateAddress = (field: keyof AddressForm, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const isAddressValid =
    address.fullName.trim() !== "" &&
    address.phone.trim() !== "" &&
    address.street.trim() !== "" &&
    address.city.trim() !== "" &&
    address.state.trim() !== "";

  const handleContinueToPayment = async () => {
    //also update shiping fee
    if (!isAddressValid) {
      toast.error("Please fill in all required address fields");
      return;
    }
    
    addOrderDetails(session?.user?.id!, totalAmount, address.fullName, address.phone, address.street, address.city, address.state, address.zip)
    
    setStep(2);
  };

  
  const handlePayWithPaystack = () => {
    setIsPaying(true);
    // Simulate Paystack payment
    setTimeout(() => {
      setIsPaying(false);
      toast.success("Payment successful! Your order has been placed.");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
     

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Step Indicator */}
        <div className="mb-10 flex items-center gap-3">
          <StepBadge number={1} label="Address" active={step === 1} completed={step === 2} />
          <div className="h-px w-8 bg-border" />
          <StepBadge number={2} label="Payment" active={step === 2} completed={false} />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
          {/* Left — Step Content */}
          <div>
            {step === 1 && (
              <AddressStep
                address={address}
                onChange={updateAddress}
                onContinue={handleContinueToPayment}
                isValid={isAddressValid}
              />
            )}

            {step === 2 && (
              <PaymentStep
                address={address}
                onBack={() => setStep(1)}
                onPay={handlePayWithPaystack}
                isPaying={isPaying}
                total={totalAmount}
              />
            )}
          </div>

          {/* Right — Order Summary */}
          <div className="lg:sticky lg:top-10 lg:self-start">
            <div className="border border-border p-6">
              <h2 className="mb-6 text-sm font-medium uppercase tracking-wide">
                Order Summary
              </h2>

              <div className="flex flex-col gap-4 border-b border-border pb-6">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="h-16 w-12 flex-shrink-0 overflow-hidden bg-secondary">
                      <img
                        src={item.product.pictures[0]}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-center gap-0.5">
                      <span className="text-sm font-medium">
                        {item.product.name}
                      </span>
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
                    <span className="self-center text-sm font-semibold">
                      ₦{(item.product.price * item.quantity).toLocaleString("en-NG")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 border-b border-border py-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₦{totalAmount.toLocaleString("en-NG")}</span>
                </div>
                {/* <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-muted-foreground">
                    Calculated at checkout
                  </span>
                </div> */}
              </div>

              <div className="flex justify-between py-6 text-base font-semibold">
                <span>Total</span>
                <span>₦{totalAmount.toLocaleString("en-NG")}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

/* ── Sub-components ── */

const StepBadge = ({
  number,
  label,
  active,
  completed,
}: {
  number: number;
  label: string;
  active: boolean;
  completed: boolean;
}) => (
  <div className="flex items-center gap-2">
    <div
      className={`flex h-7 w-7 items-center justify-center text-xs font-medium transition-colors ${
        completed
          ? "bg-foreground text-primary-foreground"
          : active
          ? "border-2 border-foreground text-foreground"
          : "border border-border text-muted-foreground"
      }`}
    >
      {completed ? <Check className="h-3.5 w-3.5" /> : number}
    </div>
    <span
      className={`text-sm font-medium ${
        active || completed ? "text-foreground" : "text-muted-foreground"
      }`}
    >
      {label}
    </span>
  </div>
);

const AddressStep = ({
  address,
  onChange,
  onContinue,
  isValid,
}: {
  address: AddressForm;
  onChange: (field: keyof AddressForm, value: string) => void;
  onContinue: () => void;
  isValid: boolean;
}) => (
  <div>
    <div className="mb-6 flex items-center gap-3">
      <MapPin className="h-5 w-5 text-muted-foreground" />
      <h2 className="text-lg font-medium">Shipping Address</h2>
    </div>

    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Label htmlFor="fullName" className="mb-1.5 block text-xs uppercase tracking-wide text-muted-foreground">
          Full Name *
        </Label>
        <Input
          id="fullName"
          value={address.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
          placeholder="John Doe"
        />
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor="phone" className="mb-1.5 block text-xs uppercase tracking-wide text-muted-foreground">
          Phone Number *
        </Label>
        <Input
          id="phone"
          type="tel"
          value={address.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="+234 800 000 0000"
        />
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor="street" className="mb-1.5 block text-xs uppercase tracking-wide text-muted-foreground">
          Street Address *
        </Label>
        <Input
          id="street"
          value={address.street}
          onChange={(e) => onChange("street", e.target.value)}
          placeholder="12 Admiralty Way, Lekki Phase 1"
        />
      </div>

      <div>
        <Label htmlFor="city" className="mb-1.5 block text-xs uppercase tracking-wide text-muted-foreground">
          City *
        </Label>
        <Input
          id="city"
          value={address.city}
          onChange={(e) => onChange("city", e.target.value)}
          placeholder="Lagos"
        />
      </div>

      <div>
        <Label htmlFor="state" className="mb-1.5 block text-xs uppercase tracking-wide text-muted-foreground">
          State *
        </Label>
        <Input
          id="state"
          value={address.state}
          onChange={(e) => onChange("state", e.target.value)}
          placeholder="Lagos"
        />
      </div>

      <div>
        <Label htmlFor="zip" className="mb-1.5 block text-xs uppercase tracking-wide text-muted-foreground">
          Postal Code
        </Label>
        <Input
          id="zip"
          value={address.zip}
          onChange={(e) => onChange("zip", e.target.value)}
          placeholder="101233"
        />
      </div>
    </div>

    <button
      onClick={onContinue}
      disabled={!isValid}
      className="mt-8 w-full bg-foreground py-4 text-sm font-medium uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      Continue to Payment
    </button>
  </div>
);

function PaymentStep({
  address,
  onBack,
  onPay,
  isPaying,
  total,
}: {
  address: AddressForm;
  onBack: () => void;
  onPay: () => void;
  isPaying: boolean;
  total: number;
}){
  const {data:session} = useSession()

  const paymentsButtonProps = {
    email: session?.user?.email!,
    amount: total * 100,
    currency: "NGN",
    metadata: {
      custom_fields: [
        { display_name: "Name", variable_name: "name", value: address.fullName },
        { display_name: "Phone", variable_name: "phone", value: address.phone },
      ],
    },
    text: `Pay ₦${total.toLocaleString("en-NG")}`,
    onSuccess: async (ref: any) => {
  try {
    const res = await fetch("/api/payments/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reference: ref.reference,
        userId: session?.user?.id,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Payment Successful!");
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
  }
},
    onClose: () => alert("Payment cancelled"),
  }

  
  return <div>
    {/* Address summary */}
    <div className="mb-8 border border-border p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium uppercase tracking-wide">
            Shipping To
          </span>
        </div>
        <button
          onClick={onBack}
          className="text-xs text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
        >
          Edit
        </button>
      </div>
      <div className="text-sm leading-relaxed text-muted-foreground">
        <p className="font-medium text-foreground">{address.fullName}</p>
        <p>{address.street}</p>
        <p>
          {address.city}, {address.state} {address.zip}
        </p>
        <p>{address.phone}</p>
      </div>
    </div>

    {/* Payment */}
    <div className="mb-6 flex items-center gap-3">
      <CreditCard className="h-5 w-5 text-muted-foreground" />
      <h2 className="text-lg font-medium">Payment</h2>
    </div>

    <p className="mb-6 text-sm text-muted-foreground">
      You will be redirected to Paystack to complete your payment securely.
    </p>

    <div>

    </div>

    <PaymentsButton onClick={onPay}
      disabled={isPaying}
      className="w-full bg-foreground py-4 text-sm font-medium uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-80 disabled:opacity-60"
    componentProps={paymentsButtonProps} />

    <button
      onClick={onBack}
      className="mt-4 w-full py-3 text-sm text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
    >
      ← Back to Address
    </button>
  </div>
}

export default OrderCreate;
