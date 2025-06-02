import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

function generateToken(id) {
  return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: "30d" });
}

export async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
}

export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...userWithoutPassword } = user.toObject();
    res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
}

export async function getUserForOwnProfile(req, res) {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ status: "success", user: {
      id: user._id,
      email: user.email,
      userName: user.userName,
      biography: user.biography,
      profilePicture: user.profilePicture,
      conversations: user.conversations,
      notifications: user.notifications,
      firendList: user.firendList,
      posts: user.posts,
      state: user.state,
    }});
  } catch (error) {
    res.status(500).json({ message: "Error fetching own profile", error: error.message });
  }
}

export async function getUserForPost(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ status: "success", user: {
      id: user._id,
      userName: user.userName,
      profilePicture: user.profilePicture,
      biography: user.biography,
    }});
  } catch (error) {
    res.status(500).json({ message: "Error fetching user for post", error: error.message });
  }
}

export async function getUserForProfilePage(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ status: "success", user: {
      id: user._id,
      userName: user.userName,
      biography: user.biography,
      profilePicture: user.profilePicture,
      firendList: user.firendList,
      posts: user.posts,
      state: user.state,
    }});
  } catch (error) {
    res.status(500).json({ message: "Error fetching user for profile page", error: error.message });
  }
}

export async function registerUser(req, res) {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const existingUser = await User.find({ email });
  if (existingUser.length > 0) {
    return res.status(400).json({ success: false, message: "User already exists" });
  }
  try {
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    if (!newUser) {
      return res.status(400).json({ success: false, message: "User registration failed" });
    }
    res.status(201).json({ 
      success: true, 
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        role: newUser.role,
        state: newUser.state,
        token: generateToken(newUser._id),
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      return res.status(200).json({ 
        success: true, 
        user: {
          id: user._id,
          userName: user.userName,
          email: user.email,
          role: user.role,
          state: user.state,
          token: generateToken(user._id),
        }
       });
    }
    res.status(200).json({ message: "Login successful", user });
  }
  catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
}

export async function updateUser(req, res) {
  const { userName, email, biography, profilePicture, friendList, posts, conversations } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { userName, email, biography, profilePicture, friendList, posts, conversations },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
}

export async function updateUserAsAdmin(req, res) {
  const { userName, biography, profilePicture, role, friendList, conversations, posts, state } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { userName, biography, profilePicture, role, friendList, conversations, posts, state },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
}