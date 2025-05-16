"use client";
import { useState, useEffect } from "react";
import { BuyingProductCard } from "./BuyingCard";
import { BuyingCardCover } from "./BuyingCardCover";
import { DeleteDialog } from "../dialog/DeleteDialog";
import { SendAfterDialog } from "../dialog/SendAfterDialog";

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
  cartMap: Map<string, { product: Product; quantity: number; status?: boolean }>;
  onCartChange: (updatedCart: Map<string, { product: Product; quantity: number; status: boolean }>) => void;
};

export default function Order({ cartMap, onCartChange }: OrderProps) {
  const [selectedProductIdForEdit, setSelectedProductIdForEdit] = useState<string | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedProductIdForDelete, setSelectedProductIdForDelete] = useState<string | null>(null);
  const [items, setItems] = useState(new Map<string, { product: Product; quantity: number; status: boolean }>());

  useEffect(() => {
    const withStatus = new Map<string, { product: Product; quantity: number; status: boolean }>();
    for (const [key, value] of cartMap.entries()) {
      withStatus.set(key, { ...value, status: value.status ?? false });
    }
    setItems(withStatus);
  }, [cartMap]);

  const handleUpdate = (
    productId: string,
    updates: Partial<{
      quantity: number;
      discount: number;
      discountType: string;
      status: boolean;
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
        Array.from(items.entries()).map(([id, { product, quantity, status }]) => (
          <BuyingCardCover
            key={id}
            onDelete={() => setSelectedProductIdForDelete(id)}
            onUpdate={() => {
              setSelectedProductIdForEdit(id);
              setIsUpdateDialogOpen(true);
            }}
            status={status}
          >
            <BuyingProductCard
              key={id}
              product={product}
              quantity={quantity}
              discount={0}
              discountType="none"
              onChange={(updates) => handleUpdate(id, updates)}
            />
            <DeleteDialog
              isOpen={selectedProductIdForDelete !== null}
              onClose={() => setSelectedProductIdForDelete(null)}
              onDelete={() => {
                if (selectedProductIdForDelete) {
                  handleUpdate(selectedProductIdForDelete, { quantity: 0 });
                  setSelectedProductIdForDelete(null);
                }
              }}
            />
            {selectedProductIdForEdit === id && (
              <SendAfterDialog
                isOpen={isUpdateDialogOpen}
                setIsOpen={setIsUpdateDialogOpen}
                product={product}
                quantity={quantity}
                onUpdate={(newQuantity) => {
                  handleUpdate(id, { quantity: newQuantity, status: true });
                }}
              />
            )}
          </BuyingCardCover>
        ))
      )}
    </div>
  );
}
