"use client";
import dynamic from "next/dynamic";
import { ComponentProps } from "react";

const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
);

interface componentProps {
    amount: number,
    email: string,
    currency: string,
    metadata: {
    custom_fields: {
      display_name: string;
      variable_name: string;
      value: string;
    }[];
  };
    text: string;
    onSuccess: (ref: any) => void;
    onClose: () => void;
  }

export default function PaymentsButton(
  { className, componentProps, ...props }: ComponentProps<"button"> & {componentProps: componentProps}
) {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!

    return <PaystackButton className={className} publicKey={publicKey} {...componentProps} />
}