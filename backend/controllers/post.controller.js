import Post from "../models/post.model.js";

export async function getAllPosts(req, res) {
  try {
    const posts = await Post.find().populate(
      "userData",
      "userName profilePicture biography"
    );
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching posts", error });
  }
}

export async function getPostById(req, res) {
  try {
    const post = await Post.findById(req.params.id).populate(
      "userData",
      "userName profilePicture biography"
    );
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching post", error });
  }
}

export async function getPostsByUser(req, res) {
  try {
    const posts = await Post.find({ userId: req.params.userId }).populate(
      "userData",
      "userName profilePicture biography"
    );
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching posts by user", error });
  }
}

export async function createPost(req, res) {
  try {
    const newPost = new Post({
      userData: req.user._id,
      content: req.body.content,
      tags: req.body.tags || [],
    });
    const savedPost = await newPost.save();
    res.status(201).json({ success: true, data: savedPost });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating post", error });
  }
}

export async function updatePost(req, res) {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        content: req.body.content,
        tags: req.body.tags,
        likes: req.body.likes,
        replies: req.body.replies,
        reports: req.body.reports,
      },
      { new: true }
    );
    if (!updatedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, data: updatedPost });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating post", error });
  }
}

export async function updatePostAsAdmin(req, res) {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        content: req.body.content,
        tags: req.body.tags,
        likes: req.body.likes,
        replies: req.body.replies,
        reports: req.body.reports,
      },
      { new: true }
    );
    if (!updatedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, data: updatedPost });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating post as admin", error });
  }
}

export async function deletePost(req, res) {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res
      .status(200)
      .json({ success: true, data: { message: "Post deleted successfully" } });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting post", error });
  }
}
