import { Product } from "../products/product";

export interface Cart {
    userId: number;
    products: Product[];
    createdAt: Date;
    updatedAt: Date;
}