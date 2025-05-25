import sharp from "sharp";
import cloudinary from "../utils/cloudinary";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

export const addNewPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file;
    const auhtorId = req.id;

    if (image) {
      return res.status(400).json({
        messgae: "Image required",
        status: "error",
      });
    }
    const optimizedImageBuffer = await sharp(image.buffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
      "base64"
    )}`;
    const clouudinaryResponse = await cloudinary.uploader.upload(fileUri);
    const post = await Post.create({
      caption,
      auhtor: auhtorId,
      image: clouudinaryResponse.secure_url,
    });
    const user = await User.findById(auhtorId);
    if (user) {
      user.posts.push(post._id);
      await user.save();
    }
    await post.populate({ path: "author", select: "-password" });
    return res.status(201).json({
      message: "Post created",
      post,
      status: "success",
    });
  } catch (error) {
    console.log(error);
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

export const likePost = async(req, res) => {
    try {
        const whoLikesThePost = req.id
        const postId = 
    } catch (error) {
        console.log(error)
    }
}