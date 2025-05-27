import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";

export const addNewPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file;
    const authorId = req.id;

    // Validate: Image is required
    if (!image) {
      return res.status(400).json({
        message: "Image is required",
        status: "error",
      });
    }

    // Optimize the image using sharp
    const optimizedImageBuffer = await sharp(image.buffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    // Convert to base64 URI
    const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
      "base64"
    )}`;

    // Upload to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(fileUri);

    // Create new post
    const post = await Post.create({
      caption,
      author: authorId,
      image: cloudinaryResponse.secure_url,
    });

    // Add post to user's list of posts
    const user = await User.findById(authorId);
    if (user) {
      user.posts.push(post._id);
      await user.save();
    }

    // Populate author field (excluding password)
    await post.populate({ path: "author", select: "-password" });

    // Send response
    return res.status(201).json({
      message: "Post created successfully",
      post,
      status: "success",
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: "error",
    });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "auhtor", select: "username, profilePicture" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username, profilePicture",
        },
      });
    return res.status(201).json({
      message: "Post created",
      posts,
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const authorId = req.id;
    const posts = await Post.find({ author: authorId })
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: "username, profilePicture",
      })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username, profilePicture",
        },
      });
    return res.status(201).json({
      message: "Post created",
      posts,
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (req, res) => {
  try {
    const whoLikesThePost = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post)
      return res.status(201).json({
        message: "Post not found",
        post,
        status: "error",
      });

    //   like logic

    await post.updateOne({ $addToSet: { likes: whoLikesThePost } });
    await post.save();

    //implementing socekt io for real time notification
    return res.status(200).json({
      message: "Post liked",
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};
export const dislikePost = async (req, res) => {
  try {
    const whoLikesThePost = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post)
      return res.status(201).json({
        message: "Post not found",
        post,
        status: "error",
      });

    //   like logic

    await post.updateOne({ $pull: { likes: whoLikesThePost } });
    await post.save();

    //implementing socekt io for real time notification
    return res.status(200).json({
      message: "Post disliked",
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const whoComments = req.id;

    const { text } = req.body;
    const post = await Post.findById(postId);

    if (!post)
      return res.status(400).json({
        message: "Text required",
        status: "error",
      });

    const comment = await Comment.create({
      text,
      author: whoComments,
      post: postId,
    }).populate({
      path: "author",
      select: "username, profilePicture",
    });
    post.comments.push(comment._id);
    await post.save();

    return res.status(201).json({
      message: "Comment added successfully!!",
      comment,
      success: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCommentsOfIndividualPosts = async (req, res) => {
  try {
    const postId = req.params.id;

    const comment = await Comment.find({ post: postId }).populate(
      "author",
      "username, profilePicture"
    );

    if (!comment)
      return res.status(404).json({
        message: "No comments found for this post!!",
        status: "error",
      });
    return res.status(200).json({ status: "success", comment });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;
    const post = await Post.findById(postId);

    if (post.author.toString() !== authorId)
      return res.status(403).json({
        message: "Unauthorized",
        status: "error",
      });

    let user = await User.findById(authorId);
    user.posts = user.posts.filter((id) => id.toString() !== postId);
    await Post.findByIdAndDelete(postId);
    await user.save();

    await Comment.deleteMany({ post: postId });

    return res.status(200).json({
      message: "Post deleted",
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

export const bookmarkPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;

    const post = await Post.findById(postId);
    if (!post)
      return res.status(404).json({
        message: "Post not found",
        status: "error",
      });

    const user = await User.findById(authorId);

    if (user.bookmarks.includes(post._id)) {
      // already bookmarked
      await user.updateOne({ $pull: { bookmarks: post._id } });
      await user.save();
      return res.status(200).json({
        message: "Post removed from bookmark",
        status: "success",
      });
    } else {
      await user.updateOne({ $addToSet: { bookmarks: post._id } });
      await user.save();
      return res.status(200).json({
        message: "Post added in bookmark",
        status: "success",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
