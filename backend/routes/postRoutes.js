import express from "express";
import {
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  replyToPost,
  getFeedPosts,
} from "../controllers/postController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// GET
router.get("/feed", protectRoute, getFeedPosts);
router.get("/:id", getPost);

// POST
router.post("/create", protectRoute, createPost);
router.put("/like/:id", protectRoute, likeUnlikePost);
router.put("/reply/:id", protectRoute, replyToPost);

// DELETE
router.delete("/:id", protectRoute, deletePost);

export default router;
