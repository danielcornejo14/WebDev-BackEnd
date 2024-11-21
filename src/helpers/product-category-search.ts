import { Category } from "../models/products/category";
import { Product } from "../models/products/product";

export function hasCategory(product: Product, categoryName: string): boolean {
    function searchCategory(category: Category): boolean {
        if (category.name === categoryName) {
            return true;
        }
        for (const subcategory of category.subcategories) {
            if (searchCategory(subcategory)) {
                return true;
            }
        }
        return false;
    }

    return searchCategory(product.category);
}