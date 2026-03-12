import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_SECRET_KEY!
);

// 1️⃣ Verify transaction with Paystack
async function verifyPaystackTransaction(reference: string) {
  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to contact Paystack");
  }

  const data = await res.json();

  if (!data?.data) {
    throw new Error("Invalid Paystack response");
  }

  return data.data;
}

// 2️⃣ Update order in DB
async function markOrderPaid(userId: string) {
  const { data: order, error } = await supabase
    .from("orders")
    .select("id")
    .eq("user_id", userId)
    .eq("status", "pending")
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!order) throw new Error("No pending order found");

  const { error: updateError } = await supabase
    .from("orders")
    .update({
      payment_status: "paid",
      status: "paid",
    })
    .eq("id", order.id);

  if (updateError) throw new Error(updateError.message);

  return order.id;
}

export async function POST(req: Request) {
  try {
    const { reference, userId } = await req.json();

    if (!reference || !userId) {
      return NextResponse.json(
        { success: false, message: "Missing reference or userId" },
        { status: 400 }
      );
    }

    // 3️⃣ Verify Paystack payment
    const transaction = await verifyPaystackTransaction(reference);

    if (transaction.status !== "success") {
      return NextResponse.json(
        {
          success: false,
          message: "Payment not successful",
          paystackStatus: transaction.status,
        },
        { status: 400 }
      );
    }

    // 4️⃣ Update order
    const orderId = await markOrderPaid(userId);

    return NextResponse.json({
      success: true,
      message: "Payment verified",
      reference: transaction.reference,
      orderId,
    });
  } catch (error) {
    console.error("Verification error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}