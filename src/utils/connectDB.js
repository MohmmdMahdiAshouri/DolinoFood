import { mongoose }  from "mongoose";

async function connectDB() {
    if(mongoose.connections[0].readyState === 1) return
    mongoose.set("strictQuery" , false)
    await mongoose.connect("mongodb://localhost:27017/dolino")
}

export default connectDB