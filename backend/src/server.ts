import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT: string | number = process.env.PORT || 5000;

app.get("/", (req, res) => {
 res.status(200).json({ message: "Welcome to Samiti Khata API" });
});

app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});
