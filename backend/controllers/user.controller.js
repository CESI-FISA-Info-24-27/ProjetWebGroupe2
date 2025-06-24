import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { deleteOldProfilePicture } from "../config/multer.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

const emailTokens = new Map();

async function sendVerificationEmail(user) {
  const token = crypto.randomBytes(32).toString("hex");
  emailTokens.set(token, {
    userId: user._id.toString(),
    expires: Date.now() + 3600000, // 1h
  });

  const link = `http://localhost:5173/verify-email?token=${token}`;

  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "2864c0d7a6a89d",
      pass: "50d1e06963b94a",
    },
  });

  await transporter.sendMail({
    to: user.email,
    subject: "Vérifie ton adresse e-mail",
    html: `<p>Clique ici pour vérifier ton adresse : <a href="${link}">${link}</a></p>`,
  });
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function verifyEmail(req, res) {
  const { token } = req.body;

  const data = emailTokens.get(token);

  if (!data || data.expires < Date.now()) {
    return res.status(400).json({
      success: false,
      message: "Lien invalide ou expiré",
    });
  }

  try {
    const user = await User.findById(data.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur introuvable",
      });
    }

    user.isVerified = true;
    await user.save();
    emailTokens.delete(token);

    res.status(200).json({
      success: true,
      message: "Adresse e-mail vérifiée avec succès",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la vérification de l'e-mail",
      error: error.message,
    });
  }
}

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

export async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
}

export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const { password, ...userWithoutPassword } = user.toObject();
    res.status(200).json({ success: true, data: userWithoutPassword });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
  }
}

export async function getUserForOwnProfile(req, res) {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        userName: user.userName,
        biography: user.biography,
        profilePicture: user.profilePicture,
        conversations: user.conversations,
        notifications: user.notifications,
        subcribers: user.subscribers,
        subscriptions: user.subscriptions,
        posts: user.posts,
        state: user.state,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching own profile",
      error: error.message,
    });
  }
}

export async function getUserForProfilePage(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        userName: user.userName,
        biography: user.biography,
        profilePicture: user.profilePicture,
        subcribers: user.subscribers,
        subscriptions: user.subscriptions,
        posts: user.posts,
        state: user.state,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user for profile page",
      error: error.message,
    });
  }
}

export async function getUserWithNameForProfilePage(req, res) {
  try {
    const user = await User.findOne({ userName: req.params.userName });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        userName: user.userName,
        biography: user.biography,
        profilePicture: user.profilePicture,
        subcribers: user.subscribers,
        subscriptions: user.subscriptions,
        posts: user.posts,
        state: user.state,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user for profile page",
      error: error.message,
    });
  }
}

export async function registerUser(req, res) {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }

  try {
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    if (!newUser) {
      return res
        .status(400)
        .json({ success: false, message: "User registration failed" });
    }

    await sendVerificationEmail(newUser);

    res.status(201).json({
      success: true,
      message:
        "Registration successful. Please check your email to verify your account.",
      data: {
        id: newUser._id,
        email: newUser.email,
        userName: newUser.userName,
        biography: newUser.biography,
        profilePicture: newUser.profilePicture,
        conversations: newUser.conversations,
        notifications: newUser.notifications,
        posts: newUser.posts,
        state: newUser.state,
        token: generateToken(newUser._id),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message:
          "Veuillez vérifier votre adresse e-mail avant de vous connecter.",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        userName: user.userName,
        biography: user.biography,
        profilePicture: user.profilePicture,
        conversations: user.conversations,
        notifications: user.notifications,
        posts: user.posts,
        state: user.state,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message,
    });
  }
}

// Updated updateUser function with file upload support
export async function updateUser(req, res) {
  try {
    const { userName, email, biography, posts, conversations } = req.body;
    const userId = req.user.id;

    // Get current user to check for existing profile picture
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const updateData = {
      userName,
      email,
      biography,
      posts,
      conversations,
    };

    // If a new profile picture was uploaded
    if (req.file) {
      // Delete old profile picture if it exists
      if (currentUser.profilePicture) {
        deleteOldProfilePicture(currentUser.profilePicture);
      }

      // Set new profile picture with full URL
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      updateData.profilePicture = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Return user data without password
    const { password, ...userWithoutPassword } = updatedUser.toObject();
    res.status(200).json({ success: true, data: userWithoutPassword });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
}

// Updated updateUserAsAdmin function with file upload support
export async function updateUserAsAdmin(req, res) {
  try {
    const { userName, biography, role, conversations, posts, state } = req.body;
    const targetUserId = req.params.id;

    // Get current user to check for existing profile picture
    const currentUser = await User.findById(targetUserId);
    if (!currentUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const updateData = {
      userName,
      biography,
      role,
      conversations,
      posts,
      state,
    };

    // If a new profile picture was uploaded
    if (req.file) {
      // Delete old profile picture if it exists
      if (currentUser.profilePicture) {
        deleteOldProfilePicture(currentUser.profilePicture);
      }

      // Set new profile picture with full URL
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      updateData.profilePicture = `${baseUrl}/uploads/profiles/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(targetUserId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
}

export async function subscribeToUser(req, res) {
  try {
    const currentUserId = req.user._id;
    const { userIdToSubscribe } = req.body;

    if (!userIdToSubscribe) {
      return res
        .status(400)
        .json({ success: false, message: "User ID to subscribe is required" });
    }

    if (currentUserId._id === userIdToSubscribe._id) {
      return res.status(400).json({
        success: false,
        message: "You cannot subscribe to yourself",
      });
    }

    const currentUser = await User.findById(currentUserId);
    const userToSubscribe = await User.findById(userIdToSubscribe);

    if (!currentUser || !userToSubscribe) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (currentUser.subscriptions.includes(userIdToSubscribe)) {
      return res.status(400).json({
        success: false,
        message: "You are already subscribed to this user",
      });
    }

    if (!currentUser.subscriptions.includes(userIdToSubscribe)) {
      currentUser.subscriptions.push(userIdToSubscribe);
      userToSubscribe.subscribers.push(currentUserId);
    }

    await currentUser.save();
    await userToSubscribe.save();

    res.status(200).json({
      success: true,
      message: "Subscription successful",
      myInfo: {
        id: currentUser._id,
        userName: currentUser.userName,
        email: currentUser.email,
        biography: currentUser.biography,
        profilePicture: currentUser.profilePicture,
        subscriptions: currentUser.subscriptions,
        subscribers: currentUser.subscribers,
        posts: currentUser.posts,
        state: currentUser.state,
      },
      subscribedUserInfo: {
        id: userToSubscribe._id,
        userName: userToSubscribe.userName,
        email: userToSubscribe.email,
        biography: userToSubscribe.biography,
        profilePicture: userToSubscribe.profilePicture,
        subscriptions: userToSubscribe.subscriptions,
        subscribers: userToSubscribe.subscribers,
        posts: userToSubscribe.posts,
        state: userToSubscribe.state,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error subscribing to user",
      error: error.message,
    });
  }
}
