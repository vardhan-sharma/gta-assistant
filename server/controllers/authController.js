import User from "../models/user.js";

// Create Profile
export const createProfile = async (req, res) => {
  try {
    const { uid, name, email, dob, gender } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ uid });

    if (existingUser) {
      return res.status(200).json({
        message: "User already exists",
        user: existingUser,
      });
    }

    const user = await User.create({
      uid,
      name,
      email,
      dob,
      gender,
    });

    res.status(201).json({
      message: "Profile created successfully",
      user,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to create profile",
    });
  }
};

// Get Profile
export const getProfile = async (req, res) => {
  try {
    const { uid } = req.params;

    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json(user);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch profile",
    });
  }
};