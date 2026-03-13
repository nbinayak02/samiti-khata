dotenv.config();
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express, { Express } from "express";
import userRouter from "./modules/user/user.router";
import errorHandler from "./middlewares/errorHandler";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const PORT: string | number = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Samiti Khata API" });
});

app.use("/api/v1/user", userRouter);

// register error handling middleware after all routes
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
