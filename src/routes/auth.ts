import express from "express";
import { AddUser } from "../db/User.js";
import { getSession } from "../middlewares/mySession.js";

const authRouter = express.Router();

authRouter.get("/user", async (req, res) => {
  const user = await getSession(req);
  console.log("user: ", user);
  res.json(user || {});
});

authRouter.post("/user", async (req, res) => {
  const dbUser = await AddUser(req.body);
  res.json(dbUser || {});
});

export default authRouter;