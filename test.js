import express from "express";
import { jwtVerify } from "jose";
import cors from "cors";
import cookieParser from "cookie-parser";

const key = new TextEncoder().encode(
  "6P3iKtusURoA7OtDtniTWGCDMtY7lo0nV2xsjI9ZQISggNHqXu5zTaSmmRY75J7d"
);
const mySession = async (req, res, next) => {
  try {
    const token = req.cookies["authjs.session-token"];
    req.user = (await jwtVerify(token, key, { algorithms: ["HS256"] })).payload;
    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(mySession);

app.get("/cookie", async (req, res) => {
  console.log(req.user);
  res.json(req.user);
});

app.listen(4000, () => console.log("server chalu.."));
