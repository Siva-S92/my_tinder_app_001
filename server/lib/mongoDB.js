import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    if (conn) console.log(`MongoDB Connected at ${conn.connection.host}`);
  } catch (error) {
    console.log(`MongoDB not Connected at ${conn.connection.host}`);
    console.log(error);
    process.exit(1) // exit process with failure
  }
};
