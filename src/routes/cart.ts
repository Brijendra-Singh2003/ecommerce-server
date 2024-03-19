import express from "express";
import { addItem, getCartSize, getCarts, getItem, removeItemById, updateItem } from "../db/item.js";
import { getCartItems } from "../db/User.js";
import { User } from "@prisma/client";
import { getSession } from "../middlewares/mySession.js";
const cartRouter = express.Router();

cartRouter.get("/", async (req, res) => {
    const user = await getSession(req);
    if (user) {
        const userCarts = await getCartItems(user.id);
        // console.log(userCarts);
        return res.json(userCarts?.cart);
    }
    return res.status(400).json({});
});

cartRouter.get("/all", async (req, res) => {
    const carts = await getCarts();
    return res.json(carts);
});

cartRouter.get("/size", async (req, res) => {
    try {
        const user = await getSession(req);
        if (!user) {
            return res.sendStatus(401);
        }

        const userCarts = await getCartSize(user?.id as string);
        console.log("cart size: ", userCarts);

        return res.json(userCarts);

    } catch ({ message }: any) {
        console.log(message)
        res.sendStatus(500);
    }
});

cartRouter.post("/update", async (req, res) => {
    console.log("/update", req.body);
    const user = await getSession(req);
    if (!user) {
        return res.status(401).json([]);
    }
    const { id, quantity } = req.body;
    if (id && quantity) {
        const t = await updateItem(+id, +quantity);
        console.log("updateItem: ", t);
    }
    const t = await getCartItems(user.id);
    res.json(t?.cart);
})

cartRouter.post("/:id", async (req, res) => {
    const user = await getSession(req);
    const productId = +req.params.id;

    if (!productId || !user) {
        return res.status(401).send(`missing required feilds\nuserid: ${user?.id}\nproductId: ${productId}`);
    }

    const item = { productId, userId: user.id };
    const dbItem = await getItem(item);

    if (dbItem) {
        return res.send("item already in cart");
    }

    const t = await addItem(item);
    console.log(t);

    res.send("success");
});

cartRouter.delete("/:id", async (req, res) => {
    const user = await getSession(req);
    if (user) {
        await removeItemById(+req.params.id);
        const userCarts = await getCartItems(user.id);
        return res.json(userCarts?.cart);
    }
    return res.status(401).json([]);
});

export default cartRouter;