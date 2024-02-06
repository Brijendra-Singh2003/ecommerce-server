import express from "express";
import { getAllUsers, getProfile, getUserProducts, setProfile } from "../db/User.js";
import { User } from "@prisma/client";
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
    res.send(await getAllUsers());
})

userRouter.get("/products", async (req, res) => {
    const { id } = req?.user as User;
    console.log(req.user);
    if (id) { res.json(await getUserProducts(id)); }
    else {
        res.json([]);
    }
})

userRouter.get("/:id", async (req, res) => {
    const profile = await getProfile(req.params.id);
    res.json(profile);
})

userRouter.post("/", async (req, res) => {
    const profile = await setProfile(req.body);
    res.json(profile);
})

userRouter.delete("/:id", async (req, res) => {
    res.send(await getAllUsers());
})

export default userRouter;