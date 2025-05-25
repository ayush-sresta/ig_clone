import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";

// .env
dotenv.config({});
const PORT = process.env.PORT || 5000;
const app = express();

//midleware
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

// api here
app.use("/api/v1/user", userRoute);

// routes

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to the backend server",
    status: "success",
  });
});

// app listening
app.listen(PORT, () => {
  connectDB();
  console.log(`http://localhost:${PORT}`);
});
