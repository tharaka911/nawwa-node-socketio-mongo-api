import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
// import getSecret from "../utils/awsSecrerts.js";

import { logger } from "../logs/logger.js";

export const signup = async (req, res) => {
  console.log("signup controller invoked");
  logger.info("signup controller invoked");

  // const secret = await getSecret();
  // console.log("Using Secret in login:", secret);

  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and Confirm Password do not match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      console.log("User already exists");
      logger.error("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "mail" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      //generate the JWT token
      generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();
      console.log("User registered successfully", newUser);
      logger.info("User registered successfully", newUser);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        message: "User registered successfully",
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in singup controller", error.message);
    logger.error("Error in singup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {

  // const secret = await getSecret();
  // console.log("Using Secret in login:", secret);
  
  console.log("login controller invoked");
  logger.info("login controller invoked");
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    logger.error("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  console.log("logout controller invoked");
  logger.info("logout controller invoked");
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
