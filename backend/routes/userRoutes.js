import express from "express";
import { signupUser, loginUser, logoutUser, followUnFollowUser, updateUser, getUserProfile } from "../controllers/userController.js";
import { protectRoute } from "../middleware/protectRoute.js";

// create instance of express for routing
const router = express.Router();

// GET
router.get("/profile/:username", getUserProfile)

// POST
// /signup post route for signing up a user which runs the signupUser function when used.
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUnFollowUser);
router.put("/update/:id", protectRoute, updateUser);



// login
// updateProfil

export default router;
