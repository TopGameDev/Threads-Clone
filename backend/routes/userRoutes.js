import express from "express";
import signupUser from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signupUser);

// login
// updateProfil

export default router;
