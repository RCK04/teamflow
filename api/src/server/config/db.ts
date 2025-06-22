import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        const MONGODB_URI = process.env.MONGODB_URI;
        if (!MONGODB_URI) {
            throw new Error('Please define the MONGODB_URI environment variable inside .env');
        }
        const conn = await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 30000
        });
        console.log(`Database connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;