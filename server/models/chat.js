import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    parts: [
      {
        text: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { _id: false }
);

const chatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    character: {
      type: String,
      default: "Michael",
    },

    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Chat", chatSchema);