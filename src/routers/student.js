// routes/users.js
import express from "express";
const studentRouter = express.Router();

import { promptTutor } from "../clients/openai.js";

// Define user-related routes
studentRouter.post("/interaction", async (req, res) => {
  try {
    // Handle chatHistory - must be an array
    let chatHistory = [];
    if (req.body.chatHistory) {
      if (Array.isArray(req.body.chatHistory)) {
        chatHistory = req.body.chatHistory;
      } else if (typeof req.body.chatHistory === "string") {
        try {
          chatHistory = JSON.parse(req.body.chatHistory);
          if (!Array.isArray(chatHistory)) {
            return res.status(400).json({
              error: "Invalid chatHistory format. Expected an array.",
            });
          }
        } catch (parseError) {
          console.error("Error parsing chatHistory JSON:", parseError);
          return res.status(400).json({
            error:
              "Invalid chatHistory format. Expected valid JSON string representing an array.",
          });
        }
      } else {
        return res.status(400).json({
          error:
            "Invalid chatHistory format. Expected an array or JSON string.",
        });
      }
    }
    const response = await promptTutor(
      chatHistory,
      req.body.newMessage,
      req.files || []
    );
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error("Error in /interaction endpoint:", error);
    res.status(500).json({
      error: error.message || "Internal server error",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
});

studentRouter.post("/end", (req, res) => {
  res.send("Create a new user");
});

export default studentRouter;
