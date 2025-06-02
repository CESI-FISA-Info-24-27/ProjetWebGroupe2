import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  getPostsByUser,
  updatePost,
  updatePostAsAdmin,
} from "../controllers/post.controller.js";
import { protectAdmin, protectOwn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.get("/user/:userId", getPostsByUser);
router.post("/", protectOwn, createPost);
router.put("/:id", protectOwn, updatePost);
router.put("/admin/:id", protectAdmin, updatePostAsAdmin);
router.delete("/:id", protectOwn, deletePost);

export default router;
