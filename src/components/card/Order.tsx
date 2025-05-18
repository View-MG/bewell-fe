"use client";
import { useState, useEffect } from "react";
import { BuyingProductCard } from "./BuyingCard";
import { BuyingCardCover } from "./BuyingCardCover";
import { DeleteDialog } from "../dialog/DeleteDialog";
import { SendAfterDialog } from "../dialog/SendAfterDialog";
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

  let totalPrice = 0
  let totalDiscount = 0
  items.forEach(({ product, quantity, discount, discountType }) => {
  const base = product.price * quantity
  const discountAmount =
    discountType === DiscountType.Percent ? (base * discount) / 100 : 
    discountType === DiscountType.Baht ? discount : 0
  totalPrice += base
  totalDiscount += discountAmount
  });
  
  const beforeFinalPrice = totalPrice - totalDiscount
  const vatPrice = beforeFinalPrice * 0.07
  const finalPrice = beforeFinalPrice + vatPrice
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">รายการที่เลือก</h2>

      {items.size === 0 ? (
        <div className="text-gray-500">ไม่มีรายการสินค้า</div>
      ) : (
        Array.from(items.entries()).map(([id, { product, quantity, discountType, discount }]) => (
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
              key={id}
              discountDetail={{
                product,
                quantity,
                discount: discount,
                discountType: discountType
              }}
              onChange={(updates) => handleUpdate(id, updates)}
            />
            <DeleteDialog
              isOpen={selectedProductIdForDelete !== null}
              onClose={() => setSelectedProductIdForDelete(null)}
              onDelete={() => {
                if (selectedProductIdForDelete) {
                  handleUpdate(selectedProductIdForDelete, { quantity: 0 });
                  setSendAfterItems(prev => {
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

                  setSendAfterItems(prev => {
                    const newSet = new Set(prev);
                    if (newSet.has(id)) {
                      newSet.delete(id);
                    } else {
                      newSet.add(id);
                    }
                    return newSet;
                  });

                  setIsSendAfterDialogOpen(false);
                }}
                status={sendAfterItems.has(id)}
              />
            )}
          </BuyingCardCover>
        ))
      )}
      <div className="mt-4 space-y-3 text-sm text-gray-700">
        <div className="flex items-center text-sm00">
          <div className="w-[80px]">ราคา</div>
          <div className="flex-1 border-b border-dotted mx-3" />
          <div className="w-[80px] text-center">{items.size} Item</div>
          <div className="flex-1 border-b border-dotted mx-3" />
          <div className="w-[100px] text-right">฿{totalPrice.toFixed(2)}</div>
        </div>
        <div className="flex items-center text-sm00">
          <div className="w-[80px]">รวม Vat 7%</div>
          <div className="flex-1 border-b border-dotted mx-3" />
          <div className="w-[80px] text-center">{items.size} Item</div>
          <div className="flex-1 border-b border-dotted mx-3" />
          <div className="w-[100px] text-right">฿{vatPrice.toFixed(2)}</div>
        </div>

        <div className="flex justify-between items-center">
          <span>ส่วนลดท้ายบิล</span>
          <div className="flex items-center gap-2">
            <span>กรอกส่วนลดท้ายบิล:</span>
            {/* <Select
              value={discountDetail.discountType}
              onValueChange={(value) => {
              onChange({ discountType: value as DiscountType })}}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value={DiscountType.Baht}>บาท(฿)</SelectItem>
                  <SelectItem value={DiscountType.Percent}>เปอร์เซ็นต์(%)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select> */}
            <input
              type="number"
              value= ""
              className="w-20 border rounded px-2 py-1 text-end"
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span>แลกคะแนน</span>
          <div className="flex-1 border-b border-dotted mx-3" />
          <span>฿0</span>
        </div>

        <div className="flex justify-between text-lg font-bold text-gray-800">
          <span>รวมราคาทั้งหมด</span>
          <span>฿{finalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
