import express from "express";
import {
  createChat,
  getChats,
  getChatById,
  deleteChat,
  updateChat
} from "../controllers/chatHistoryController.js";

const router = express.Router();

router.post("/", createChat);

router.get("/", getChats);

router.get("/:id", getChatById);

router.delete("/:id", deleteChat);

router.patch("/:id", updateChat);

export default router;