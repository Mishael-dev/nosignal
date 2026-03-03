import ProductDetailCard from "@/components/ProductDetailCard";
import { getProductById } from "@/lib/db/products";

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

const product = await getProductById(id);

 return <main>
    <ProductDetailCard product={product} />
 </main>
}