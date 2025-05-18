export type Product = {
    no: number;
    productId: string;
    productName: string;
    category: string;
    price: number;
    imageUrl: string;
    stock: number;
}

export enum DiscountType {
  None = "none",
  Baht = "bath",
  Percent = "percent",
}

export type DiscountDetail = {
    product: Product
    quantity: number
    discountType: DiscountType
    discount: number
  }