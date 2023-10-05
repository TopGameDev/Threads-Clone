import express from "express";
import { signupUser, loginUser, logoutUser, followUnFollowUser } from "../controllers/userController.js";
import { protectRoute } from "../middleware/protectRoute.js";

// create instance of express for routing
const router = express.Router();

// /signup post route for signing up a user which runs the signupUser function when used.
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute,followUnFollowUser);



// login
// updateProfil

export default router;
