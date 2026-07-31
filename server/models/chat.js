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
    uid: {
  type: String,
  required: true,
  index: true,
},
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