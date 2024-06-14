const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.models.js");
const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET;

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      throw new Error("User not found");
    }
    const passOK = bcrypt.compareSync(password, userDoc.password);
    if (passOK) {
      const token = jwt.sign({ username, id: userDoc._id }, secret);
      res.cookie("token", token, { httpOnly: true }).json({
        id: userDoc._id,
        username,
      });
    } else {
      res.status(400).json("Incorrect credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token").json("ok");
};

exports.profile = (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json("Unauthorized");
    }
    res.json(decoded);
  });
};
