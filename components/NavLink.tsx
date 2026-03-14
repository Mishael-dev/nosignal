"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps extends Omit<LinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string; // optional, needs manual pending logic
  children: React.ReactNode;
}

export function NavLink({
  href,
  className,
  activeClassName,
  pendingClassName,
  children,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();

  // Determine active state
  const isActive = pathname === href;

  // Optional: pending logic placeholder (Next.js doesn't track pending natively)
  const isPending = false;

  return (
    <Link
      href={href}
      className={cn(className, isActive && activeClassName, isPending && pendingClassName)}
      {...props}
    >
      {children}
    </Link>
  );
}