"use client"
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/card/Card";
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Order from "@/components/card/Order";
import { Product, DiscountDetail, DiscountType } from "@/types/product";

type ProductData = {
  success: boolean;
  totalProduct: number;
  productList: Product[];
};

export default function Home() {
  const [products, setProducts] = useState<ProductData | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  //Load Data เข้ามา
  useEffect(() => {
    fetch('/bewellProduct.json')
    .then((res) => res.json())
    .then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [])


 //ตัวเก็บ Order ว่ามีอะไรอยู่ในตะกร้าบ้าง
  const initialCartMap: Map<string, DiscountDetail> = new Map();
  const [cartMap, setCartMap] = useState(initialCartMap);

  //function เมื่อกดปุ่ม Add Cart ถ้ามี +1 ไม่มี set ให้ = 1
  const addToOrder = (product: Product) => {
  setCartMap(prev => {
    const newCart = new Map(prev);
    const existing = newCart.get(product.productId);
    if (existing) {
      newCart.set(product.productId, {
        ...existing,
        quantity: existing.quantity + 1,
      });
    } else {
      newCart.set(product.productId, {
        product,
        quantity: 1,
        discountType: DiscountType.None,
        discount: 0,
      });
    }
    return newCart;
  });
};
  
  //สำหรับ Search
  const filteredProducts = products?.productList.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className="mx-auto flex w-full max-w-(--breakpoint-xl) flex-col justify-between gap-y-16 px-4 py-4 md:py-16 bg-gray-200">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex w-full flex-wrap items-center justify-center col-span-1 gap-4">
        <Input size="large" placeholder="Search" prefix={<SearchOutlined />} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          filteredProducts?.map((product) => (
            <ProductCard key={product.productId} product={product} addToOrder={addToOrder}/>
          ))
        )}
        </div>
        <div className="col-span-1">
          <Order cartMap={cartMap} onCartChange={setCartMap} />
        </div>
      </div>
    </main>
  );
}
