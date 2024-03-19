import express from "express";
import { prisma } from "../db/demo.js";
import { getSession } from "../middlewares/mySession.js";

const addressRouter = express.Router();

addressRouter.get("/user", async (req, res) => {
    const user = await getSession(req);
    if (!user) {
        return res.sendStatus(401);
    }
    const address = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        select: {
            addresses: true,
        }
    });
    // console.log(address);
    res.json(address);
})

addressRouter.get("/:id", async (req, res) => {
    const id = +req.params.id;
    const address = await prisma.address.findUnique({ where: { id } });
    // console.log(address);
    return res.json(address);
});

addressRouter.post("/", async (req, res) => {
    try {
        const user = await getSession(req);
        if (!user) {
            return res.status(401).json({});
        }
        let address = req.body;
        address.userId = user.id;
        address = await prisma.address.create({
            data: req.body,
        });
        console.log(address);
        return res.json({});
    } catch (error) {
        console.log(error);
        res.json({ message: "failed" });
    }
});

addressRouter.post("/:id", async (req, res) => {
    try {
        const user = await getSession(req);
        if (!user) {
            return res.status(401).json({});
        }
        const id = +req.params.id;
        let address = req.body;
        address.userId = user.id;
        console.log(id);
        address = await prisma.address.update({
            data: req.body,
            where: {
                id
            },
        });
        console.log(address);
        return res.json({});
    } catch (error) {
        console.log(error);
        res.json({ message: "failed" });
    }
});

addressRouter.delete("/:id", async (req, res) => {
    try {
        const user = await getSession(req);
        if (!user) {
            return res.status(401).json({});
        }
        const id = +req.params.id;
        const address = await prisma.address.delete({ where: { id } });
        console.log("deleted address: ", address);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.json({ message: "failed" });
    }
});

export default addressRouter;