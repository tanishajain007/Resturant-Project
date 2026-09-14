import express from 'express';
import dotenv from 'dotenv';
import path from "path";
import dbConnect from './config/db.js';
import IndexRouter from "./route/index.route.js";
import UserRouter from "./route/user.route.js";
import AuthRouter from './route/auth.route.js';
import cookieParser from "cookie-parser";
import cors from "cors";
import FoodRouter from './route/food.route.js';
import OrderRouter from './route/order.route.js';
import { fileURLToPath } from "url";
import env from './config/env.js';

dotenv.config();

const app = express()
const PORT = process.env.PORT

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
    cors({
        origin: env.APP_URL,
        credentials: true
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(IndexRouter);
app.use("/auth", AuthRouter)
app.use("/user", UserRouter);
app.use("/food", FoodRouter);
app.use("/order", OrderRouter);

// Static frontend
app.use(express.static(path.join(__dirname, "../../", "client/dist")));

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../../", "client/dist", "index.html"));
});

app.listen(PORT, async () => {
    await dbConnect();
    console.log(`Server is Running on http://localhost:${PORT}`)
})