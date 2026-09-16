import mongoose from 'mongoose';
import env from "./env.js";

const dbConnect = async () => {
    await mongoose.connect(env.DBURI);
    console.log("Connected DB Successfully");
    return;
}

export default dbConnect;