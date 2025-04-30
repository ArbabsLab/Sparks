import mongoose from "mongoose";

export const DBconnect = async () => {
    try{
        await mongoose.connect(process.env.MONGOURI);
        console.log("Connected to sparksdb");
    } catch (error){
        console.log(error);
    }
}
