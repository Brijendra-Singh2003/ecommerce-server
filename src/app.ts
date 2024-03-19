import express from "express";
import "dotenv/config";
import cors from "cors";

import mySession from "./middlewares/mySession.js";
import cookieParser from "cookie-parser";

import ProductRouter from "./routes/product.js";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import cartRouter from "./routes/cart.js";
import categoryRouter from "./routes/category.js";
import { prisma } from "./db/demo.js";
import addressRouter from "./routes/address.js";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(mySession);

app.use("/api/auth", authRouter);
app.use("/api/products", ProductRouter);
app.use("/api/cart", cartRouter);
app.use("/api/category", categoryRouter);
app.use("/api/user", userRouter);
app.use("/api/address", addressRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = Number.parseInt(process.env.PORT || "3000");

async function start() {
  await prisma.$connect();

  app.listen(port, () => {
    console.log("server listning at port " + port);
  });
}

start();