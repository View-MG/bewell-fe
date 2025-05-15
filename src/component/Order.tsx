"use client";
import { useState } from "react";
import { BuyingProductCard } from "./BuyingProductCard";

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
  items: Product[];
};

type CartItem = {
  product: Product;
  quantity: number;
  discount: number;
  discountType: string;
};

export default function Order({ items }: OrderProps) {
  const initialGrouped: { [productId: string]: CartItem } = {};

  items.forEach((item) => {
    if (initialGrouped[item.productId]) {
      initialGrouped[item.productId].quantity += 1;
    } else {
      initialGrouped[item.productId] = {
        product: item,
        quantity: 1,
        discount: 0,
        discountType: "",
      };
    }
  });

  const [cartItems, setCartItems] = useState(initialGrouped);

  const handleUpdate = (
    productId: string,
    updates: Partial<Pick<CartItem, "quantity" | "discount" | "discountType">>
  ) => {
    setCartItems((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        ...updates,
      },
    }));
  };

  const subtotal = Object.values(cartItems).reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );

  const totalDiscount = Object.values(cartItems).reduce((sum, { product, quantity, discount, discountType }) => {
    if (discountType === "percent") {
      return sum + (product.price * quantity * discount) / 100;
    } else if (discountType === "bath") {
      return sum + discount;
    }
    return sum;
  }, 0);

  const totalToPay = subtotal - totalDiscount;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">รายการที่เลือก</h2>
      {Object.entries(cartItems).map(([productId, item]) => (
        <BuyingProductCard
          key={productId}
          product={item.product}
          quantity={item.quantity}
          discount={item.discount}
          discountType={item.discountType}
          onChange={(updates) => handleUpdate(productId, updates)}
        />
      ))}
      {items.length === 0 && <div className="text-gray-500">ไม่มีรายการสินค้า</div>}
      <div className="mt-4 border-t pt-4 text-sm space-y-1">
        <div>รวมราคาสินค้าก่อนส่วนลด: <span className="font-medium">฿ {subtotal.toFixed(2)}</span></div>
        <div>ส่วนลดทั้งหมด: <span className="font-medium text-red-600">-฿ {totalDiscount.toFixed(2)}</span></div>
        <div className="text-base font-bold">ราคาสุทธิที่ต้องจ่าย: <span className="text-green-600">฿ {totalToPay.toFixed(2)}</span></div>
      </div>
    </div>
  );
}
