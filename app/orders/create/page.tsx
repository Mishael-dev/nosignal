"use server"
import { auth } from "@/auth"
import OrderCreate from "@/components/OrderCreate"
import { getCartItems } from "@/lib/db/order"

export default async function Page(){
  const session = await auth()
  const cartItems = await getCartItems(session?.user?.id!)

  // console.log("cart items from oder create page", cartItems)
  return <OrderCreate orderItems={cartItems} />
}