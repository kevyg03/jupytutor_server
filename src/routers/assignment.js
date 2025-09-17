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
  // Handle formdata if files are present
  const files = req.files || [];
  const formData = req.body;

  res.json({
    done: false,
    filesReceived: files.length,
    formData: formData,
  });
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
