import mongoose from 'mongoose';
const dbConnect = async () => {
    await mongoose.connect("mongodb://localhost:27017/");
    console.log("Connected DB Successfully");
    return;
}

export default dbConnect;