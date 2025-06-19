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

export async function getRepliesByPostId(req, res) {
  try {
    const post = await Post.findById(req.params.id).populate("userData", "userName profilePicture biography");
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    const replies = await Post.find({ repliesTo: req.params.id }).populate("userData", "userName profilePicture biography");
    if (!replies || replies.length === 0) {
      return res
        .status(200)
        .json({ success: true, data: [post] });
    }
    res.status(200).json({ success: true, data: [post, ...replies]}); 
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching replies", error });
  }
}

export async function getPostsByUser(req, res) {
  try {
    const posts = await Post.find({ userData: req.params.userId }).populate(
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
    const content = req.body.content;
    const tags = Array.from(
      new Set(
        (content.text.match(/#\w+/g) || []).map((tag) =>
          tag.substring(1).toLowerCase()
        )
      )
    );

    const newPost = new Post({
      userData: req.user._id,
      content: req.body.content,
      repliesTo: req.body.repliesTo || null,
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
    const content = req.body.content;
    const tags = Array.from(
      new Set(
        (content.text.match(/#\w+/g) || []).map((tag) =>
          tag.substring(1).toLowerCase()
        )
      )
    );

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        content,
        tags,
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
    const content = req.body.content;
    const tags = Array.from(
      new Set(
        (content.text.match(/#\w+/g) || []).map((tag) =>
          tag.substring(1).toLowerCase()
        )
      )
    );

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        content,
        tags,
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

export async function toggleLike(req, res) {
  try {
    const { postId } = req.body;
    const userId = req.user._id.toString();

    const post = await Post.findById(postId);

    const likes = post.likes.map((id) => id.toString());
    const alreadyLiked = likes.includes(userId);

    let liked;
    if (!alreadyLiked) {
      post.likes.push(userId);
      liked = true;
    } else {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
      liked = false;
    }
    await post.save();

    res.status(200).json({
      success: true,
      data: {
        postId: post._id,
        likes: post.likes,
        message: liked ? "Post liked" : "Like removed",
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error liking post", error });
  }
}

export async function getTrendingTags(req, res) {
  try {
    const tags = await Post.aggregate([
      { $unwind: "$tags" },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
          _id: 1,
        },
      },
      { $limit: 20 },
    ]);

    res.status(200).json({ success: true, data: tags });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching trending tags",
      error,
    });
  }
}

export async function getPostByTag(req, res) {
  try {
    const tag = req.params.tag.toLowerCase();

    const posts = await Post.find({ tags: tag }).populate(
      "userData",
      "userName profilePicture biography"
    );

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching posts by tag",
      error,
    });
  }
}
