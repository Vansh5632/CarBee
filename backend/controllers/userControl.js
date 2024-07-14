const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const userControl = {
  signup: async (req, res) => {
    try {
      const { name, email, password, DOB } = req.body;

      // Check if user already exists
      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "Email already registered" });

      // Check password length
      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters" });
      }
      //password encryption
      const passwordHash = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
        DOB,
      });

      // Save user to database
      await newUser.save();
      //JWT creation
      const accesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "user/refresh_token",
      });

      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshtoken: async (req, res) => {
    try {
      const rf_token = req.cookie.refreshtoken;
      if (!rf_token) throw new Error("please login");
      JWT.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) throw new Error("please login or register");
        const accesstoken = createAccessToken({ id: user.id });
        res.json({ user, accesstoken });
      });
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },
};

const createAccessToken = (payload) => {
  return JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};
const createRefreshToken = (payload) => {
  return JWT.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = userControl;
