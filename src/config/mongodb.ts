import mongoose from "mongoose";

export const mongodbURI = process.env.MONGO_URI as string;


//IIFE - Significa que cuando el archivo es llamado la función se ejecutará automaticamnte
// Inmediatily Invoked Function Expression
export default ( async ()=>{
    try {
        await mongoose.connect(mongodbURI);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("error :>>", error);
        process.exit(1);
    }
})();