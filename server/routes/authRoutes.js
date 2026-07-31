import express from "express";
import {
  createProfile,
  getProfile,
} from "../controllers/authController.js";

const router = express.Router();

// Create user profile
router.post("/profile", createProfile);

// Get user profile by Firebase UID
router.get("/profile/:uid", getProfile);

export default router;