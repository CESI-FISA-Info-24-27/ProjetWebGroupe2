import express from "express";
import multer from "multer";
import {
  getAllUsers,
  getUserById,
  getUserForProfilePage,
  registerUser,
  loginUser,
  updateUser,
  updateUserAsAdmin,
  getUserForOwnProfile,
  getUserWithNameForProfilePage,
  toggleBannedUser,
  toggleSuspendedUser,
  getMostFollowedUsers,
} from "../controllers/user.controller.js";
import { uploadProfilePicture } from "../config/multer.js";
import { protectAdmin, protectOwn } from "../middlewares/auth.middleware.js";
import { subscribeToUser } from "../controllers/user.controller.js";
import { verifyEmail } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/", protectAdmin, getAllUsers);
router.get("/admin/:id", protectAdmin, getUserById);
router.post("/verify-email", verifyEmail);
router.get("/forMyProfile", protectOwn, getUserForOwnProfile);
router.get("/forProfilePageUser/:id", getUserForProfilePage);
router.get("/forProfilePageUserName/:userName", getUserWithNameForProfilePage);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/subscribe", protectOwn, subscribeToUser);
router.get("/most-followed", getMostFollowedUsers);

// Profile update route with file upload support
router.put(
  "/updateMe",
  protectOwn,
  uploadProfilePicture.single("profilePicture"),
  updateUser
);

router.put("/admin/toggleBan/:id", protectAdmin, toggleBannedUser);
router.put("/admin/toggleSuspend/:id", protectAdmin, toggleSuspendedUser);

// Admin update route with file upload support
router.put(
  "/admin/:id",
  protectAdmin,
  uploadProfilePicture.single("profilePicture"),
  updateUserAsAdmin
);

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large. Maximum size is 5MB.",
      });
    }
  }

  if (error.message === "Only image files are allowed!") {
    return res.status(400).json({
      success: false,
      message: "Only image files are allowed!",
    });
  }

  next(error);
});

export default router;
