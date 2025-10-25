import { mongoose } from "mongoose";

async function connectDB() {
    if (mongoose.connections[0].readyState === 1) return;
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB Atlas");
}

export default connectDB;
