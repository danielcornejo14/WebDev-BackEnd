import { Request, Response, NextFunction } from "express";
import { Category } from "../models/products/category";
import { mockCategories } from "../mocks/categoy";
import { CategoryModel } from "../schemas/Category";


const saveCategoryWithSubcategories = async (categoryData: any) => {
    const category = new CategoryModel({ name: categoryData.name });
    await category.save();

    if (categoryData.subcategories && categoryData.subcategories.length > 0) {
        const subcategoryIds = [];
        for (const subcategory of categoryData.subcategories) {
            const savedSubcategory = await saveCategoryWithSubcategories(subcategory);
            subcategoryIds.push(savedSubcategory._id);
        }
        category.subcategories = subcategoryIds;
        await category.save();
    }
    return category;
};

// Route to seed all categories
export const seedCategories = async (req: Request, res: Response) => {
    try {
        // Clear existing categories
        await CategoryModel.deleteMany();

        // Seed categories
        for (const category of mockCategories) {
            await saveCategoryWithSubcategories(category);
        }

        res.status(201).json({ message: "Categories seeded successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while seeding categories", error });
    }
};

// Route to delete all categories
export const deleteAllCategories = async (req: Request, res: Response) => {
    try {
        await CategoryModel.deleteMany();
        res.status(200).json({ message: "All categories deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while deleting categories", error });
    }
};

export const getAllCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Fetch all categories from the database, including subcategories
        const categories = await CategoryModel.find().populate("subcategories").exec();

        // If no categories are found, return a 404 error
        if (!categories || categories.length === 0) {
            res.status(404).json({ message: "No categories found" });
            return; // Ensure the response is sent and execution stops here
        }

        // Return the categories
        res.status(200).json(categories);
    } catch (error) {
        // Pass the error to the next middleware (error handler)
        next(error);
    }
};


// GET a category by name
export const getCategoryByName = async (req: Request, res: Response) => {
    const categoryName = req.params.name;

    try {
        // Simulate fetching a category from the database
        const fetchedCategory = mockCategories.find(category => category.name === categoryName);

        if (!fetchedCategory) {
            res.status(404).json({ message: "Category not found" });
            return;
        }

        res.status(200).json(fetchedCategory);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching the category", error });
    }
};

// CREATE a new category
export const createCategory = async (req: Request, res: Response) => {
    const newCategory = req.body.data;
    const bearer = req.body.payload;

    try {
        if (bearer.role !== "admin") {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        if (!newCategory || !newCategory.name) {
            res.status(400).json({ message: "Invalid request data" });
            return;
        }

        // Check if category already exists
        const categoryExists = mockCategories.find(category => category.name === newCategory.name);

        if (categoryExists) {
            res.status(400).json({ message: "Category already exists" });
            return;
        }

        // Simulate saving to the database
        mockCategories.push({
            ...newCategory,
            subcategories: newCategory.subcategories || []
        });

        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while creating the category", error });
    }
};

// UPDATE an existing category
export const updateCategory = async (req: Request, res: Response) => {
    const categoryName = req.params.name;
    const updatedCategory = req.body.data;
    const bearer = req.body.payload;

    try {
        if (bearer.role !== "admin") {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        if (!updatedCategory) {
            res.status(400).json({ message: "Invalid request data" });
            return;
        }

        // Find category index
        const categoryIndex = mockCategories.findIndex(category => category.name === categoryName);

        if (categoryIndex === -1) {
            res.status(404).json({ message: "Category not found" });
            return;
        }

        // Simulate updating in the database
        mockCategories[categoryIndex] = {
            ...mockCategories[categoryIndex],
            ...updatedCategory,
        };

        res.status(200).json(mockCategories[categoryIndex]);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while updating the category", error });
    }
};

// DELETE a category
export const deleteCategory = async (req: Request, res: Response) => {
    const categoryName = req.params.name;
    const bearer = req.body.payload;

    try {
        if (bearer.role !== "admin") {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        // Find category index
        const categoryIndex = mockCategories.findIndex(category => category.name === categoryName);

        if (categoryIndex === -1) {
            res.status(404).json({ message: "Category not found" });
            return;
        }

        // Simulate deletion from the database
        mockCategories.splice(categoryIndex, 1);

        res.status(200).json({ message: "Category deleted" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while deleting the category", error });
    }
};
