import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import tasksRouter from "./routers/tasks-router.js";
import userRouter from "./routers/users-router.js";
import errorMiddleware from "./middlewares/error-middleware.js";

config();
const app = express();
const PORT = process.env.SERVER_PORT;

function start(): void {
  try {
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

    app.use("/api/tasks", tasksRouter)
    app.use("/api/users", userRouter)
    app.use(errorMiddleware)

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

start();
