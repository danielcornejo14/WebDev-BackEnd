import {Request, Response, NextFunction} from 'express';
import { generateJwt } from '../helpers/generate-jwt';
import { User } from '../models/users/user';
import  UserModel  from '../schemas/User';
import exp from 'constants';
import { UserRole } from '../models/users/user-role';

export const seedUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const existingUsers = await UserModel.countDocuments();
        if (existingUsers > 0) {
            // No need to return here, just send the response
            res.status(400).send("Users already exist, skipping seed.");
            return; // This will exit the function
        }

        // Seeding logic...
        const users = Array.from({ length: 20 }, (_, index) => {
            const roles = ['user', 'admin'];
            const role = roles[index % roles.length];
            return {
                email: `user${index + 1}@example.com`,
                password: 'password123',
                role: role,
            };
        });

        await UserModel.insertMany(users);

        // Send success response
        res.status(200).send("Successfully seeded 20 users!");
    } catch (error) {
        // Pass error to the next middleware (error handler)
        next(error);
    }
};

export const logIn = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    // Validate the input
    if (!email || !password) {
        res.status(400).send("Email and password are required");
        return;
    }

    try {
        // Find the user by email in the database
        const user = await UserModel.findOne({ email }).exec();
        console.log(email, password);
        if (!user) {
            res.status(404).send("User not found");
            return;
        }

        // Check if the provided password matches the stored hashed password
        if (user.password !== password) {
            res.status(401).send("Invalid credentials");
            return;
        }

        
        const userResponse: User = {
            id: user._id as string, 
            email: user.email as string,
            password: user.password as string,
            role: user.role as UserRole,
            createdAt: user.createdAt as Date,
            updatedAt: user.updatedAt as Date
        };

        const token = await generateJwt(userResponse)
        
        res.status(200).json({
            jwt: token,
            role: user.role
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};

export const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const newUser: User = req.body;

        // Validate required fields
        if (!newUser || !newUser.email || !newUser.password) {
            res.status(400).send('Invalid user data');
            return;
        }

        // Check if user already exists in database
        const existingUser = await UserModel.findOne({ email: newUser.email });
        if (existingUser) {
            res.status(409).send('User with this email already exists');
            return;
        }

        // Set default role as 'user' for new signups
        const userToCreate = new UserModel({
            email: newUser.email,
            password: newUser.password, // Note: In production, you should hash this password
            role: 'user', // Default role for new signups
            createdAt: new Date(),
            updatedAt: new Date()
        });

        // Save the new user to database
        const savedUser = await userToCreate.save();

        // Convert the mongoose document to a plain object and format the response

        // Return the created user (excluding password)
        const userResponse: User = {
            id: savedUser._id as string, 
            email: savedUser.email as string,
            password: savedUser.password as string,
            role: savedUser.role as UserRole,
            createdAt: savedUser.createdAt as Date,
            updatedAt: savedUser.updatedAt as Date
        };

        const token = await generateJwt(userResponse)
        
        res.status(200).json({
            jwt: token,
            role: savedUser.role
        });
    } catch (error) {
        // Pass any errors to the error handler middleware
        next(error);
    }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { data: updatedUser, payload } = req.body; // Get the updated user data and payload

        if (!updatedUser || !updatedUser.id) {
            res.status(400).send('Invalid user data');
            return;
        }

        // Check permissions: user can only update their own profile or admins can update any user
        if (updatedUser.id !== payload.id && payload.role !== 'admin') {
            res.status(403).send('Forbidden');
            return;
        }

        // Fetch the user from the database
        const user = await UserModel.findById(updatedUser.id);
        if (!user) {
            res.status(404).send('User not found');
            return;
        }

        // Update the user's email if provided
        if (updatedUser.email) user.email = updatedUser.email;
        if (updatedUser.password) user.password = updatedUser.password;
        if (updatedUser.role) user.role = updatedUser.role;

        // Save the updated user to the database
        user.updatedAt = new Date(); // Update the `updatedAt` field
        const updatedUserInDb = await user.save();

        // Return the updated user
        res.status(200).json(updatedUserInDb);
    } catch (error) {
        next(error);
    }
};


export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.query.id; // Get the userId from request parameters
    const payload = req.body.payload; // Get the user payload from the request body


    // Check if the userId and payload data are valid
    if (!userId || !payload || !payload.id) {
        res.status(400).send('Invalid user data');
        return;
    }

    // Check if the logged-in user is either the same user or an admin
    if (userId !== payload.id && payload.role !== 'admin') {
        res.status(403).send('Forbidden: You do not have permission to delete this user');
        return;
    }

    try {
        // Find the user by ID in the database
        const userToDelete = await UserModel.findById(userId);

        // If the user does not exist, send a 404 error
        if (!userToDelete) {
            res.status(404).send('User not found');
            return;
        }

        // Perform the deletion
        await UserModel.findByIdAndDelete(userId);

        // Send a success response
        res.status(200).send(`User with ID ${userId} successfully deleted`);
    } catch (error) {
        console.error('Error deleting user:', error);
        next(error); // Forward the error to the next middleware
    }
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Log the incoming request body
        console.log("Request Body: ", req.body);

        // Accessing the nested user data
        const newUser = req.body.data.data; // Access the nested data object
        const payload = req.body.data.payload; // Access the nested payload object

        // Validate the new user data
        if (!newUser || !newUser.email || !newUser.password || !newUser.role) {
            console.log("Missing user data:", newUser); // Add this log for better debugging
            res.status(400).send('Invalid user data');
            return;
        }

        // Check if the user is an admin (only admins can create new users)
        if (payload.role !== 'admin') {
            res.status(403).send('Forbidden');
            return;
        }

        // Check if the user already exists in the database
        const existingUser = await UserModel.findOne({ email: newUser.email });
        if (existingUser) {
            res.status(400).send('User already exists');
            return;
        }

        // Create the new user and save it to the database
        const userToCreate = new UserModel({
            email: newUser.email,
            password: newUser.password, // You should hash the password before saving it in a real app
            role: newUser.role,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Save the user to the database
        const createdUser = await userToCreate.save();

        // Return the created user
        res.status(201).json(createdUser);
    } catch (error) {
        // Pass error to the next middleware (error handler)
        next(error);
    }
};


export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const payload = req.body.payload;
    console.log(req.body);

    // Check if the user is an admin
    if (payload.role !== 'admin') {
        res.status(403).send('Forbidden');
        return; // Ensure we exit after sending the response
    }

    try {
        // Fetch all users from the database
        const users = await UserModel.find();

        // Send the list of users as JSON response
        res.status(200).json(users); // No need to return the response here
    } catch (error) {
        // Pass the error to the next middleware (error handler)
        next(error);
    }
};

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Get the userId from the request parameters
        const userId = req.params.id;
        const payload = req.body.payload; 

 
        console.log(req.body);

        // Check if the user has 'admin' role (only admins can access other users' data)
        if (payload.role !== 'admin') {
            res.status(403).send('Forbidden');
            return;
        }

        // Fetch the user from the database by userId
        const user = await UserModel.findById(userId); // Use findById to query by MongoDB ObjectId

        // Check if the user exists in the database
        if (!user) {
            res.status(404).send('User not found');
            return;
        }

        // Return the found user
        res.status(200).json(user);
    } catch (error) {
        // Pass any errors to the error handler middleware
        next(error);
    }
};