import { Category } from "../models/products/category";

export const mockCategories: Category[] = [
    {
        id: 1,
        name: "Electronics",
        subcategories: [
            {
                id: 2,
                name: "Mobile Phones",
                subcategories: [
                    {
                        id: 3,
                        name: "Smartphones",
                        subcategories: [],
                    },
                    {
                        id: 4,
                        name: "Feature Phones",
                        subcategories: [],
                    },
                ],
            },
            {
                id: 5,
                name: "Laptops",
                subcategories: [
                    {
                        id: 6,
                        name: "Gaming Laptops",
                        subcategories: [],
                    },
                    {
                        id: 7,
                        name: "Business Laptops",
                        subcategories: [],
                    },
                ],
            },
            {
                id: 8,
                name: "Tablets",
                subcategories: [],
            },
        ],
    },
    {
        id: 9,
        name: "Home Appliances",
        subcategories: [
            {
                id: 10,
                name: "Kitchen Appliances",
                subcategories: [
                    {
                        id: 11,
                        name: "Microwaves",
                        subcategories: [],
                    },
                    {
                        id: 12,
                        name: "Refrigerators",
                        subcategories: [],
                    },
                ],
            },
            {
                id: 13,
                name: "Cleaning Appliances",
                subcategories: [
                    {
                        id: 14,
                        name: "Vacuum Cleaners",
                        subcategories: [],
                    },
                    {
                        id: 15,
                        name: "Dishwashers",
                        subcategories: [],
                    },
                ],
            },
        ],
    },
    {
        id: 16,
        name: "Fashion",
        subcategories: [
            {
                id: 17,
                name: "Men's Clothing",
                subcategories: [
                    {
                        id: 18,
                        name: "Shirts",
                        subcategories: [],
                    },
                    {
                        id: 19,
                        name: "Jeans",
                        subcategories: [],
                    },
                ],
            },
            {
                id: 20,
                name: "Women's Clothing",
                subcategories: [
                    {
                        id: 21,
                        name: "Dresses",
                        subcategories: [],
                    },
                    {
                        id: 22,
                        name: "Skirts",
                        subcategories: [],
                    },
                ],
            },
            {
                id: 23,
                name: "Accessories",
                subcategories: [
                    {
                        id: 24,
                        name: "Bags",
                        subcategories: [],
                    },
                    {
                        id: 25,
                        name: "Jewelry",
                        subcategories: [],
                    },
                ],
            },
        ],
    },
];
