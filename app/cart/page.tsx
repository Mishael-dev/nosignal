"use server"
import { getCartItems } from "@/lib/db/order";
import { auth } from "@/auth";
import Cart from "@/components/Cart";

export default async function Page(){
    const session = await auth()
    const cartItems = await getCartItems(session?.user?.id!)
    
    return <Cart items={cartItems} />
}