import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import conversationRoutes from "./routes/conversation.route.js";

const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/conversations", conversationRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
