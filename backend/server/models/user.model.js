import mongoose from "mongoose";
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    token: String,
  })
);
export default User;
