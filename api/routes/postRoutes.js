const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController.js");
const uploadMiddleware = require("../middleware/uploadMiddleware.js");

router.post("/", uploadMiddleware.single("file"), postController.createPost);
router.put("/", uploadMiddleware.single("file"), postController.updatePost);
router.delete("/:id", postController.deletePost);
router.get("/", postController.getPosts);
router.get("/:id", postController.getPostById);

module.exports = router;
