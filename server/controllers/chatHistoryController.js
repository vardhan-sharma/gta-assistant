import Chat from "../models/chat.js";

// Create New Chat
export const createChat = async (req, res) => {
  try {
    const { title, character, messages } = req.body;

    const chat = await Chat.create({
      title,
      character,
      messages,
    });

    res.status(201).json(chat);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to create chat.",
    });
  }
};

// Get All Chats
export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find()
      .sort({ updatedAt: -1 })
      .select("_id title character updatedAt");

    res.json(chats);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch chats.",
    });
  }
};

// Get Single Chat
export const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({
        error: "Chat not found.",
      });
    }

    res.json(chat);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch chat.",
    });
  }
};

// Update Chat
export const updateChat = async (req, res) => {
  try {
    const { title, character, messages } = req.body;

    const chat = await Chat.findByIdAndUpdate(
      req.params.id,
      {
        title,
        character,
        messages,
      },
      {
        new: true,
      }
    );

    if (!chat) {
      return res.status(404).json({
        error: "Chat not found.",
      });
    }

    res.json(chat);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to update chat.",
    });
  }
};

// Delete Chat
export const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findByIdAndDelete(req.params.id);

    if (!chat) {
      return res.status(404).json({
        error: "Chat not found.",
      });
    }

    res.json({
      message: "Chat deleted successfully.",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to delete chat.",
    });
  }
};