import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { DiscountType } from "@/types/product";

export function CheckoutBill(){
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

    const [nextBill, setNextBill] = useState<DiscountType>(DiscountType.None);
    const [nextBillDiscount, setNextBillDiscount] = useState(0);

    const nextBillAmount = useMemo(() => {
    if(nextBill === DiscountType.Baht) return nextBillDiscount
    else if (nextBill === DiscountType.Percent) return (finalPrice * nextBillDiscount) / 100
    return 0;
    }, [nextBill, nextBillDiscount, finalPrice])

    const netPrice = finalPrice - nextBillAmount;

    return(
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
            <Select
              onValueChange={(value : string) => {
              setNextBill(value as DiscountType)}}>
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
            </Select>
            <Input
              type="number"
              min={0}
              max={nextBill === DiscountType.Percent ? 100 : undefined}
              value={nextBillDiscount}
              onChange={(e) => setNextBillDiscount(parseFloat(e.target.value) || 0)}
              className="w-20"
              placeholder="0"
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
          <span>฿{netPrice.toFixed(2)}</span>
        </div>
      </div>
    );
}