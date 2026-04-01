import app from './app.js';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import { dbconnection } from './database/dbconnection.js';
import path from 'path';
import cors from "cors";

dotenv.config({ path: "./config/config.env" });

app.use(cors({
  origin: "http://localhost:5173", // frontend ka port
  credentials: true
}));


// Cloudinary Configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await dbconnection();
    console.log('Database connected successfully');

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error(`Some error occurred while connecting to database: ${err.message}`);
    process.exit(1);
  }
}

startServer();
