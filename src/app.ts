import express from "express";
import "dotenv/config";
import cors from "cors";

import mySession from "./middlewares/mySession.js";
import passport from "./middlewares/passport.js"

import ProductRouter from "./routes/product.js";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import cartRouter from "./routes/cart.js";
import categoryRouter from "./routes/category.js";
import { prisma } from "./db/demo.js";

// const corsOptions: cors.CorsOptions | cors.CorsOptionsDelegate<cors.CorsRequest> = {
//   origin: process.env.CLIENT_URL || "*",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
// };
const app = express();

app.use(cors({ credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(mySession);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products", ProductRouter);
app.use("/api/cart", cartRouter);
app.use("/api/category", categoryRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.get("/failure", (req, res) => {
  res.send("failed to log in!");
});

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