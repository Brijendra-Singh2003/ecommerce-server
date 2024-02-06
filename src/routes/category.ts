import express from "express"
import { addCategory, getAllCategories } from "../db/category.js";

const categoryRouter = express.Router();

categoryRouter.get("/", async (req, res) => {
    res.json(await getAllCategories());
});

categoryRouter.post("/", async (req, res) => {
    const c = await addCategory(req.body.category);
    console.log(c);
    res.json(c);
})

export default categoryRouter;