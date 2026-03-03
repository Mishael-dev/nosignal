import ProductsSection from "@/components/ProductsSection";
import { getProducts } from "@/lib/db/products";

export default async function Page(){
    
 const data = await getProducts();
    return (<div>
        <ProductsSection products={data} />
        </div>);
}