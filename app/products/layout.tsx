import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | No Signal",
  description: "Browse our latest collection.",
};

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Shop-specific sub-navigation or sidebar could go here */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}