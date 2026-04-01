import mongoose from "mongoose";

export const dbconnection = async () => {
  try {
    console.log("Connecting to Mongo URI:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM",
      // no need for useNewUrlParser or useUnifiedTopology here
    });
    console.log("Connected to database!");
  } catch (err) {
    console.error(`Some error occurred while connecting to database: ${err.message}`);
    throw err;
  }
  console.log("Connecting to Mongo URI:", process.env.MONGO_URL);
};
