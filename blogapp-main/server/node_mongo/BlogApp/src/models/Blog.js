import mongoose from "mongoose";
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String,
  description: String,
  userId: String,
  dateTime: { type: Date, default: Date.now },
});

export default mongoose.model("blog", blogSchema);
