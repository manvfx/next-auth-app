import mongoose from "mongoose";

const dbConnection = async () => {
  const mongoDbUrl = process.env.MONGODB_URL;

  if (!mongoDbUrl) {
    throw new Error("MONGODB_URL environment variable is not defined");
  }

  try {
    await mongoose.connect(mongoDbUrl);
    console.log("Database Connected...");
  } catch (error) {
    console.log("Error connecting to the database:", error);
  }
};

export default dbConnection;
