// routes/users.js
import express from "express";
const studentRouter = express.Router();

import { promptOpenAI } from "../clients/openai.js";

// Define user-related routes
studentRouter.post("/initial", (req, res) => {
  res.send("Get all users");
});

studentRouter.post("/followon", (req, res) => {
  res.send("Create a new user");
});

studentRouter.post("/end", (req, res) => {
  res.send("Create a new user");
});

export default studentRouter;
