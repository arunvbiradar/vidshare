import express from 'express'
import mongoose from 'mongoose';
import dotenv from "dotenv";

import authRoute from "./routes/auth.route.js"
import userRoute from "./routes/user.route.js"
import videoRoute from "./routes/video.route.js"
import commentRoute from "./routes/comment.route.js"

const app = express();
dotenv.config();

const connect = async () => {
  await mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to DB")
  }).catch(err => {
    throw err;
  })
}

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/videos", videoRoute);
app.use("/api/comments", commentRoute);

app.listen(8800, () => {
  connect();
  console.log("Connected to server!")
})