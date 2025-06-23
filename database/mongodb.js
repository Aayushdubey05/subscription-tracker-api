import mongoose  from "mongoose";
import { DATABASE_URL, NODE_ENV } from "../config/env.js";

if(!DATABASE_URL){
    throw new Error("DATABASE_URL is not defined in the environment variables.");
}

const connectToDatabase = async () => {
    try{
        await mongoose.connect(DATABASE_URL)
        console.log(`Connected to MongoDB at ${DATABASE_URL} in ${NODE_ENV} mode`);
    }
    catch (error){
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
}


export default connectToDatabase;
