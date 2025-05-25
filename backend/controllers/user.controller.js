import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getDataUri } from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(401).json({
        message: "All fields are required",
        status: "error",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "User already exists",
        status: "error",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(401).json({
      message: "Account created successfully",
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(401).json({
        message: "All fields are required",
        status: "error",
      });
    }
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: "Incorrect username or password",
        status: "error",
      });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        message: "Incorrect username or password",
        status: "error",
      });
    }

    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      username: user.username,
      profilePicture: user.profilePicture,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      posts: user.posts,
    };
    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      })
      .json({
        message: `Welcome back ${user.username}`,
        status: "success",
        user,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .cookie("token", "", {
        maxAge: 0, // Expire the cookie immediately
      })
      .json({
        message: "Logged out successfully",
        status: "success",
      });
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    let user = await User.findById(userId);
    return res.status(200).json({
      user,
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

export const editProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { bio, gender } = req.body;
    const profilePicture = req.file;

    let cloudResponse;

    if (profilePicture) {
      const fileUri = getDataUri(profilePicture);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content); // ensure .content is used if getDataUri returns {content}
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: "error",
      });
    }

    if (bio) user.bio = bio;
    if (gender) user.gender = gender;
    if (profilePicture) user.profilePicture = cloudResponse.secure_url;

    await user.save();

    return res.status(200).json({
      message: "Profile edited",
      status: "success",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      status: "error",
    });
  }
};

export const getSuggestedUsers = async (req, res) => {
  try {
    const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select(
      "-password"
    );

    if (!suggestedUsers || suggestedUsers.length === 0) {
      return res.status(404).json({
        message: "Currently do not have any users",
        status: "error",
      });
    }

    return res.status(200).json({
      status: "success",
      users: suggestedUsers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      status: "error",
    });
  }
};

export const followOrUnfollow = async (req, res) => {
  try {
    const whoFollows = req.id; // me
    const whoGetFollowing = req.params.id; // target user

    if (whoFollows === whoGetFollowing) {
      return res.status(400).json({
        message: "You cannot follow or unfollow yourself",
      });
    }

    const user = await User.findById(whoFollows);
    const targetedUser = await User.findById(whoGetFollowing);

    if (!user || !targetedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isFollowing = user.following.includes(whoGetFollowing);

    if (isFollowing) {
      // unfollow
      await Promise.all([
        User.updateOne(
          { _id: whoFollows },
          { $pull: { following: whoGetFollowing } }
        ),
        User.updateOne(
          { _id: whoGetFollowing },
          { $pull: { followers: whoFollows } }
        ),
      ]);
      return res.status(200).json({
        message: "Unfollowed successfully",
        status: "success",
      });
    } else {
      // follow
      await Promise.all([
        User.updateOne(
          { _id: whoFollows },
          { $push: { following: whoGetFollowing } }
        ),
        User.updateOne(
          { _id: whoGetFollowing },
          { $push: { followers: whoFollows } }
        ),
      ]);
      return res.status(200).json({
        message: "Followed successfully",
        status: "success",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      status: "error",
    });
  }
};
