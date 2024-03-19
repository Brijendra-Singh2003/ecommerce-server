import express from "express";
import { addProduct, category, getProductById, getProductBySearch, getProductsByCategory } from "../db/Product.js";
import { Image, User } from "@prisma/client";
import { addImage } from "../db/image.js";
import ExpressFormidable from "express-formidable";
import { getSession } from "../middlewares/mySession.js";
const ProductRouter = express.Router();

ProductRouter.get("/", async (req, res) => {
    const page = req.query.page ? +req.query.page : 0;
    const products = await getProductsByCategory(req.query.category as category);
    res.json(products);
})

ProductRouter.post("/", ExpressFormidable(), async (req, res) => {
    console.log("body: ", req.fields);
    const user = await getSession(req);
    if (!user) {
        return res.sendStatus(401);
    }
    console.log(user);
    // return res.sendStatus(200);
    const formData = req.fields as unknown as newProductFormData;
    const f = new FormData();

    f.append("image", formData.image as string);
    f.append("key", process.env.BUCKET_KEY as string);

    const r = await fetch(process.env.BUCKET_URL as string, {
        method: "POST",
        body: f,
    });
    const { data, status } = await r.json() as bucketImage;

    if (status != 200) {
        return res.json({ status: status, success: false });
    }

    const newImage: Image = {
        id: data.id,
        title: data.title,
        url: data.url,
        width: data.width,
        height: data.height,
        size: data.size,
        time: data.time,
        expiration: data.expiration,
        thumb: data.thumb.url,
        delete_url: data.delete_url
    }

    const p1 = await addImage(newImage) as Image;

    const newProduct: newProduct = {
        name: formData.name,
        price: +formData.price,
        discount: +formData.discount,
        categoryId: +formData.category,
        description: formData.discription,
        imageUrl: p1.url,
        stock: +formData.stock,
        imageId: p1.id,
        userId: user.id
    }

    const p2 = await addProduct(newProduct);

    console.log(p1, p2);
    res.json(p2);
})

ProductRouter.get("/search", async (req, res) => {
    const page = req.query.page ? +req.query.page : 0;
    const products = await getProductBySearch(req.query.q as string, page, req.query.category as category || undefined);
    // console.log("got products: ", products);
    res.json(products);
})

ProductRouter.get("/:id", async (req, res) => {
    const product = await getProductById(+req.params.id);
    res.json(product);
})

ProductRouter.put("/:id", async (req, res) => {
    const product = await getProductById(+req.params.id);
    res.json(product);
})

ProductRouter.delete("/:id", async (req, res) => {
    const product = await getProductById(+req.params.id);
    res.json(product);
})

export default ProductRouter;

type newProductFormData = {
    name: string,
    price: string,
    discount: string,
    stock: string,
    discription: string,
    image: string,
    category: string
}