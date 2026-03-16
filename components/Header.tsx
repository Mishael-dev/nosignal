"use client"
import Link from "next/link";
import { ShoppingCart, Menu, Scan } from "lucide-react";
import { LogOut } from "lucide-react";
// import { NavLink } from "./NavLink";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { ScanFace } from "lucide-react";
import { signIn, signOut } from "next-auth/react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const {data:session} = useSession()

  return (
    <header className=" bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="text-muted-foreground transition-colors hover:text-background/70 sm:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>

{!!session?.user ? <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="border-b border-border px-6 py-4">
              <SheetTitle className="text-lg font-semibold tracking-[0.2em] uppercase">
                No Signal
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col">
              <Link
                href="/products"
                onClick={() => setOpen(false)}
                className="border-b border-border px-6 py-4 text-sm font-medium transition-colors hover:bg-accent"
              >
                Shop
              </Link>
              <Link
                href="/orders"
                onClick={() => setOpen(false)}
                className="border-b border-border px-6 py-4 text-sm font-medium transition-colors hover:bg-background"
              >
                Orders
              </Link>
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="border-b border-border px-6 py-4 text-sm font-medium transition-colors hover:bg-accent"
              >
                Cart
              </Link>
            </nav>
          </SheetContent> : <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="border-b border-border px-6 py-4">
              <SheetTitle className="text-lg font-semibold tracking-[0.2em] uppercase">
                No Signal
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col">
                <button
                onClick={() => {setOpen(false); signIn("google", { redirectTo: "/products" })}}
                className="border-border px-6 py-4 text-sm font-medium flex items-center gap-2 transition-colors hover:bg-accent"
                >
                <ScanFace />
                Sign In
                </button>
            </nav>
          </SheetContent> }
        </Sheet>

        {/* Logo */}
        <Link href="/" className="text-lg font-semibold tracking-[0.2em] uppercase text-white">
          No Signal
        </Link>

        {/* Desktop Nav */}
        {session?.user && <nav className="hidden items-center gap-8 sm:flex">
          <Link
            href="/products"
            className="text-sm text-white transition-colors hover:text-background/50"
          >
            Shop
          </Link>
          <Link
            href="/orders"
            className="text-sm text-white transition-colors hover:text-background/50 "
          >
            Orders
          </Link>
        </nav> }
        
        {!!session?.user ?  
        <div className="flex items-center">
          <Link
          href="/cart"
          className="text-white transition-colors hover:text-background/50"
        >
          <ShoppingCart className="h-5 w-5" />

        </Link>
        
        <button
                
                onClick={() => { signOut({ redirectTo: "/" })}}

                className="border-border text-white px-6 py-4 text-xsm font-medium flex items-center gap-2 transition-colors hover:text-white/70"
                >
                <LogOut />
                </button>
        </div>
                
                :<div>
           <button
                
                onClick={() => { signIn("google", { redirectTo: "/products" })}}

                className="border-border text-white px-6 py-4 text-sm font-medium flex items-center gap-2 transition-colors hover:text-white/70"
                >
                <ScanFace />
                Sign In
                </button>

                 
          </div>}

         
       
      </div>
    </header>
  );
};

export default Header;
