import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Was able to reach the server!",
  });
});

app.get("/error-test", (req, res) => {
  throw new Error("Test Crash");
});

app.use(errorHandler);

export default app;
