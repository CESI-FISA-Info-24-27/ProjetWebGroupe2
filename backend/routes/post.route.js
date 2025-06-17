import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  getPostsByUser,
  toggleLike,
  updatePost,
  updatePostAsAdmin,
  getTrendingTags,
  getPostByTag,
} from "../controllers/post.controller.js";
import { protectAdmin, protectOwn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/tags", getTrendingTags);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.get("/user/:userId", getPostsByUser);
router.post("/", protectOwn, createPost);
router.put("/:id", protectOwn, updatePost);
router.put("/admin/:id", protectAdmin, updatePostAsAdmin);
router.delete("/:id", protectOwn, deletePost);
router.post("/toggleLike", protectOwn, toggleLike);
router.get("/tags/:tag", getPostByTag);
export default router;
