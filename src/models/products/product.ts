import { Category } from "./category";


export interface Product {
    id: number | string;
    name: string;
    brand: string;
    description: string;
    price: number;
    image: string;
    category: Category;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}


