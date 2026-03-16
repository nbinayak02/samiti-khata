dotenv.config();
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express, { Express } from "express";
import authRouter from "./modules/auth/auth.router";
import errorHandler from "./middlewares/errorHandler";
import organizationRouter from "./modules/organization/organization.router";

const app: Express = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const PORT: string | number = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Samiti Khata API" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/organization", organizationRouter);

// register error handling middleware after all routes
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
