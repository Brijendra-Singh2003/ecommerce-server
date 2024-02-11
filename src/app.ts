import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieSession from "cookie-session";

import passport from "./middlewares/passport.js"

import ProductRouter from "./routes/product.js";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import cartRouter from "./routes/cart.js";
import categoryRouter from "./routes/category.js";
import { prisma } from "./db/demo.js";

const app = express();

app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({
  name: "session",
  keys: [process.env.AUTH_SECRET_1 as string],
  maxAge: 7 * 24 * 3600000, // 7 days
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products", ProductRouter);
app.use("/api/cart", cartRouter);
app.use("/api/category", categoryRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// app.post("/image", async (req, res) => {
//   console.log("body: ", req.fields);
//   const { image } = req.fields as any;
//   const f = new FormData();

//   f.append("image", image);
//   f.append("key", process.env.BUCKET_KEY as string);

//   const r = await fetch(process.env.BUCKET_URL as string, {
//     method: "POST",
//     body: f,
//   });
//   const d = await r.json();
//   console.log(d);

//   res.send("ok");
// })

app.get("/failure", (req, res) => {
  res.send("failed to log in!");
});

const port = Number.parseInt(process.env.PORT || "3000");

async function start() {
  await prisma.$connect();
  app.listen(port, () => {
    console.log("server listning at port " + port);
  });
}

start();