import express from "express";
import { getAllUsers, getProfile, getUserProducts, setProfile } from "../db/User.js";
import { User } from "@prisma/client";
import { getSession } from "../middlewares/mySession.js";
const userRouter = express.Router();

userRouter.get("/all", async (req, res) => {
    res.send(await getAllUsers());
})

userRouter.get("/products", async (req, res) => {
    const user = await getSession(req);
    console.log(user);
    if (user) { res.json(await getUserProducts(user.id)); }
    else {
        res.json([]);
    }
})

userRouter.get("/", async (req, res) => {
    const user = await getSession(req);
    console.log("Profile", user);
    if (user) {
        const profile = await getProfile(user.id);
        return res.json(profile);
    }
    res.status(401).json({});
})

userRouter.post("/", async (req, res) => {
    const profile = await setProfile(req.body);
    res.json(profile);
})

userRouter.delete("/:id", async (req, res) => {
    res.send(await getAllUsers());
})

export default userRouter;