"use client";
import { useState, useEffect} from "react";
import { BuyingProductCard } from "@/components/card/BuyingCard";
import { BuyingCardCover } from "@/components/card/BuyingCardCover";
import { DeleteDialog } from "@/components/dialog/DeleteDialog";
import { SendAfterDialog } from "@/components/dialog/SendAfterDialog";
import { DiscountDetail,DiscountType } from "@/types/product";

type OrderProps = {
  cartMap: Map<string, DiscountDetail>;
  onCartChange: (updatedCart: Map<string, DiscountDetail>) => void;
};

export default function Order({ cartMap, onCartChange }: OrderProps) {
  const [items, setItems] = useState(new Map<string, DiscountDetail>());

  const [selectedProductIdForEdit, setSelectedProductIdForEdit] = useState<string | null>(null);
  // เปิด Dialog ของ การส่งภายหลัง
  const [isSendAfterDialogOpen, setIsSendAfterDialogOpen] = useState(false);

  const [selectedProductIdForDelete, setSelectedProductIdForDelete] = useState<string | null>(null);

  //เซ็ทของสถานะ Product ที่ต้องการส่งภายหลัง
  const [sendAfterItems, setSendAfterItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const updated = new Map<string, DiscountDetail>();
    for (const [key, value] of cartMap.entries()) {
      updated.set(key, { ...value });
    }
    setItems(updated);
  }, [cartMap]);

  const handleUpdate = (
    productId: string,
    updates: Partial<{
      quantity: number;
      discountType: DiscountType;
      discount: number
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
      {items.size === 0 ? (
        <div className="text-gray-500">ไม่มีรายการสินค้า</div>
      ) : (
        <div className="max-h-96 overflow-y-auto space-y-4">
          {Array.from(items.entries()).map(
            ([id, { product, quantity, discountType, discount }]) => (
              <BuyingCardCover
                key={id}
                onDelete={() => setSelectedProductIdForDelete(id)}
                onUpdate={() => {
                  setSelectedProductIdForEdit(id);
                  setIsSendAfterDialogOpen(true);
                }}
                status={sendAfterItems.has(id)}
              >
                <BuyingProductCard
                  discountDetail={{
                    product,
                    quantity,
                    discount,
                    discountType,
                  }}
                  onChange={(updates) => handleUpdate(id, updates)}
                />
                <DeleteDialog
                  isOpen={selectedProductIdForDelete !== null}
                  onClose={() => setSelectedProductIdForDelete(null)}
                  onDelete={() => {
                    if (selectedProductIdForDelete) {
                      handleUpdate(selectedProductIdForDelete, { quantity: 0 });
                      setSendAfterItems((prev) => {
                        const newSet = new Set(prev);
                        if (newSet.has(id)) {
                          newSet.delete(selectedProductIdForDelete);
                        }
                        return newSet;
                      });
                      setSelectedProductIdForDelete(null);
                    }
                  }}
                />
                {selectedProductIdForEdit === id && (
                  <SendAfterDialog
                    isOpen={isSendAfterDialogOpen}
                    setIsOpen={setIsSendAfterDialogOpen}
                    product={product}
                    quantity={quantity}
                    onUpdate={(newQuantity) => {
                      handleUpdate(id, { quantity: newQuantity });
                      setSendAfterItems((prev) => {
                        const newSet = new Set(prev);
                        if (newSet.has(id)) newSet.delete(id);
                        else newSet.add(id);
                        return newSet;
                      });
                      setIsSendAfterDialogOpen(false);
                    }}
                    status={sendAfterItems.has(id)}
                  />
                )}
              </BuyingCardCover>
            )
          )}
        </div>
      )}
    </div>
  );
}
