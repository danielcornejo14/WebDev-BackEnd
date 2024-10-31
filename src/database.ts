import mongoose from 'mongoose';



const MONGODB_URI = "mongodb+srv://DSMongo:pR4kEWn0mWeV5EQg@clusterds.mxa6voz.mongodb.net/?retryWrites=true&w=majority&appName=ClusterDS";

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI); 
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

