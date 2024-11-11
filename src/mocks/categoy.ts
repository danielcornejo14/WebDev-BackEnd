import { Category } from "../models/products/category";

export const mockCategories: Category[] = [
    {
        name: "Electronics",
        subcategories: [
            {
                name: "Mobile Phones",
                subcategories: [
                    {
                        name: "Smartphones",
                        subcategories: [],
                    },
                    {
                        name: "Feature Phones",
                        subcategories: [],
                    },
                ],
            },
            {
                name: "Laptops",
                subcategories: [
                    {
                        name: "Gaming Laptops",
                        subcategories: [],
                    },
                    {
                        name: "Business Laptops",
                        subcategories: [],
                    },
                ],
            },
            {
                name: "Tablets",
                subcategories: [],
            },
        ],
    },
    {
        name: "Home Appliances",
        subcategories: [
            {
                name: "Kitchen Appliances",
                subcategories: [
                    {
                        name: "Microwaves",
                        subcategories: [],
                    },
                    {
                        name: "Refrigerators",
                        subcategories: [],
                    },
                ],
            },
            {
                name: "Cleaning Appliances",
                subcategories: [
                    {
                        name: "Vacuum Cleaners",
                        subcategories: [],
                    },
                    {
                        name: "Dishwashers",
                        subcategories: [],
                    },
                ],
            },
        ],
    },
    {
        name: "Fashion",
        subcategories: [
            {
                name: "Men's Clothing",
                subcategories: [
                    {
                        name: "Shirts",
                        subcategories: [],
                    },
                    {
                        name: "Jeans",
                        subcategories: [],
                    },
                ],
            },
            {
                name: "Women's Clothing",
                subcategories: [
                    {
                        name: "Dresses",
                        subcategories: [],
                    },
                    {
                        name: "Skirts",
                        subcategories: [],
                    },
                ],
            },
            {
                name: "Accessories",
                subcategories: [
                    {
                        name: "Bags",
                        subcategories: [],
                    },
                    {
                        name: "Jewelry",
                        subcategories: [],
                    },
                ],
            },
        ],
    },
];
