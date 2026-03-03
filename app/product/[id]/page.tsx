import ProductDetailCard from "@/components/ProductDetailCard";

export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  color: string;
  pictures: string[];
  size: ProductSize;
  stock_quantity: number;
  created_at: string;
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
const { id } = await params;

 const res = await fetch(process.env.NEXT_PUBLIC_APP_URL +'/api/product/' + id)
  const data = await res.json()
  const {product} = data

 return <main>
    <ProductDetailCard product={product} />
 </main>
}