import express from "express";
import { createPost, getPost, deletePost } from "../controllers/postController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// GET
router.get("/:id", getPost)

// POST
router.post("/create", protectRoute, createPost);

// DELETE
router.delete("/:id", protectRoute, deletePost)

export default router;
