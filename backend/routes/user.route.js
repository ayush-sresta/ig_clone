import express from "express";
import {
  editProfile,
  followOrUnfollow,
  getProfile,
  getSuggestedUsers,
  login,
  logout,
  register,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { upload } from "../middlewares/multer.js";
const userRoute = express.Router();

userRoute.route("/register").post(register);
userRoute.route("/login").post(login);
userRoute.route("/logout").get(logout);
userRoute.route("/:userId/profile").get(isAuthenticated, getProfile);
userRoute
  .route("/profile/edit")
  .post(isAuthenticated, upload.single("profilePicture"), editProfile);
userRoute.route("/suggested-user").get(isAuthenticated, getSuggestedUsers);
userRoute.route("/follow-unfollow/:id").post(isAuthenticated, followOrUnfollow);

export default userRoute;
