import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import defaultRoute from "./routes/default";
import blogRoute from "./routes/blog";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4001;

mongoose
  .connect(process.env.DATABASE_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database connected");
  });

//mongoose.set("useCreateIndex", true);

app.use("/", defaultRoute);
app.use("/service", blogRoute);

function OnStartServer() {
  console.log(`Blog App Server running on port : ${PORT}`);
}

app.listen(PORT, OnStartServer());
