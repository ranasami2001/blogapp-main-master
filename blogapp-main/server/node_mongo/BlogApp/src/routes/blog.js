import express from "express";
var router = express.Router();
import BlogAppController from "../controllers/BlogAppController";

router.post("/", function (req, res) {
  BlogAppController.Execute(req, res);
});

export default router;
