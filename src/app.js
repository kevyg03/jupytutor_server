import express from "express";

// Initialize the app instance
const app = express();
const PORT = 3000;

// Attach the endpoints implemented in routers/
import studentRouter from "./routers/student.js";
import assignmentRouter from "./routers/assignment.js";

app.use(studentRouter);
app.use(assignmentRouter);

// Run the app
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
