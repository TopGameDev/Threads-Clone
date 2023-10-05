import express from "express";
import { createPost, getPost, deletePost, likeUnlikePost, replyToPost } from "../controllers/postController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// GET
router.get("/:id", getPost)

// POST
router.post("/create", protectRoute, createPost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/reply/:id", protectRoute, replyToPost);

// DELETE
router.delete("/:id", protectRoute, deletePost)

export default router;
