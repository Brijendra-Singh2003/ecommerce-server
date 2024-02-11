import express from "express";
import { addItem, getCartSize, getCarts, getItem, removeItemById } from "../db/item.js";
import { getCartItems } from "../db/User.js";
import { User } from "@prisma/client";
const cartRouter = express.Router();

cartRouter.get("/", async (req, res) => {
    const user = req.user as User;
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
    const user = req.user as User;
    if (user) {
        const userCarts = await getCartSize(user.id);
        // console.log("cart size: ", userCarts);
        return res.json(userCarts);
    }
    return res.json({ success: false });
});

cartRouter.delete("/:id", async (req, res) => {
    const carts = await removeItemById(+req.params.id);
    return res.json(carts);
});

cartRouter.post("/:id", async (req, res) => {
    const { id } = req.user as User;
    const productId = +req.params.id;

    if (!productId || !id) {
        return res.status(401).send(`missing required feilds\nuserid: ${id}\nproductId: ${productId}`);
    }

    const item = { productId, userId: id };
    const dbItem = await getItem(item);

    if (dbItem) {
        return res.send("item already in cart");
    }

    const t = await addItem(item);
    console.log(t);

    res.send("success");
});

export default cartRouter;