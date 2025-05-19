"use client";
import Image from 'next/image';
import { InputNumber } from 'antd';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DiscountDetail ,DiscountType } from "@/types/product";

type ProductCardProps = {
  discountDetail : DiscountDetail
  onChange: (updates: Partial<{ quantity: number; discount: number; discountType: DiscountType }>) => void;
};

export const BuyingProductCard: React.FC<ProductCardProps> = ({
  discountDetail,
  onChange,
}) => {
  const { productId, productName, category, price, imageUrl } = discountDetail.product;
console.log("discountType before render:", discountDetail.discountType);
  return (
    <div className="p-4 bg-white rounded-2xl shadow flex gap-2 h-28 items-center justify-center">
      <Image
        src={imageUrl}
        width={70}
        height={70}
        className="object-contain"
        alt={`Bewell ${category}`}
      />

      <div className="flex flex-col text-xs gap-1">
        <div className="font-medium">{productName}</div>
        <div className="text-gray-500">{productId}</div>
        <div className="flex items-center gap-2 mt-1">
          <div className="text-base font-bold">฿{price}</div>
          <InputNumber
            size="small"
            style={{ width: 40 }}
            min={1}
            max={100}
            value={discountDetail.quantity}
            onChange={(value) => onChange({ quantity: value ?? 0 })}
          />
          <div className="text-xs text-gray-600">ส่วนลด:</div>
          <div className="text-xs w-32">
            <Select
            value={discountDetail.discountType}
            onValueChange={(value) => {
            onChange({ discountType: value as DiscountType })}}>
            <SelectTrigger size="sm">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel><Select> Your Discount</Select></SelectLabel>
                <SelectItem value={DiscountType.Baht}>บาท(฿)</SelectItem>
                <SelectItem value={DiscountType.Percent}>เปอร์เซ็นต์(%)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          </div>
          
          <InputNumber
            size="small"
            style={{ width: 50 }}
            min={0}
            max={discountDetail.discountType === DiscountType.Percent ? 100 : 99999}
            value={discountDetail.discount}
            onChange={(value) => onChange({ discount: value ?? 0 })}
          />
        </div>
      </div>
    </div>
  );
};
