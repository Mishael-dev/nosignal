import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Orders",
  description: "View and track your previous orders.",
};

export default function OrdersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <main className="">
        <section>{children}</section>
      </main>
    </div>
  );
}