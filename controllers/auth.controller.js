import e from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  console.log("signup controller invoked");

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
      

      await newUser.save();
      console.log("User registered successfully", newUser);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        message: "User registered successfully",
      });
    }else{
      res.status(400).json({ message: "Invalid user data" });
    }

  } catch (error) {
    console.log("Error in singup controller", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = (req, res) => {
  console.log("login route");
  res.send("login route");
};

export const logout = (req, res) => {
  console.log("logout route");
  res.send("logout route");
};
