dotenv.config();
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express, { Express } from "express";
import authRouter from "./modules/auth/auth.router";
import userRouter from "./modules/user/user.router";
import errorHandler from "./middlewares/errorHandler";
import incomeRouter from "./modules/income/income.router";
import reportRouter from "./modules/report/report.router";
import expenseRouter from "./modules/expense/expense.routes";
import categoryRouter from "./modules/category/category.router";
import committeeRouter from "./modules/committee/committee.router";
import billIssuerRouter from "./modules/billIssuer/billIssuer.router";
import organizationRouter from "./modules/organization/organization.router";

const app: Express = express();

const FRONTEND_URL = process.env.FRONTEND_URL ?? "";

app.use(
  cors({
    origin: [FRONTEND_URL, "http://localhost:4173", "http://localhost:5173"],
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
app.use("/api/v1/user", userRouter);
app.use("/api/v1/report", reportRouter);
app.use("/api/v1/income", incomeRouter);
app.use("/api/v1/expense", expenseRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/committee", committeeRouter);
app.use("/api/v1/billIssuer", billIssuerRouter);
app.use("/api/v1/organization", organizationRouter);

// register error handling middleware after all routes
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
