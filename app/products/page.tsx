import ProductsSection from "@/components/ProductsSection";

export default async function Page(){
    
 const res = await fetch(process.env.NEXT_PUBLIC_APP_URL +'/api/products')
  const data = await res.json()
    return (<div>
        <ProductsSection products={data} />
        </div>);
}