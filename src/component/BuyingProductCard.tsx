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

  const handleQuantityChange = (value: number | null) => {
    if (value !== null) {
      onChange({ quantity: value, discount: 0 }); // reset discount
    }
  };

  const handleDiscountTypeChange = (value: string) => {
    onChange({ discountType: value, discount: 0 }); // reset discount
  };

  const handleDiscountChange = (value: number | null) => {
    if (value !== null) {
      onChange({ discount: value });
    }
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow flex gap-4 items-start mb-3">
      <Image
        src={imageUrl}
        width={100}
        height={100}
        className="object-contain"
        alt={`Bewell ${category}`}
      />

      <div className="flex flex-col text-xs gap-1">
        <div className="font-medium">{productName}</div>
        <div className="text-gray-500">{productId}</div>
        <div className="flex items-center gap-2 mt-1">
          <div className="text-base font-bold">฿ {price}</div>
          <InputNumber
            size="small"
            style={{ width: 50 }}
            min={0}
            max={100}
            value={quantity}
            onChange={handleQuantityChange}
          />
          <div className="text-xs text-gray-600">ส่วนลด :</div>
          <Select
            size="small"
            style={{ width: 120 }}
            value={discountType}
            onChange={handleDiscountTypeChange}
            options={[
              { value: 'bath', label: 'บาท(฿)' },
              { value: 'percent', label: 'เปอร์เซ็นต์(%)' },
            ]}
          />
          <InputNumber
            size="small"
            style={{ width: 100 }}
            min={0}
            max={discountType === "percent" ? 100 : 9999}
            value={discount}
            onChange={handleDiscountChange}
          />
        </div>
      </div>
    </div>
  );
};
