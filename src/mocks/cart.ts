import { Cart } from "../models/cart/Cart";
import { mockProducts } from "./products";

export const mockCart: Cart = {
    userId: 1,
    products: [
        mockProducts[0],
        mockProducts[1],
        mockProducts[2],
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
}