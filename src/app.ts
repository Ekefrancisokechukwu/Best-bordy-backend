import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "dotenv";
import { notFoundMiddleware } from "./middleware/notFoundMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";
import cookieParser from "cookie-parser";

// Routes
import authRouter from "./routes/auth";
import usersRouter from "./routes/users";

// Load environment variables
config();

const app: Express = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({ origin: "*" })); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the node mongoDB typescript API" });
});

// Error handling
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
