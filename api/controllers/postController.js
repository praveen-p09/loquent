const fs = require("fs");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post.models.js");

exports.createPost = async (req, res) => {
  try {
    let newPath = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const extension = parts[parts.length - 1];
      newPath = path + "." + extension;
      fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json("Unauthorized");
      }
      const { title, summary, content } = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: decoded.id,
      });

      res.json(postDoc);
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updatePost = async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    newPath = path + "." + extension;
    fs.renameSync(path, newPath);
  }

  try {
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);

    if (!postDoc) {
      return res.status(404).json({ error: "Post not found" });
    }

    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json("Unauthorized");
      }

      const isAuthor =
        JSON.stringify(postDoc.author) === JSON.stringify(decoded.id);
      if (!isAuthor) {
        return res.status(401).json("Unauthorized");
      }

      await postDoc.updateOne({
        title,
        summary,
        content,
        cover: newPath ? newPath : postDoc.cover,
      });

      res.json(postDoc);
    });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deletePost = async (req, res) => {
  console.log("Delete request received");
  try {
    const { id } = req.params;
    console.log(`Deleting post with ID: ${id}`);

    const postDoc = await Post.findById(id);
    if (!postDoc) {
      return res.status(404).json({ error: "Post not found" });
    }
    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log("Unauthorized request");
        return res.status(401).json("Unauthorized");
      }

      if (postDoc.author.toString() !== decoded.id) {
        console.log("Unauthorized action by user");
        return res.status(401).json("Unauthorized");
      }

      // Delete the post
      await postDoc.deleteOne();
      console.log("Post deleted successfully");
      return res.status(204).end();
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(posts);
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate("author", ["username"]);

    if (!postDoc) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(postDoc);
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
