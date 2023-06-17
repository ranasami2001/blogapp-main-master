import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  dateTime: { type: Date, default: Date.now },
});

export default mongoose.model("user", userSchema);
