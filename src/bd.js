import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";
// import { MONGODB_URI2 } from "./config.js";

export const connectDB = async () => {
    try { 
        await mongoose.connect(MONGODB_URI);
      
        console.log('db conected')
    } catch (error) {
        
        console.log(error)
    }
} 
