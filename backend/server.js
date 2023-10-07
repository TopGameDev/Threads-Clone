import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import {v2 as cloudinary} from "cloudinary"

// This is so we can use the variables in .env file
dotenv.config();

// This is a function imported to connect our database
connectDB();

// create an instance of express
const app = express();

// PORT variable that pulls the data from the .env or runs the default 5555 Port if no data in .env
const PORT = process.env.PORT || 5555;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

//Middle Wares
// To parse JSON data in the req.body
app.use(express.json({limit:"50mb"}));
// To parse form data in the req.body - extended: true is so we can parse through nested req.body information like for Friends or Follower/Following Schema Sections.
app.use(express.urlencoded({ extended: true }));
// This is for the jwt token we will create for each user
app.use(cookieParser());

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// This is telling the app which port to use - which is why we pass in the PORT variable - Then log a message
app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
