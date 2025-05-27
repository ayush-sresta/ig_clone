import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { upload } from "../middlewares/multer.js";
import {
  addComment,
  addNewPost,
  bookmarkPost,
  deletePost,
  dislikePost,
  getAllPost,
  getCommentsOfIndividualPosts,
  getUserPosts,
  likePost,
} from "../controllers/post.controller.js";
const router = express.Router();

router
  .route("/addPost")
  .post(isAuthenticated, upload.single("image"), addNewPost);
router.route("/all").get(isAuthenticated, getAllPost);
router.route("/:id/like").get(isAuthenticated, likePost);
router.route("/:id/dislike").get(isAuthenticated, dislikePost);
router.route("/:id/comment").post(isAuthenticated, addComment);
router
  .route("/:id/comment")
  .post(isAuthenticated, getCommentsOfIndividualPosts);
router.route("/delete/:id").post(isAuthenticated, deletePost);
router.route("/bookmark/:id").post(isAuthenticated, bookmarkPost);

export default router;
