"use client";
import { useState, useEffect } from "react";
import { BuyingProductCard } from "./BuyingCard";

type Product = {
  no: number;
  productId: string;
  productName: string;
  category: string;
  price: number;
  imageUrl: string;
  stock: number;
};

type OrderProps = {
  cartMap: Map<string, { product: Product; quantity: number }>;
  onCartChange: (updatedCart: Map<string, { product: Product; quantity: number }>) => void;
};

export default function Order({ cartMap, onCartChange }: OrderProps) {
  const [items, setItems] = useState(new Map<string, { product: Product; quantity: number }>(cartMap));

  useEffect(() => {
    setItems(new Map(cartMap));
  }, [cartMap]);

  const handleUpdate = (
  productId: string,
  updates: Partial<{
    quantity: number;
    discount: number;
    discountType: string;
  }>
) => {
  const newItems = new Map(items);
  const existing = newItems.get(productId);
  if (!existing) return;

  const updatedItem = {
    ...existing,
    ...updates,
  };

  if (updatedItem.quantity > 0) {
    newItems.set(productId, updatedItem);
  } else {
    newItems.delete(productId);
  }

  setItems(newItems);
  onCartChange(newItems);
};

  return (
  <div className="p-4 bg-white rounded shadow">
    <h2 className="text-lg font-bold mb-4">รายการที่เลือก</h2>

    {items.size === 0 ? (
      <div className="text-gray-500">ไม่มีรายการสินค้า</div>
    ) : (
      Array.from(items.entries()).map(([id, { product, quantity }]) => (
        <BuyingProductCard
          key={id}
          product={product}
          quantity={quantity}
          discount={0}
          discountType="none"
          onChange={(updates) => handleUpdate(id, updates)}
        />
      ))
    )}
  </div>
);
}
