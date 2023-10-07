import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";
import { useNavigate } from "react-router-dom";
import { v2 as cloudinary } from "cloudinary";

const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username })
      .select("-password")
      .select("-updatedAt");
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error: in getUserProfile: ", error.message);
  }
};

// Async function to handle signup request body data to backend using UserSchema criteria
const signupUser = async (req, res) => {
  try {
    // Field data we are getting from the req.body
    const { name, email, username, password } = req.body;
    // Search database to see if there are any users created with these credentials already
    const user = await User.findOne({ $or: [{ email }, { username }] });

    // If there is a user that already has the email or username return status 400 and display message "User already exists"
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // If the req.body data is unique hash the password by create a salt with bcrypt
    const salt = await bcrypt.genSalt(10);
    // Pass salt into an await hash function with the password to create a hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a newUser instance and fill it with req.body data
    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });

    // save data to database
    await newUser.save();

    // If the newUser was created successfully return a json response with the data - else return a 400 status response and "Invalid user data" message
    if (newUser) {
      // Generate Token and Cookie
      generateTokenAndSetCookie(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        bio: newUser.bio,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    // If there is an error in signup respond with a 500 status code and print a "Error: in signupUser: " message to the console
    res.status(500).json({ error: error.message });
    console.log("Error: in signupUser: ", error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordCorrect)
      return res.status(400).json({ error: "Invalid username or password" });

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error: in signupUser: ", error.message);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error: in logoutUser: ", error.message);
  }
};

const followUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToFollow = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString()) {
      return res
        .status(400)
        .json({ error: "You cannot follow/unfollow yourself" });
    }

    if (!userToFollow || !currentUser) {
      return res.status(400).json({ error: "User not found" });
    }

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      // Unfollow user
      // Modify current user's following: Array, modify followers: Array of userToFollow
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });

      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      // Follow User
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error: in followUnFollowUser: ", error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, username, password, bio } = req.body;
    let { profilePic } = req.body;

    const userId = req.user._id;
    try {
      let user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      if (req.params.id !== userId.toString()) {
        return res
          .status(400)
          .json({ error: "You cannot update other user's profile! " });
      }

      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
      }

      if (profilePic) {
        if (user.profilePic) {
          await cloudinary.uploader.destroy(
            user.profilePic.split("/").pop().split(".")[0]
          );
        }
        const uploadedResponse = await cloudinary.uploader.upload(profilePic);
        profilePic = uploadedResponse.secure_url;
      }

      user.name = name || user.name;
      user.email = email || user.email;
      user.username = username || user.username;
      user.profilePic = profilePic || user.profilePic;
      user.bio = bio || user.bio;

      user = await user.save();

      // password should be null in response
      user.password = null;

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log("Error: in updateUser: ", error.message);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error: in updateUser: ", error.message);
  }
};

export {
  signupUser,
  loginUser,
  logoutUser,
  followUnFollowUser,
  updateUser,
  getUserProfile,
};
