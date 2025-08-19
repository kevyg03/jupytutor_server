// routes/users.js
import express from "express";
import multer from "multer";
const studentRouter = express.Router();

import { promptTutor } from "../clients/openai.js";

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory as buffers
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 5, // Maximum 5 files per request
  },
  fileFilter: (req, file, cb) => {
    // Allow common file types
    const allowedTypes = [
      // Images
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/webp",
      // Text files
      "text/plain",
      "text/markdown",
      "text/csv",
      // Code files
      "text/x-python",
      "application/json",
      "text/html",
      "text/css",
      "application/javascript",
      "text/typescript",
      "text/jsx",
      "text/tsx",
      // Generic text
      "text/*",
    ];

    if (
      allowedTypes.includes(file.mimetype) ||
      file.mimetype.startsWith("text/")
    ) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} is not supported`), false);
    }
  },
});

// Define user-related routes
studentRouter.post("/initial", upload.array("files", 5), async (req, res) => {
  try {
    const response = await promptTutor(
      req.body.chatHistory ? JSON.parse(req.body.chatHistory) : [],
      req.body.newMessage,
      req.files || []
    );
    res.json(response);
  } catch (error) {
    console.error("Error in /initial endpoint:", error);
    res.status(500).json({
      error: error.message || "Internal server error",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
});

studentRouter.post("/followon", (req, res) => {
  res.send("Create a new user");
});

studentRouter.post("/end", (req, res) => {
  res.send("Create a new user");
});

export default studentRouter;
