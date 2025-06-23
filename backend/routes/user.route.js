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
} from "../controllers/user.controller.js";
import { uploadProfilePicture } from "../config/multer.js";
import { protectAdmin, protectOwn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protectAdmin, getAllUsers);
router.get("/admin/:id", protectAdmin, getUserById);
router.get("/forMyProfile", protectOwn, getUserForOwnProfile);
router.get("/forProfilePageUser/:id", getUserForProfilePage);
router.get("/forProfilePageUserName/:userName", getUserWithNameForProfilePage);

router.post("/register", registerUser);
router.post("/login", loginUser);

// Profile update route with file upload support
router.put(
  "/updateMe",
  protectOwn,
  uploadProfilePicture.single("profilePicture"),
  updateUser
);

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
