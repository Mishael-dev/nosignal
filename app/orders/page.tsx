"use server"
import { auth } from "@/auth"
import { getOrdersByUserId } from "@/lib/db/order"
import Orders from "@/components/Orders"

export default async function Page(){
  const session = await auth()
  const orders = await getOrdersByUserId(session?.user?.id!)
  console.log("orders from orders page", orders)

  // console.log("cart items from oder create page", cartItems)
  return <Orders orders={orders}/>
}