/**
 * Endpoints for assignment processing.
 */

import express from "express";
const assignmentRouter = express.Router();

// Define user-related routes
assignmentRouter.get("/assignment/exists", (req, res) => {
  res.json({ exists: false });
});

assignmentRouter.post("/assignment/preprocess", (req, res) => {
  res.json({ done: false });
});

assignmentRouter
  .route("/assignment/hints")
  .get((req, res) => {
    res.json({ hints: [] });
  })
  .post((req, res) => {
    res.json({ added: false });
  });

export default assignmentRouter;
