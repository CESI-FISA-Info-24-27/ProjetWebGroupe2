import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      text: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: false,
      },
    },
    date: {
      type: Date,
      default: Date.now,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    repliesTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: false,
    },
    reports: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
