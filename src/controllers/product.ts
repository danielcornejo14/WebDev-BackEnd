import { NextFunction, Request, Response } from "express";
import { Product } from "../models/products/product";
import { mockProducts } from "../mocks/products";
import { hasCategory } from "../helpers/product-category-search";
import { ProductModel } from "../schemas/Product";
import { CategoryModel } from "../schemas/Category";
import mongoose from "mongoose";

export const seedProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        console.log("Seed Products Endpoint Hit");

        // Clear existing products
        await ProductModel.deleteMany();
        console.log("Existing products cleared.");

        // Fetch all categories from  database
        const categories = await CategoryModel.find();
        if (categories.length === 0) {
            res.status(404).json({
                message:
                    "No categories found in the database. Please seed categories first.",
            });
            return;
        }
        console.log("Fetched categories from database:", categories);

        // Map mock products to use database categories
        const productsToInsert = mockProducts.map((mockProduct, index) => {
            // categories[index % categories.length] to cycle through the actual categories
            const category = categories[index % categories.length];

            return {
                name: mockProduct.name,
                brand: mockProduct.brand,
                description: mockProduct.description,
                price: mockProduct.price,
                image: mockProduct.image,
                category: category._id,
                createdAt: mockProduct.createdAt,
                updatedAt: mockProduct.updatedAt,
            };
        });

        // Insert products into database
        if (productsToInsert.length === 0) {
            res.status(404).json({ message: "No products to seed." });
            return;
        }

        await ProductModel.insertMany(productsToInsert);
        console.log("Products seeded successfully.");

        res.status(201).json({ message: "Products seeded successfully." });
    } catch (error) {
        console.error("Error seeding products:", error);
        next(error);
    }
};

export const getAllProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Fetch products with populated category and subcategories
        const products = await ProductModel.find().populate({
            path: "category",
            populate: {
                path: "subcategories",
                populate: {
                    path: "subcategories",
                },
            },
        });

        if (!products || products.length === 0) {
            res.status(404).json({ message: "No products found" });
            return;
        }

        const transformCategory = (category: any): any => {
            try {
                return {
                    name: category.name,
                    subcategories:
                        category.subcategories?.map((sub: any) =>
                            transformCategory(sub)
                        ) || [],
                };
            } catch (error) {
                return { name: "Category not found", subcategories: [] };
            }
        };

        // Transform each product to the desired structure
        const transformedProducts = products.map((product) => {
            const prod: Product = {
                id: product._id.toString(),
                name: product.name,
                price: product.price,
                description: product.description,
                image: product.image,
                brand: product.brand,
                rating: product.rating,
                category: transformCategory(product.category),
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
            };
            return prod;
        });

        res.status(200).json(transformedProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
        next(error);
    }
};

export const getProductById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const productId = req.query.id;
        console.log(productId)

        console.log(`Fetching product with ID: ${productId}`);

        // Fetch the product from the database and populate its category
        const fetchedProduct = await ProductModel.findById(productId).populate({
            path: "category",
            populate: {
                path: "subcategories",
                populate: {
                    path: "subcategories",
                },
            },
        });

        console.log(req.params)

        if (!fetchedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        // Helper function to transform the category to match the desired output
        const transformCategory = (category: any): any => {
            return {
                name: category.name,
                subcategories:
                    category.subcategories?.map((sub: any) =>
                        transformCategory(sub)
                    ) || [],
            };
        };

        // Transform the fetched product to match the required structure
        const transformedResponse = {
            id: fetchedProduct._id,
            name: fetchedProduct.name,
            price: fetchedProduct.price,
            description: fetchedProduct.description,
            image: fetchedProduct.image,
            brand: fetchedProduct.brand,
            category: transformCategory(fetchedProduct.category),
            createdAt: fetchedProduct.createdAt,
            updatedAt: fetchedProduct.updatedAt,
        };

        res.status(200).json(transformedResponse);
    } catch (error) {
        console.error("Error fetching product:", error);
        next(error);
    }
};

