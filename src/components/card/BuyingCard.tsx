"use client";
import Image from 'next/image';
import { Select, InputNumber } from 'antd';

type Product = {
  no: number;
  productId: string;
  productName: string;
  category: string;
  price: number;
  imageUrl: string;
  stock: number;
};

type ProductCardProps = {
  product: Product;
  quantity: number;
  discount: number;
  discountType: string;
  onChange: (updates: Partial<{ quantity: number; discount: number; discountType: string }>) => void;
};

export const BuyingProductCard: React.FC<ProductCardProps> = ({
  product,
  quantity,
  discount,
  discountType,
  onChange,
}) => {
  const { productId, productName, category, price, imageUrl } = product;

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
            style={{ width: 50 }}
            min={1}
            max={100}
            value={quantity}
            onChange={(value) => onChange({ quantity: value ?? 0 })}
          />
          <div className="text-xs text-gray-600">ส่วนลด:</div>
          <Select
            size="small"
            style={{ width: 100 }}
            value={discountType}
            onChange={(value) => onChange({ discountType: value })}
            options={[
              { value: 'bath', label: 'บาท(฿)' },
              { value: 'percent', label: 'เปอร์เซ็นต์(%)' },
            ]}
          />
          <InputNumber
            size="small"
            style={{ width: 80 }}
            min={0}
            max={discountType === "percent" ? 100 : 9999}
            value={discount}
            onChange={(value) => onChange({ discount: value ?? 0 })}
          />
        </div>
      </div>
    </div>
  );
};
