import Image from "next/image";
import { CardButton } from "./CardButton";
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
  addToOrder: (product: Product) => void;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, addToOrder }) => {
  const { productId, productName, category, price, imageUrl } = product;

  return (
    <div className="w-[200px] h-[350px] shadow-lg rounded-lg bg-white flex flex-col p-3 relative">
      <div className="flex justify-center items-center bg-gray-100 rounded">
        <Image
          src={imageUrl}
          width={200}
          height={160}
          className="object-contain"
          alt={"Bewell " + category}
        />
      </div>

      <div className="mt-3 flex flex-col gap-1">
        <div className="text-sm font-medium text-gray-800 leading-tight break-words whitespace-normal">
          {productName}
        </div>
        <div className="text-xs text-blue-600 underline">
          {productId}
        </div>
        <div className="mt-1">
          <span className="text-[10px] bg-gray-300 text-gray-800 px-2 py-[1px] rounded-full">
            {category}
          </span>
        </div>
      </div>

      <div className="mt-auto text-right text-base font-semibold text-gray-900">
        ฿ {price}
      </div>

      {/* Clickable Cart Icon */}
      <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
        <CardButton icon={<ShoppingCartOutlined />} tooltip="เพิ่มลงตะกร้า" onClick={() => addToOrder(product)}/>
      </div>
    </div>
  );
};