export const getProductsByCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        console.log("getProductsByCategory endpoint hit");

        const categoryName = req.params.category.toLowerCase();

        // Fetch all products and populate their categories and subcategories
        const products = await ProductModel.find().populate({
            path: "category",
            populate: {
                path: "subcategories",
                populate: {
                    path: "subcategories",
                },
            },
        });

        const hasCategory = (productCategory: any): boolean => {
            const searchCategory = (category: any): boolean => {
                if (category.name.toLowerCase() === categoryName) {
                    return true;
                }
                return (
                    category.subcategories?.some((sub: any) =>
                        searchCategory(sub)
                    ) || false
                );
            };
            return searchCategory(productCategory);
        };

        const filteredProducts = products.filter((product) =>
            hasCategory(product.category)
        );

        if (filteredProducts.length === 0) {
            res.status(404).json({ message: "Products not found" });
            return;
        }

        // Helper function to transform the category structure
        const transformCategory = (category: any): any => ({
            name: category.name,
            subcategories:
                category.subcategories?.map((sub: any) =>
                    transformCategory(sub)
                ) || [],
        });

        const transformedProducts = filteredProducts.map((product) => ({
            id: product._id,
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image,
            brand: product.brand,
            category: transformCategory(product.category),
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        }));

        res.status(200).json(transformedProducts);
    } catch (error) {
        console.error("Error fetching products by category:", error);
        next(error);
    }
};

export const createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, price, description, image, brand, category } =
            req.body.data; // Access `data`
        console.log(
            name,
            price,
            description,
            image,
            brand,
            category,
            category._id
        )

        // Validate required fields
        if (
            !name ||
            !price ||
            !description ||
            !image ||
            !brand ||
            !category ||
            !category._id
        ) {

            res.status(400).json({ message: "All fields are required" });
            return;
        }

        // Validate category existence in the database
        const categoryExists = await CategoryModel.findById(category._id);
        if (!categoryExists) {
            res.status(404).json({ message: "Category not found" });
            return;
        }

        // Create the product
        const newProduct = new ProductModel({
            name,
            price,
            description,
            image,
            brand,
            category: categoryExists._id, // Reference category by ID
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();

        // Return the newly created product in the response
        res.status(201).json({
            id: savedProduct._id,
            name: savedProduct.name,
            price: savedProduct.price,
            description: savedProduct.description,
            image: savedProduct.image,
            brand: savedProduct.brand,
            category: {
                id: categoryExists._id,
                name: categoryExists.name,
            },
            createdAt: savedProduct.createdAt,
            updatedAt: savedProduct.updatedAt,
        });
    } catch (error) {}
};

export const updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const productId = req.query.id; // Product ID from URL
        const updatedProductData = req.body.data; // Data to update
        const bearer = req.body.payload; // JWT payload

        if (bearer.role !== "admin") {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        if (
            !updatedProductData ||
            Object.keys(updatedProductData).length === 0
        ) {
            res.status(400).json({ message: "Invalid request data" });
            return;
        }

        // Update product using findByIdAndUpdate
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            productId,
            {
                ...updatedProductData,
                updatedAt: new Date(), // Update updatedAt timestamp
            },
            { new: true, runValidators: true } // Return the updated product and validate data
        );

        if (!updatedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        // Return the updated product
        res.status(200).json({
            id: updatedProduct._id,
            name: updatedProduct.name,
            price: updatedProduct.price,
            description: updatedProduct.description,
            image: updatedProduct.image,
            brand: updatedProduct.brand,
            category: updatedProduct.category,
            createdAt: updatedProduct.createdAt,
            updatedAt: updatedProduct.updatedAt,
        });
    } catch (error) {
        console.error("Error updating product:", error);
        next(error); // Pass error to error-handling middleware
    }
};

export const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const productId = req.params.id; // Get product ID from URL parameter
        const bearer = req.body.payload; // Access the payload (which contains user info)

        // Ensure the user is an admin
        if (bearer.role !== "admin") {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        // Find the product by ID in the database
        const productToDelete = await ProductModel.findById(productId);

        if (!productToDelete) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        // Delete the product from the database
        await ProductModel.findByIdAndDelete(productId);

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        next(error);
    }
};
