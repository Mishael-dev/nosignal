

  "use server"

import { createClient } from "@supabase/supabase-js"

export async function addToCart(
  userId: string,
  productId: string,
  quantity: number
) {
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_SECRET_KEY!
  );

  // 1️⃣ Find existing pending order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("id")
    .eq("user_id", userId)
    .eq("status", "pending")
    .maybeSingle()

  if (orderError) {
    throw new Error(orderError.message)
  }

  let orderId = order?.id

  // 2️⃣ Create order if none exists
  if (!orderId) {
    const { data: newOrder, error: insertError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        status: "pending",
        payment_status: "unpaid",
        total_amount: 0,
        address: "pending"
      })
      .select("id")
      .single()

    if (insertError) {
      throw new Error(insertError.message)
    }

    orderId = newOrder.id
  }

  // 3️⃣ Insert cart item
  const { error: itemError } = await supabase
    .from("order_items")
    .insert({
      order_id: orderId,
      product_id: productId,
      quantity
    })

  if (itemError) {
    throw new Error(itemError.message)
  }

  return { success: true, orderId }
}



export async function getCartItems(userId: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_SECRET_KEY!
  );

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("id")
    .eq("user_id", userId)
    .eq("status", "pending")
    .maybeSingle(); // Changed .single() to .maybeSingle() to handle empty carts safely

  if (orderError) throw new Error(orderError.message);
  if (!order) return [];

  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select(`
      id,
      quantity,
      product:products (
        id,
        name,
        price,
        size,
        color,
        description,
        pictures
      )
    `)
    .eq("order_id", order.id);

  if (itemsError) throw new Error(itemsError.message);

  // 💡 FIX: Map through items and convert the 'product' array to a single object
  const cartItems = items.map((item: any) => ({
    ...item,
    product: Array.isArray(item.product) ? item.product[0] : item.product,
  }));
  return cartItems
}


export async function removeFromCart(userId: string, orderItemId: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_SECRET_KEY!
  );

   // 1️⃣ Verify the order item belongs to a pending order for this user
  const { data: orderItem, error: fetchError } = await supabase
    .from("order_items")
    .select("id, order_id")
    .eq("id", orderItemId)
    .maybeSingle();

  if (fetchError) throw new Error(fetchError.message);
  if (!orderItem) return { success: false, message: "Order item not found" };

  // 2️⃣ Check that the parent order belongs to the user and is pending
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("id")
    .eq("id", orderItem.order_id)
    .eq("user_id", userId)
    .eq("status", "pending")
    .maybeSingle();

  if (orderError) throw new Error(orderError.message);
  if (!order) return { success: false, message: "Order not found or not pending" };

  console.log("order item id", orderItemId)
  console.log("remove from cart called")

  // 3️⃣ Delete the order item
  const { data, error: deleteError } = await supabase
    .from("order_items")
    .delete()
    .eq("id", orderItemId);
  console.log(data)

  if (deleteError) throw new Error(deleteError.message);

  return { success: true, };
}

export async function increaseCartProductQuantity(userId: string, orderItemId: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_SECRET_KEY!
  );

  // 1️⃣ Verify the order item exists
  const { data: orderItem, error: fetchError } = await supabase
    .from("order_items")
    .select("id, quantity, order_id")
    .eq("id", orderItemId)
    .maybeSingle();

  if (fetchError) throw new Error(fetchError.message);
  if (!orderItem) return { success: false, message: "Order item not found" };

  // 2️⃣ Check that the parent order belongs to the user and is pending
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("id")
    .eq("id", orderItem.order_id)
    .eq("user_id", userId)
    .eq("status", "pending")
    .maybeSingle();

  if (orderError) throw new Error(orderError.message);
  if (!order) return { success: false, message: "Order not found or not pending" };

  // 3️⃣ Update the quantity by +1
  const newQuantity = orderItem.quantity + 1;

  const { data, error: updateError } = await supabase
    .from("order_items")
    .update({ quantity: newQuantity })
    .eq("id", orderItemId)
    .select();

  if (updateError) throw new Error(updateError.message);

  return { success: true, orderItem: data?.[0] };
}

export async function decreaseCartProductQuantity(userId: string, orderItemId: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_SECRET_KEY!
  );

  // 1️⃣ Fetch the order item
  const { data: orderItem, error: fetchError } = await supabase
    .from("order_items")
    .select("id, quantity, order_id")
    .eq("id", orderItemId)
    .maybeSingle();

  if (fetchError) throw new Error(fetchError.message);
  if (!orderItem) return { success: false, message: "Order item not found" };

  // 2️⃣ Verify parent order belongs to user and is pending
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("id")
    .eq("id", orderItem.order_id)
    .eq("user_id", userId)
    .eq("status", "pending")
    .maybeSingle();

  if (orderError) throw new Error(orderError.message);
  if (!order) return { success: false, message: "Order not found or not pending" };

  // 3️⃣ Decrease quantity or delete if quantity reaches 0
  if (orderItem.quantity <= 1) {
    // delete order item
    const { error: deleteError } = await supabase
      .from("order_items")
      .delete()
      .eq("id", orderItemId);

    if (deleteError) throw new Error(deleteError.message);
    return { success: true, deleted: true };
  } else {
    // decrement quantity by 1
    const { data, error: updateError } = await supabase
      .from("order_items")
      .update({ quantity: orderItem.quantity - 1 })
      .eq("id", orderItemId)
      .select();

    if (updateError) throw new Error(updateError.message);
    return { success: true, orderItem: data?.[0] };
  }
}

export async function clearCartItems(userId: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_SECRET_KEY!
  );

  // 1️⃣ Find the pending order for this user
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("id")
    .eq("user_id", userId)
    .eq("status", "pending")
    .maybeSingle();

  if (orderError) throw new Error(orderError.message);
  if (!order) return { success: false, message: "No pending order found" };

  const orderId = order.id;

  // 2️⃣ Delete all order items for this order
  const { data: deletedItems, error: deleteError } = await supabase
    .from("order_items")
    .delete()
    .eq("order_id", orderId);

  if (deleteError) throw new Error(deleteError.message);

  // 3️⃣ Safe check: deletedItems may be null
  return { success: true};
}