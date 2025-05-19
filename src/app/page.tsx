"use client"
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/card/Card";
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Order from "@/components/card/Order";
import { Product, DiscountDetail, DiscountType } from "@/types/product";
import LocalDateTime from "@/components/card/Date";
import { CheckoutBill } from "@/components/card/CheckoutBill";

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
  
  const filteredProducts = products?.productList.filter((product) => {
    const term = searchTerm.toLowerCase().trim();
    return (
      product.productName.toLowerCase().includes(term) ||
      product.productId.toLowerCase().includes(term)
    );
  });

  return (
    <main className="mx-auto flex w-full max-w-(--breakpoint-xl) flex-col justify-between gap-y-16 px-4 py-2 md:py-16 bg-gray-200">
      <div className="grid md:grid-cols-9 gap-4">
        <div className="flex w-full flex-wrap items-center justify-center md:col-span-5 gap-4 pt-4 my-[400px] md:my-0">
        <Input size="large" placeholder="Search" prefix={<SearchOutlined />} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 md:grid-cols-2">
            {filteredProducts?.map((product) => (
              <ProductCard key={product.productId} product={product} addToOrder={addToOrder} />
            ))}
          </div>
        )}
        </div>
        <div className="fixed bottom-0 left-0 px-8 md:bg-transparent bg-gray-200 w-full bg- md:static md:col-span-4">
          <div className="flex flex-row">
            <LocalDateTime/>
          </div>
          <Order cartMap={cartMap} onCartChange={setCartMap} />
          <div className="p-4 mt-4 rounded shadow bg-white">
            <CheckoutBill items={cartMap} />
          </div>
        </div>
      </div>
    </main>
  );
}
