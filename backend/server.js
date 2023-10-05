import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js"

dotenv.config();

connectDB();
const app = express();

const PORT = process.env.PORT || 5555;

app.use(express.json()); // To parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // To parse form data in the req.body - extended: true is so we can parse through nested req.body information like for Friends or Follower/Following Schema Sections.
app.use(cookieParser());

// ROUTES
app.use("/api/users", userRoutes);

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
