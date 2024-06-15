const multer = require("multer");
const os = require("os");
const path = require("path");

const uploadDir = path.join(os.tmpdir(), "uploads");

// Ensure the temporary directory exists
const fs = require("fs");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const uploadMiddleware = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

module.exports = uploadMiddleware;
