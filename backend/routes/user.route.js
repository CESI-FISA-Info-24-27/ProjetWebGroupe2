import express from "express";

import {
  getAllUsers,
  getUserById,
  getUserForProfilePage,
  registerUser,
  loginUser,
  updateUser,
  updateUserAsAdmin,
  getUserForOwnProfile,
} from "../controllers/user.controller.js";
import { protectAdmin, protectOwn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protectAdmin, getAllUsers);
router.get("/admin/:id", protectAdmin, getUserById);
router.get("/forMyProfile", protectOwn, getUserForOwnProfile);
router.get("/forProfilePageUser/:id", getUserForProfilePage);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/updateMe", protectOwn, updateUser);
router.put("/admin/:id", protectAdmin, updateUserAsAdmin);

export default router;
